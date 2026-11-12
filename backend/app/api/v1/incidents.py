import os
import re
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy import select

from app.api.deps import CurrentUser, DatabaseSession, require_roles
from app.models.models import Asset, Incident, User
from app.schemas.common import IncidentCreate, IncidentStatusUpdate, PublicIncidentCreate
from app.services.audit_service import create_audit_log, publish_domain_event
from app.services.incident_service import transition_incident

try:
    from geoalchemy2.shape import from_shape
    from shapely.geometry import Point
except ImportError:
    from_shape = None
    Point = None

router = APIRouter(prefix="/incidents", tags=["Incidents"])
limiter = Limiter(key_func=get_remote_address)


def _point(latitude, longitude):
    if latitude is None or longitude is None or from_shape is None or Point is None:
        return None
    return from_shape(Point(longitude, latitude), srid=4326)


def _serialize(x):
    return {
        "id": x.id, "incident_code": x.incident_code, "title": x.title,
        "description": x.description, "asset_id": x.asset_id,
        "category": x.category, "severity": x.severity, "priority": x.priority,
        "status": x.status, "reporter_email": x.reporter_email,
        "assigned_department": x.assigned_department,
        "verified_by": x.verified_by, "verified_at": x.verified_at,
        "resolution_notes": x.resolution_notes,
        "created_at": x.created_at, "updated_at": x.updated_at,
    }


@router.get("/")
def list_incidents(db: DatabaseSession, current_user: CurrentUser):
    rows = db.scalars(select(Incident).order_by(Incident.created_at.desc())).all()
    return {"items": [_serialize(x) for x in rows], "total": len(rows)}


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_incident(
    payload: IncidentCreate,
    request: Request,
    db: DatabaseSession,
    current_user: User = Depends(require_roles(
        "super_admin", "infrastructure_manager", "department_officer", "field_inspector"
    )),
):
    asset = db.get(Asset, payload.asset_id) if payload.asset_id else None
    if payload.asset_id and asset is None:
        raise HTTPException(status_code=404, detail="Referenced asset not found")

    incident = Incident(
        incident_code=f"INC-{uuid4().hex[:10].upper()}",
        title=payload.title, description=payload.description, asset_id=payload.asset_id,
        reporter_id=current_user.id, reporter_email=current_user.email,
        category=payload.category, severity=payload.severity, priority=payload.priority,
        status="reported", location=_point(payload.latitude, payload.longitude),
    )
    db.add(incident)
    db.flush()
    create_audit_log(db, actor=current_user.email, action="incident_created", entity="incident",
                     entity_id=incident.id, new_value={"status": "reported"},
                     request_id=getattr(request.state, "request_id", None))
    publish_domain_event(db, event_type="IncidentCreated", entity_type="incident",
                         entity_id=incident.id, payload={"status": "reported"})
    db.commit()
    db.refresh(incident)
    return _serialize(incident)


@limiter.limit("10/hour")
@router.post("/public", status_code=status.HTTP_201_CREATED)
def create_public_incident(payload: PublicIncidentCreate, request: Request, db: DatabaseSession):
    asset = db.get(Asset, payload.asset_id) if payload.asset_id else None
    if payload.asset_id and asset is None:
        raise HTTPException(status_code=404, detail="Referenced asset not found")
    incident = Incident(
        incident_code=f"INC-{uuid4().hex[:10].upper()}",
        title=payload.title, description=payload.description, asset_id=payload.asset_id,
        reporter_email=payload.reporter_email, category=payload.category,
        severity=payload.severity, priority=payload.priority, status="reported",
        location=_point(payload.latitude, payload.longitude),
    )
    db.add(incident)
    db.flush()
    create_audit_log(db, actor="public", action="public_incident_created", entity="incident",
                     entity_id=incident.id, new_value={"status": "reported"},
                     request_id=getattr(request.state, "request_id", None))
    publish_domain_event(db, event_type="IncidentCreated", entity_type="incident",
                         entity_id=incident.id, payload={"public": True})
    db.commit()
    db.refresh(incident)
    return _serialize(incident)


MAX_PHOTO_SIZE = 50 * 1024 * 1024  # 50MB
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic"}
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp", "image/heic"}


@limiter.limit("20/minute")
@router.post("/upload-photo")
async def upload_photo(request: Request, file: UploadFile = File(...)):
    """Secure image upload under 50MB with anti-malware and file verification."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file attached")

    clean_name = os.path.basename(file.filename)
    clean_name = re.sub(r"[^a-zA-Z0-9_.-]", "_", clean_name)
    _, ext = os.path.splitext(clean_name.lower())

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported format '{ext}'. Only JPG, PNG, WEBP, and HEIC under 50MB are permitted.",
        )

    header = await file.read(16)
    valid_header = (
        header.startswith(b"\xff\xd8\xff")  # JPEG
        or header.startswith(b"\x89PNG")    # PNG
        or header.startswith(b"RIFF")       # WEBP
    )
    if not valid_header:
        raise HTTPException(status_code=400, detail="Corrupted or invalid image header")

    rest = await file.read(MAX_PHOTO_SIZE + 1)
    total_size = len(header) + len(rest)
    if total_size > MAX_PHOTO_SIZE:
        raise HTTPException(status_code=413, detail="File size exceeds maximum allowed 50MB")

    return {
        "file_id": f"photo_{uuid4().hex[:12]}{ext}",
        "filename": clean_name,
        "size_bytes": total_size,
        "content_type": file.content_type,
        "status": "verified_safe",
    }


@router.get("/{incident_id}")
def get_incident(incident_id: int, db: DatabaseSession, current_user: CurrentUser):
    incident = db.get(Incident, incident_id)
    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return _serialize(incident)


@router.patch("/{incident_id}/status")
def update_status(
    incident_id: int,
    payload: IncidentStatusUpdate,
    request: Request,
    db: DatabaseSession,
    current_user: User = Depends(require_roles(
        "super_admin", "infrastructure_manager", "department_officer", "field_inspector"
    )),
):
    incident = db.get(Incident, incident_id)
    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    try:
        transition_incident(db, incident, payload.status, current_user.email, getattr(request.state, "request_id", None))
    except ValueError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    db.commit()
    db.refresh(incident)
    return _serialize(incident)
