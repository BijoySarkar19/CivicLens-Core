from fastapi import APIRouter, Depends, status
from sqlalchemy import select

from app.api.deps import CurrentUser, DatabaseSession, require_roles
from app.models.models import DatasetSource, User
from app.schemas.common import DatasetSourceCreate

router = APIRouter(prefix="/datasets", tags=["Data Provenance"])


@router.get("/sources")
def list_sources(db: DatabaseSession, current_user: CurrentUser):
    rows = db.scalars(select(DatasetSource).order_by(DatasetSource.imported_at.desc())).all()
    return {"items": [
        {"id": x.id, "source_name": x.source_name, "publisher": x.publisher,
         "dataset_name": x.dataset_name, "source_url": x.source_url, "license": x.license,
         "imported_at": x.imported_at, "record_count": x.record_count, "status": x.status}
        for x in rows
    ]}


@router.post("/sources", status_code=status.HTTP_201_CREATED)
def create_source(
    payload: DatasetSourceCreate,
    db: DatabaseSession,
    current_user: User = Depends(require_roles("super_admin", "data_administrator")),
):
    source = DatasetSource(**payload.model_dump())
    db.add(source)
    db.commit()
    db.refresh(source)
    return {"id": source.id, "dataset_name": source.dataset_name, "status": source.status}
