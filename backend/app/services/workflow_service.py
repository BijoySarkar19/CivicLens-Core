from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.models import WorkOrder
from app.services.audit_service import create_audit_log, publish_domain_event

WORK_ORDER_TRANSITIONS = {
    "created": {"assigned", "cancelled"},
    "assigned": {"in_progress", "cancelled"},
    "in_progress": {"completed", "cancelled"},
    "completed": set(),
    "cancelled": set(),
}


def transition_work_order(db: Session, work_order: WorkOrder, new_status: str, actor: str, request_id: str | None = None) -> WorkOrder:
    old = work_order.status
    if new_status not in WORK_ORDER_TRANSITIONS.get(old, set()):
        raise ValueError(f"Invalid work order transition: {old} -> {new_status}")

    work_order.status = new_status
    if new_status == "completed":
        work_order.completed_at = datetime.now(timezone.utc)

    create_audit_log(
        db, actor=actor, action="work_order_status_changed",
        entity="work_order", entity_id=work_order.id,
        old_value={"status": old}, new_value={"status": new_status},
        request_id=request_id,
    )

    publish_domain_event(
        db,
        event_type="WorkOrderCompleted" if new_status == "completed" else "WorkOrderStatusChanged",
        entity_type="work_order",
        entity_id=work_order.id,
        payload={"from": old, "to": new_status},
    )
    return work_order
