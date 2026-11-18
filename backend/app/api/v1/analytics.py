from fastapi import APIRouter
from sqlalchemy import func, select

from app.api.deps import CurrentUser, DatabaseSession
from app.models.models import Asset, Incident, Inspection, MaintenanceRecord, WorkOrder

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/summary")
def analytics_summary(db: DatabaseSession, current_user: CurrentUser):
    assets = db.scalar(select(func.count(Asset.id))) or 0
    incidents = db.scalar(select(func.count(Incident.id))) or 0
    open_incidents = db.scalar(select(func.count(Incident.id)).where(Incident.status.notin_(["closed", "resolved", "rejected"]))) or 0
    critical = db.scalar(select(func.count(Incident.id)).where(Incident.severity == "critical")) or 0
    work_orders = db.scalar(select(func.count(WorkOrder.id))) or 0
    open_work = db.scalar(select(func.count(WorkOrder.id)).where(WorkOrder.status.notin_(["completed", "cancelled"]))) or 0
    inspections = db.scalar(select(func.count(Inspection.id))) or 0
    maintenance = db.scalar(select(func.count(MaintenanceRecord.id))) or 0
    return {
        "assets": assets, "incidents": incidents, "open_incidents": open_incidents,
        "critical_incidents": critical, "work_orders": work_orders,
        "open_work_orders": open_work, "inspections": inspections,
        "maintenance_records": maintenance,
        "ai_enabled": True, "source": "spatial_transactional_engine",
    }
