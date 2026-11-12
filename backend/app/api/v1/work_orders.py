from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select

from app.api.deps import CurrentUser, DatabaseSession, require_roles
from app.models.models import Asset, Incident, User, WorkOrder
from app.schemas.common import WorkOrderCreate, WorkOrderStatusUpdate
from app.services.audit_service import create_audit_log, publish_domain_event
from app.services.workflow_service import transition_work_order

router = APIRouter(prefix="/work-orders", tags=["Work Orders"])


@router.get("/")
def list_work_orders(db: DatabaseSession, current_user: CurrentUser):
    rows = db.scalars(select(WorkOrder).order_by(WorkOrder.created_at.desc())).all()
    return {"items": [
        {"id": x.id, "work_order_code": x.work_order_code, "asset_id": x.asset_id,
         "incident_id": x.incident_id, "priority": x.priority, "status": x.status,
         "assigned_department": x.assigned_department, "assigned_to": x.assigned_to,
         "estimated_cost": x.estimated_cost, "actual_cost": x.actual_cost,
         "due_date": x.due_date, "completed_at": x.completed_at, "created_at": x.created_at}
        for x in rows
    ], "total": len(rows)}


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_work_order(payload: WorkOrderCreate, request: Request, db: DatabaseSession,
                       current_user: User = Depends(require_roles(
                           "super_admin", "infrastructure_manager", "department_officer"
                       ))):
    if payload.asset_id and db.get(Asset, payload.asset_id) is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    if payload.incident_id and db.get(Incident, payload.incident_id) is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    due_date = datetime.fromisoformat(payload.due_date) if payload.due_date else None
    order = WorkOrder(
        work_order_code=f"WO-{uuid4().hex[:10].upper()}",
        asset_id=payload.asset_id, incident_id=payload.incident_id,
        assigned_department=payload.assigned_department, assigned_to=payload.assigned_to,
        priority=payload.priority, status="created",
        estimated_cost=payload.estimated_cost, due_date=due_date,
    )
    db.add(order)
    db.flush()
    create_audit_log(db, actor=current_user.email, action="work_order_created",
                     entity="work_order", entity_id=order.id,
                     new_value={"status": "created"},
                     request_id=getattr(request.state, "request_id", None))
    publish_domain_event(db, event_type="WorkOrderCreated", entity_type="work_order",
                         entity_id=order.id, payload={"status": "created"})
    db.commit()
    db.refresh(order)
    return {"id": order.id, "work_order_code": order.work_order_code, "status": order.status}


@router.patch("/{work_order_id}/status")
def update_work_order_status(work_order_id: int, payload: WorkOrderStatusUpdate, request: Request,
                              db: DatabaseSession,
                              current_user: User = Depends(require_roles(
                                  "super_admin", "infrastructure_manager", "department_officer", "field_inspector"
                              ))):
    order = db.get(WorkOrder, work_order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Work order not found")
    try:
        transition_work_order(db, order, payload.status, current_user.email, getattr(request.state, "request_id", None))
    except ValueError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    db.commit()
    db.refresh(order)
    return {"id": order.id, "work_order_code": order.work_order_code, "status": order.status}
