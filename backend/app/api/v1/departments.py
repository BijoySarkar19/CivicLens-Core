from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select

from app.api.deps import CurrentUser, DatabaseSession, require_roles
from app.models.models import Department, User
from app.schemas.common import DepartmentCreate

router = APIRouter(prefix="/departments", tags=["Departments"])


@router.get("/")
def list_departments(db: DatabaseSession, current_user: CurrentUser):
    rows = db.scalars(select(Department).where(Department.active.is_(True)).order_by(Department.name)).all()
    return {"items": [{"id": x.id, "code": x.code, "name": x.name, "description": x.description} for x in rows]}


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_department(
    payload: DepartmentCreate,
    db: DatabaseSession,
    current_user: User = Depends(require_roles("super_admin", "infrastructure_manager")),
):
    if db.scalar(select(Department).where(Department.code == payload.code)):
        raise HTTPException(status_code=409, detail="Department code already exists")
    item = Department(code=payload.code, name=payload.name, description=payload.description)
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"id": item.id, "code": item.code, "name": item.name}
