"""Add database default for audit log timestamps.

Revision ID: 0004_part1_audit_timestamps
Revises: 0003_part1_asset_timestamps
Create Date: 2026-10-08
"""

from alembic import op
import sqlalchemy as sa


revision = "0004_part1_audit_timestamps"
down_revision = "0003_part1_asset_timestamps"
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Add a database-side default to audit log timestamps."""

    op.alter_column(
        "audit_logs",
        "created_at",
        existing_type=sa.DateTime(),
        existing_nullable=False,
        server_default=sa.text("CURRENT_TIMESTAMP"),
    )


def downgrade() -> None:
    """Remove the database-side default from audit log timestamps."""

    op.alter_column(
        "audit_logs",
        "created_at",
        existing_type=sa.DateTime(),
        existing_nullable=False,
        server_default=None,
    )