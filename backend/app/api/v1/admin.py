"""
Admin API endpoints — full system oversight.

Requires super_admin or infrastructure_manager role.
"""
from typing import Annotated

from fastapi import APIRouter, Depends, Query

from app.api.deps import DatabaseSession, require_roles
from app.models.models import User, UserRole
from sqlalchemy import select

router = APIRouter(prefix="/admin", tags=["Administration"])

AdminUser = Annotated[
    User,
    Depends(require_roles(UserRole.SUPER_ADMIN.value, UserRole.INFRASTRUCTURE_MANAGER.value)),
]


@router.get("/users")
def list_users(
    db: DatabaseSession,
    admin: AdminUser,
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
):
    """List all users. Admin only."""
    users = db.scalars(
        select(User).order_by(User.created_at.desc()).limit(limit).offset(offset)
    ).all()
    total = db.scalar(select(__import__("sqlalchemy", fromlist=["func"]).func.count(User.id))) or 0
    return {
        "items": [
            {
                "id": u.id,
                "email": u.email,
                "role": u.role,
                "active": u.active,
                "created_at": u.created_at,
            }
            for u in users
        ],
        "total": total,
        "limit": limit,
        "offset": offset,
    }


@router.get("/stats")
def admin_stats(db: DatabaseSession, admin: AdminUser):
    """System statistics. Admin only."""
    from sqlalchemy import func
    from app.models.models import AuditLog

    return {
        "users": db.scalar(select(func.count(User.id))) or 0,
        "active_users": db.scalar(select(func.count(User.id)).where(User.active.is_(True))) or 0,
        "audit_events": db.scalar(select(func.count(AuditLog.id))) or 0,
    }
