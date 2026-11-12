from typing import Any
from pydantic import BaseModel, ConfigDict, Field


class AssetCreate(BaseModel):
    asset_code: str = Field(min_length=2, max_length=100)
    name: str = Field(min_length=2, max_length=255)
    asset_type: str = Field(min_length=2, max_length=100)
    description: str | None = None
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    condition: str = "unknown"
    district: str | None = None
    source_dataset_id: int | None = None
    source_record_id: str | None = None
    source_name: str | None = None


class IncidentCreate(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    description: str = Field(min_length=5)
    category: str = Field(min_length=2, max_length=100)
    severity: str = "medium"
    priority: str = "normal"
    asset_id: int | None = None
    reporter_email: str | None = None
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)


class PublicIncidentCreate(IncidentCreate):
    reporter_email: str


class IncidentStatusUpdate(BaseModel):
    status: str


class WorkOrderCreate(BaseModel):
    asset_id: int | None = None
    incident_id: int | None = None
    priority: str = "normal"
    assigned_department: str | None = None
    assigned_to: str | None = None
    estimated_cost: float | None = None
    due_date: str | None = None


class WorkOrderStatusUpdate(BaseModel):
    status: str


class InspectionCreate(BaseModel):
    asset_id: int
    condition: str
    notes: str | None = None


class MaintenanceCreate(BaseModel):
    asset_id: int
    work_order_id: int | None = None
    maintenance_type: str
    description: str | None = None
    cost: float | None = None


class DepartmentCreate(BaseModel):
    code: str
    name: str
    description: str | None = None


class AssetResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    asset_code: str
    name: str
    asset_type: str
    description: str | None
    latitude: float | None
    longitude: float | None
    condition: str
    status: str
    district: str | None
    source_dataset_id: int | None
    source_record_id: str | None
    source_name: str | None


class DatasetSourceCreate(BaseModel):
    source_name: str
    publisher: str | None = None
    dataset_name: str
    source_url: str | None = None
    license: str | None = None


class DatasetSourceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    source_name: str
    publisher: str | None
    dataset_name: str
    source_url: str | None
    license: str | None
    imported_at: Any
    record_count: int
    status: str
