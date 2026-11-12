from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.models import Incident
from app.services.audit_service import create_audit_log, publish_domain_event

ALLOWED_TRANSITIONS = {
    "reported": {"under_review"},
    "under_review": {"verified", "rejected"},
    "verified": {"assigned"},
    "assigned": {"in_progress"},
    "in_progress": {"resolved"},
    "resolved": {"closed"},
    "rejected": set(),
    "closed": set(),
}


def transition_incident(db: Session, incident: Incident, new_status: str, actor: str, request_id: str | None = None) -> Incident:
    old = incident.status
    if new_status not in ALLOWED_TRANSITIONS.get(old, set()):
        raise ValueError(f"Invalid incident transition: {old} -> {new_status}")

    incident.status = new_status

    if new_status == "verified":
        incident.verified_by = actor
        incident.verified_at = datetime.now(timezone.utc)

    create_audit_log(
        db, actor=actor, action="incident_status_changed",
        entity="incident", entity_id=incident.id,
        old_value={"status": old}, new_value={"status": new_status},
        request_id=request_id,
    )

    event_name = {
        "verified": "IncidentVerified",
        "closed": "IncidentClosed",
    }.get(new_status)
    if event_name:
        publish_domain_event(
            db, event_type=event_name, entity_type="incident",
            entity_id=incident.id, payload={"from": old, "to": new_status},
        )
    return incident
