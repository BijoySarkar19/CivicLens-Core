from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import select

from app.api.deps import CurrentUser, DatabaseSession, require_roles
from app.models.models import Asset, User
from app.schemas.common import AssetCreate, AssetResponse
from app.services.audit_service import create_audit_log, publish_domain_event

try:
    from geoalchemy2.shape import from_shape
    from shapely.geometry import Point
except ImportError:
    from_shape = None
    Point = None

router = APIRouter(prefix="/assets", tags=["Assets"])


def _point(latitude: float | None, longitude: float | None):
    if latitude is None or longitude is None or from_shape is None or Point is None:
        return None
    return from_shape(Point(longitude, latitude), srid=4326)


@router.get("/")
def list_assets(
    db: DatabaseSession,
    current_user: CurrentUser,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    asset_type: str | None = None,
    district: str | None = None,
    condition: str | None = None,
):
    statement = select(Asset).order_by(Asset.created_at.desc()).offset(skip).limit(limit)
    if asset_type:
        statement = statement.where(Asset.asset_type == asset_type)
    if district:
        statement = statement.where(Asset.district == district)
    if condition:
        statement = statement.where(Asset.condition == condition)
    rows = db.scalars(statement).all()
    return {"items": [
        {
            "id": x.id, "asset_code": x.asset_code, "name": x.name,
            "asset_type": x.asset_type, "description": x.description,
            "latitude": x.latitude, "longitude": x.longitude,
            "condition": x.condition, "status": x.status, "district": x.district,
            "source_dataset_id": x.source_dataset_id, "source_record_id": x.source_record_id,
            "source_name": x.source_name, "created_at": x.created_at, "updated_at": x.updated_at,
        } for x in rows
    ], "total": len(rows), "skip": skip, "limit": limit}


@router.post("/", response_model=AssetResponse, status_code=status.HTTP_201_CREATED)
def create_asset(
    payload: AssetCreate,
    request: Request,
    db: DatabaseSession,
    current_user: User = Depends(require_roles(
        "super_admin", "infrastructure_manager", "department_officer", "data_administrator"
    )),
):
    if db.scalar(select(Asset).where(Asset.asset_code == payload.asset_code)):
        raise HTTPException(status_code=409, detail="Asset code already exists")

    asset = Asset(
        asset_code=payload.asset_code or f"AST-{uuid4().hex[:10].upper()}",
        name=payload.name, asset_type=payload.asset_type, description=payload.description,
        latitude=payload.latitude, longitude=payload.longitude, location=_point(payload.latitude, payload.longitude),
        condition=payload.condition, status="active", district=payload.district,
        source_dataset_id=payload.source_dataset_id, source_record_id=payload.source_record_id,
        source_name=payload.source_name,
    )
    db.add(asset)
    db.flush()
    create_audit_log(db, actor=current_user.email, action="asset_created", entity="asset",
                     entity_id=asset.id, new_value={"asset_code": asset.asset_code},
                     request_id=getattr(request.state, "request_id", None))
    publish_domain_event(db, event_type="AssetCreated", entity_type="asset",
                         entity_id=asset.id, payload={"asset_code": asset.asset_code})
    db.commit()
    db.refresh(asset)
    return asset


@router.get("/{asset_id}", response_model=AssetResponse)
def get_asset(asset_id: int, db: DatabaseSession, current_user: CurrentUser):
    asset = db.get(Asset, asset_id)
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset
