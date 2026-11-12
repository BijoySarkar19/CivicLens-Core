from __future__ import annotations

import os
import sys
from logging.config import fileConfig
from pathlib import Path

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context


# ---------------------------------------------------------
# Make the backend application importable by Alembic
# ---------------------------------------------------------

CURRENT_FILE = Path(__file__).resolve()
BACKEND_DIR = CURRENT_FILE.parents[1]

if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))


# ---------------------------------------------------------
# Import application database metadata
# ---------------------------------------------------------

from app.db.session import Base  # noqa: E402
from app.models import models  # noqa: F401,E402


# ---------------------------------------------------------
# Alembic configuration
# ---------------------------------------------------------

config = context.config


if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# SQLAlchemy metadata used for autogenerate
target_metadata = Base.metadata


# ---------------------------------------------------------
# Database URL
# ---------------------------------------------------------

def get_database_url() -> str:
    """
    Read the database URL from the environment.

    Docker Compose provides DATABASE_URL through the
    backend container environment.
    """

    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        database_url = config.get_main_option("sqlalchemy.url")

    if not database_url:
        raise RuntimeError(
            "DATABASE_URL or sqlalchemy.url must be configured."
        )

    return database_url


# ---------------------------------------------------------
# Offline migrations
# ---------------------------------------------------------

def run_migrations_offline() -> None:
    """
    Run migrations without creating a database connection.
    """

    url = get_database_url()

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={
            "paramstyle": "named",
        },
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


# ---------------------------------------------------------
# Online migrations
# ---------------------------------------------------------

def run_migrations_online() -> None:
    """
    Run migrations using a live database connection.
    """

    configuration = config.get_section(config.config_ini_section)

    if configuration is None:
        configuration = {}

    configuration["sqlalchemy.url"] = get_database_url()

    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


# ---------------------------------------------------------
# Migration entry point
# ---------------------------------------------------------

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()