"""Add database defaults for asset timestamps.

Revision ID: 0003_part1_asset_timestamp_defaults
Revises: 0002_part1_prof_foundation
Create Date: 2026-10-08
"""

from alembic import op
import sqlalchemy as sa


revision = "0003_part1_asset_timestamps"
down_revision = "0002_part1_prof_foundation"
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Add server-side timestamp defaults to assets."""

    op.alter_column(
        "assets",
        "created_at",
        existing_type=sa.DateTime(timezone=True),
        existing_nullable=False,
        server_default=sa.text("CURRENT_TIMESTAMP"),
    )

    op.alter_column(
        "assets",
        "updated_at",
        existing_type=sa.DateTime(timezone=True),
        existing_nullable=False,
        server_default=sa.text("CURRENT_TIMESTAMP"),
    )


def downgrade() -> None:
    """Remove server-side timestamp defaults from assets."""

    op.alter_column(
        "assets",
        "created_at",
        existing_type=sa.DateTime(timezone=True),
        existing_nullable=False,
        server_default=None,
    )

    op.alter_column(
        "assets",
        "updated_at",
        existing_type=sa.DateTime(timezone=True),
        existing_nullable=False,
        server_default=None,
    )