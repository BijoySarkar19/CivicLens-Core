from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select

from app.api.deps import CurrentUser, DatabaseSession, require_roles
from app.models.models import Asset, Inspection, User
from app.schemas.common import InspectionCreate
from app.services.audit_service import create_audit_log, publish_domain_event

router = APIRouter(prefix="/inspections", tags=["Inspections"])


@router.get("/")
def list_inspections(db: DatabaseSession, current_user: CurrentUser):
    rows = db.scalars(select(Inspection).order_by(Inspection.created_at.desc())).all()
    return {"items": [
        {"id": x.id, "asset_id": x.asset_id, "inspector_email": x.inspector_email,
         "condition": x.condition, "notes": x.notes, "status": x.status, "created_at": x.created_at}
        for x in rows
    ], "total": len(rows)}


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_inspection(
    payload: InspectionCreate,
    request: Request,
    db: DatabaseSession,
    current_user: User = Depends(require_roles("super_admin", "infrastructure_manager", "department_officer", "field_inspector")),
):
    asset = db.get(Asset, payload.asset_id)
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    inspection = Inspection(
        asset_id=payload.asset_id, inspector_email=current_user.email,
        condition=payload.condition, notes=payload.notes, status="completed",
    )
    db.add(inspection)
    asset.condition = payload.condition
    db.flush()
    create_audit_log(db, actor=current_user.email, action="inspection_completed",
                     entity="inspection", entity_id=inspection.id,
                     new_value={"condition": payload.condition},
                     request_id=getattr(request.state, "request_id", None))
    publish_domain_event(db, event_type="InspectionCompleted", entity_type="inspection",
                         entity_id=inspection.id, payload={"asset_id": asset.id})
    db.commit()
    db.refresh(inspection)
    return {"id": inspection.id, "asset_id": inspection.asset_id, "condition": inspection.condition, "status": inspection.status}
