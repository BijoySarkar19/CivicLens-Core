"""Add database defaults for incident timestamps.

Revision ID: 0005_part1_incident_timestamps
Revises: 0004_part1_audit_timestamps
Create Date: 2026-10-08
"""

from alembic import op
import sqlalchemy as sa


revision = "0005_part1_incident_timestamps"
down_revision = "0004_part1_audit_timestamps"
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Add database-side defaults to incident timestamps."""

    op.alter_column(
        "incidents",
        "created_at",
        existing_type=sa.DateTime(),
        existing_nullable=False,
        server_default=sa.text("CURRENT_TIMESTAMP"),
    )

    op.alter_column(
        "incidents",
        "updated_at",
        existing_type=sa.DateTime(),
        existing_nullable=False,
        server_default=sa.text("CURRENT_TIMESTAMP"),
    )


def downgrade() -> None:
    """Remove database-side defaults from incident timestamps."""

    op.alter_column(
        "incidents",
        "created_at",
        existing_type=sa.DateTime(),
        existing_nullable=False,
        server_default=None,
    )

    op.alter_column(
        "incidents",
        "updated_at",
        existing_type=sa.DateTime(),
        existing_nullable=False,
        server_default=None,
    )