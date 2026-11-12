from datetime import datetime
from enum import Enum

from geoalchemy2 import Geometry
from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    JSON,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class UserRole(str, Enum):
    SUPER_ADMIN = "super_admin"
    INFRASTRUCTURE_MANAGER = "infrastructure_manager"
    DEPARTMENT_OFFICER = "department_officer"
    FIELD_INSPECTOR = "field_inspector"
    DATA_ADMINISTRATOR = "data_administrator"
    PUBLIC_USER = "public_user"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    email: Mapped[str] = mapped_column(
        String(320),
        unique=True,
        index=True,
        nullable=False,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    role: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default=UserRole.PUBLIC_USER.value,
    )

    active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    incidents: Mapped[list["Incident"]] = relationship(
        back_populates="reporter",
    )


class Department(Base):
    __tablename__ = "departments"

    id: Mapped[int] = mapped_column(primary_key=True)

    code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
    )

    active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )


class DatasetSource(Base):
    __tablename__ = "dataset_sources"

    id: Mapped[int] = mapped_column(primary_key=True)

    source_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    publisher: Mapped[str | None] = mapped_column(
        String(255),
    )

    dataset_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    source_url: Mapped[str | None] = mapped_column(
        Text,
    )

    license: Mapped[str | None] = mapped_column(
        String(255),
    )

    imported_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    record_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(40),
        default="completed",
        nullable=False,
    )


class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    asset_code: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    asset_type: Mapped[str] = mapped_column(
        String(100),
        index=True,
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
    )

    latitude: Mapped[float | None] = mapped_column(
        Float,
    )

    longitude: Mapped[float | None] = mapped_column(
        Float,
    )

    location: Mapped[object | None] = mapped_column(
        Geometry(
            "POINT",
            srid=4326,
            spatial_index=True,
        ),
    )

    condition: Mapped[str] = mapped_column(
        String(50),
        default="unknown",
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="active",
        nullable=False,
    )

    district: Mapped[str | None] = mapped_column(
        String(150),
        index=True,
    )

    # Flexible structured metadata for future extensions.
    # IMPORTANT: default=dict creates a new dictionary per Asset.
    metadata_json: Mapped[dict] = mapped_column(
        JSON,
        default=dict,
        nullable=False,
    )

    source_dataset_id: Mapped[int | None] = mapped_column(
        ForeignKey("dataset_sources.id"),
    )

    source_record_id: Mapped[str | None] = mapped_column(
        String(150),
    )

    source_name: Mapped[str | None] = mapped_column(
        String(255),
    )

    imported_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    incidents: Mapped[list["Incident"]] = relationship(
        back_populates="asset",
    )

    inspections: Mapped[list["Inspection"]] = relationship(
        back_populates="asset",
    )

    maintenance_records: Mapped[list["MaintenanceRecord"]] = relationship(
        back_populates="asset",
    )

    work_orders: Mapped[list["WorkOrder"]] = relationship(
        back_populates="asset",
    )


class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    incident_code: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    asset_id: Mapped[int | None] = mapped_column(
        ForeignKey("assets.id"),
        index=True,
    )

    reporter_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
    )

    reporter_email: Mapped[str | None] = mapped_column(
        String(320),
    )

    category: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    severity: Mapped[str] = mapped_column(
        String(50),
        default="medium",
        nullable=False,
    )

    priority: Mapped[str] = mapped_column(
        String(50),
        default="normal",
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="reported",
        nullable=False,
    )

    assigned_department: Mapped[str | None] = mapped_column(
        String(150),
    )

    location: Mapped[object | None] = mapped_column(
        Geometry(
            "POINT",
            srid=4326,
            spatial_index=True,
        ),
    )

    verified_by: Mapped[str | None] = mapped_column(
        String(320),
    )

    verified_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    resolution_notes: Mapped[str | None] = mapped_column(
        Text,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    asset: Mapped[Asset | None] = relationship(
        back_populates="incidents",
    )

    reporter: Mapped[User | None] = relationship(
        back_populates="incidents",
    )

    work_orders: Mapped[list["WorkOrder"]] = relationship(
        back_populates="incident",
    )


class WorkOrder(Base):
    __tablename__ = "work_orders"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    work_order_code: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
        nullable=False,
    )

    asset_id: Mapped[int | None] = mapped_column(
        ForeignKey("assets.id"),
        index=True,
    )

    incident_id: Mapped[int | None] = mapped_column(
        ForeignKey("incidents.id"),
        index=True,
    )

    assigned_department: Mapped[str | None] = mapped_column(
        String(150),
    )

    assigned_to: Mapped[str | None] = mapped_column(
        String(320),
    )

    priority: Mapped[str] = mapped_column(
        String(50),
        default="normal",
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="created",
        nullable=False,
    )

    estimated_cost: Mapped[float | None] = mapped_column(
        Float,
    )

    actual_cost: Mapped[float | None] = mapped_column(
        Float,
    )

    due_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    asset: Mapped[Asset | None] = relationship(
        back_populates="work_orders",
    )

    incident: Mapped[Incident | None] = relationship(
        back_populates="work_orders",
    )


class Inspection(Base):
    __tablename__ = "inspections"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    asset_id: Mapped[int] = mapped_column(
        ForeignKey("assets.id"),
        index=True,
        nullable=False,
    )

    inspector_email: Mapped[str] = mapped_column(
        String(320),
        nullable=False,
    )

    condition: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="completed",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    asset: Mapped[Asset] = relationship(
        back_populates="inspections",
    )


class MaintenanceRecord(Base):
    __tablename__ = "maintenance_records"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    asset_id: Mapped[int] = mapped_column(
        ForeignKey("assets.id"),
        index=True,
        nullable=False,
    )

    work_order_id: Mapped[int | None] = mapped_column(
        ForeignKey("work_orders.id"),
    )

    maintenance_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
    )

    cost: Mapped[float | None] = mapped_column(
        Float,
    )

    performed_by: Mapped[str | None] = mapped_column(
        String(320),
    )

    performed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    asset: Mapped[Asset] = relationship(
        back_populates="maintenance_records",
    )


class DomainEvent(Base):
    __tablename__ = "domain_events"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    event_type: Mapped[str] = mapped_column(
        String(120),
        index=True,
        nullable=False,
    )

    entity_type: Mapped[str] = mapped_column(
        String(80),
        index=True,
        nullable=False,
    )

    entity_id: Mapped[int] = mapped_column(
        Integer,
        index=True,
        nullable=False,
    )

    payload: Mapped[dict] = mapped_column(
        JSON,
        default=dict,
        nullable=False,
    )

    occurred_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    actor: Mapped[str | None] = mapped_column(
        String(320),
    )

    action: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
    )

    entity: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    entity_id: Mapped[str | None] = mapped_column(
        String(100),
    )

    old_value: Mapped[dict | None] = mapped_column(
        JSON,
    )

    new_value: Mapped[dict | None] = mapped_column(
        JSON,
    )

    request_id: Mapped[str | None] = mapped_column(
        String(100),
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )