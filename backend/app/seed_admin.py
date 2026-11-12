from datetime import datetime, timezone

from app.core.config import settings
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.models import User


def seed_admin() -> None:
    db = SessionLocal()

    try:
        existing = db.query(User).filter(
            User.email == settings.admin_email
        ).first()

        if existing:
            return

        admin = User(
            email=settings.admin_email,
            password_hash=hash_password(settings.admin_password),
            role="super_admin",
            active=True,
            created_at=datetime.now(timezone.utc),
        )

        db.add(admin)
        db.commit()

    finally:
        db.close()