from fastapi import APIRouter

from app.api.v1 import analytics, assets, audit, auth, departments, datasets, incidents, inspections, maintenance, work_orders, admin, ai

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth.router)
api_router.include_router(assets.router)
api_router.include_router(incidents.router)
api_router.include_router(work_orders.router)
api_router.include_router(inspections.router)
api_router.include_router(maintenance.router)
api_router.include_router(departments.router)
api_router.include_router(datasets.router)
api_router.include_router(analytics.router)
api_router.include_router(audit.router)
api_router.include_router(admin.router)
api_router.include_router(ai.router)
