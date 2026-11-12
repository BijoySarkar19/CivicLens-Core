from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select

from app.api.deps import CurrentUser, DatabaseSession, require_roles
from app.models.models import Asset, MaintenanceRecord, User
from app.schemas.common import MaintenanceCreate
from app.services.audit_service import create_audit_log

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])


@router.get("/")
def list_maintenance(db: DatabaseSession, current_user: CurrentUser):
    rows = db.scalars(select(MaintenanceRecord).order_by(MaintenanceRecord.performed_at.desc())).all()
    return {"items": [
        {"id": x.id, "asset_id": x.asset_id, "work_order_id": x.work_order_id,
         "maintenance_type": x.maintenance_type, "description": x.description,
         "cost": x.cost, "performed_by": x.performed_by, "performed_at": x.performed_at}
        for x in rows
    ], "total": len(rows)}


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_maintenance(
    payload: MaintenanceCreate,
    request: Request,
    db: DatabaseSession,
    current_user: User = Depends(require_roles("super_admin", "infrastructure_manager", "department_officer", "field_inspector")),
):
    if db.get(Asset, payload.asset_id) is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    record = MaintenanceRecord(
        asset_id=payload.asset_id, work_order_id=payload.work_order_id,
        maintenance_type=payload.maintenance_type, description=payload.description,
        cost=payload.cost, performed_by=current_user.email,
    )
    db.add(record)
    db.flush()
    create_audit_log(db, actor=current_user.email, action="maintenance_recorded",
                     entity="maintenance", entity_id=record.id,
                     new_value={"asset_id": record.asset_id},
                     request_id=getattr(request.state, "request_id", None))
    db.commit()
    db.refresh(record)
    return {"id": record.id, "asset_id": record.asset_id, "maintenance_type": record.maintenance_type}
