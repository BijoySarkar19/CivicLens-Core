from fastapi import APIRouter, Depends
from sqlalchemy import select

from app.api.deps import DatabaseSession, require_roles
from app.models.models import AuditLog, User

router = APIRouter(prefix="/audit", tags=["Audit"])


@router.get("/")
def list_audit_logs(
    db: DatabaseSession,
    current_user: User = Depends(
        require_roles("super_admin", "infrastructure_manager")
    ),
):
    rows = (
        db.scalars(
            select(AuditLog)
            .order_by(AuditLog.created_at.desc())
            .limit(200)
        )
        .all()
    )

    return {
        "items": [
            {
                "id": x.id,
                "actor": x.actor,
                "action": x.action,
                "entity": x.entity,
                "entity_id": x.entity_id,
                "old_value": x.old_value,
                "new_value": x.new_value,
                "request_id": x.request_id,
                "created_at": x.created_at,
            }
            for x in rows
        ],
        "total": len(rows),
    }