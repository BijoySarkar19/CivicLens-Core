"""Part 1 professional foundation: provenance, workflow, PostGIS and events."""

from alembic import op
import sqlalchemy as sa
from geoalchemy2 import Geometry

revision = "0002_part1_prof_foundation"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade():
    op.execute("CREATE EXTENSION IF NOT EXISTS postgis")

    op.add_column("assets", sa.Column("source_dataset_id", sa.Integer(), nullable=True))
    op.add_column("assets", sa.Column("source_record_id", sa.String(150), nullable=True))
    op.add_column("assets", sa.Column("source_name", sa.String(255), nullable=True))
    op.add_column("assets", sa.Column("imported_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column(
        "assets",
        sa.Column(
            "location",
            Geometry("POINT", srid=4326),
            nullable=True,
        ),
    )
    op.create_foreign_key("fk_assets_source_dataset", "assets", "dataset_sources", ["source_dataset_id"], ["id"]) if False else None

    op.add_column("incidents", sa.Column("reporter_id", sa.Integer(), nullable=True))
    op.add_column(
        "incidents",
        sa.Column(
            "location",
            Geometry("POINT", srid=4326),
            nullable=True,
        ),
    )
    op.add_column("incidents", sa.Column("verified_by", sa.String(320), nullable=True))
    op.add_column("incidents", sa.Column("verified_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("incidents", sa.Column("resolution_notes", sa.Text(), nullable=True))
    op.create_foreign_key("fk_incidents_reporter", "incidents", "users", ["reporter_id"], ["id"])

    op.add_column("work_orders", sa.Column("assigned_department", sa.String(150), nullable=True))
    op.add_column("work_orders", sa.Column("assigned_to", sa.String(320), nullable=True))
    op.add_column("work_orders", sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True))
    op.alter_column("work_orders", "estimated_cost", existing_type=sa.Float(), nullable=True)
    op.alter_column("work_orders", "actual_cost", existing_type=sa.Float(), nullable=True)

    op.add_column("audit_logs", sa.Column("request_id", sa.String(100), nullable=True))

    op.create_table(
        "departments",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("code", sa.String(50), nullable=False, unique=True),
        sa.Column("name", sa.String(150), nullable=False, unique=True),
        sa.Column("description", sa.Text()),
        sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )

    op.create_table(
        "dataset_sources",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("source_name", sa.String(255), nullable=False),
        sa.Column("publisher", sa.String(255)),
        sa.Column("dataset_name", sa.String(255), nullable=False),
        sa.Column("source_url", sa.Text()),
        sa.Column("license", sa.String(255)),
        sa.Column("imported_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("record_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("status", sa.String(40), nullable=False, server_default="completed"),
    )

    op.create_foreign_key("fk_assets_source_dataset", "assets", "dataset_sources", ["source_dataset_id"], ["id"])

    op.create_table(
        "maintenance_records",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("asset_id", sa.Integer(), sa.ForeignKey("assets.id"), nullable=False),
        sa.Column("work_order_id", sa.Integer(), sa.ForeignKey("work_orders.id"), nullable=True),
        sa.Column("maintenance_type", sa.String(100), nullable=False),
        sa.Column("description", sa.Text()),
        sa.Column("cost", sa.Float()),
        sa.Column("performed_by", sa.String(320)),
        sa.Column("performed_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )

    op.create_table(
        "domain_events",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("event_type", sa.String(120), nullable=False),
        sa.Column("entity_type", sa.String(80), nullable=False),
        sa.Column("entity_id", sa.Integer(), nullable=False),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("occurred_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )

    op.create_index("ix_domain_events_type", "domain_events", ["event_type"])
    op.create_index("ix_domain_events_entity", "domain_events", ["entity_type", "entity_id"])
    op.create_index("ix_audit_logs_request_id", "audit_logs", ["request_id"])

    op.execute("""
        UPDATE assets
        SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        WHERE longitude IS NOT NULL AND latitude IS NOT NULL
    """)

    op.execute("""
        UPDATE incidents
        SET location = ST_SetSRID(
            ST_MakePoint(
                (SELECT longitude FROM assets WHERE assets.id = incidents.asset_id),
                (SELECT latitude FROM assets WHERE assets.id = incidents.asset_id)
            ), 4326
        )
        WHERE asset_id IS NOT NULL
    """)


def downgrade():
    op.drop_constraint("fk_incidents_reporter", "incidents", type_="foreignkey")
    op.drop_index("ix_audit_logs_request_id", table_name="audit_logs")
    op.drop_index("ix_domain_events_entity", table_name="domain_events")
    op.drop_index("ix_domain_events_type", table_name="domain_events")
    op.drop_table("domain_events")
    op.drop_table("maintenance_records")
    op.drop_constraint("fk_assets_source_dataset", "assets", type_="foreignkey")
    op.drop_table("dataset_sources")
    op.drop_table("departments")

    for table, column in [
        ("audit_logs", "request_id"),
        ("work_orders", "completed_at"),
        ("work_orders", "assigned_to"),
        ("work_orders", "assigned_department"),
        ("incidents", "resolution_notes"),
        ("incidents", "verified_at"),
        ("incidents", "verified_by"),
        ("incidents", "location"),
        ("incidents", "reporter_id"),
        ("assets", "location"),
        ("assets", "imported_at"),
        ("assets", "source_name"),
        ("assets", "source_record_id"),
        ("assets", "source_dataset_id"),
    ]:
        op.drop_column(table, column)