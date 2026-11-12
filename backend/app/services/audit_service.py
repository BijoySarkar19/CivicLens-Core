import json
from typing import Any

from sqlalchemy.orm import Session

from app.models.models import AuditLog, DomainEvent


def create_audit_log(
    db: Session,
    *,
    actor: str | None,
    action: str,
    entity: str,
    entity_id: int | str | None = None,
    old_value: Any = None,
    new_value: Any = None,
    request_id: str | None = None,
) -> AuditLog:
    audit = AuditLog(
        actor=actor,
        action=action,
        entity=entity,
        entity_id=str(entity_id) if entity_id is not None else None,
        old_value=_safe_json(old_value),
        new_value=_safe_json(new_value),
        request_id=request_id,
    )
    db.add(audit)
    return audit


def _safe_json(value: Any) -> dict | list | str | None:
    if value is None or isinstance(value, (dict, list, str)):
        return value
    return json.loads(json.dumps(value, default=str))


def publish_domain_event(
    db: Session,
    *,
    event_type: str,
    entity_type: str,
    entity_id: int,
    payload: dict,
) -> DomainEvent:
    event = DomainEvent(
        event_type=event_type,
        entity_type=entity_type,
        entity_id=entity_id,
        payload=payload,
    )
    db.add(event)
    return event
