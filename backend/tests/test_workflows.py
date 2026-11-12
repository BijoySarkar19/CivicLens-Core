from app.services.incident_service import ALLOWED_TRANSITIONS
from app.services.workflow_service import WORK_ORDER_TRANSITIONS


def test_incident_workflow_is_closed():
    assert "under_review" in ALLOWED_TRANSITIONS["reported"]
    assert "verified" in ALLOWED_TRANSITIONS["under_review"]
    assert "assigned" in ALLOWED_TRANSITIONS["verified"]
    assert "in_progress" in ALLOWED_TRANSITIONS["assigned"]
    assert "resolved" in ALLOWED_TRANSITIONS["in_progress"]
    assert "closed" in ALLOWED_TRANSITIONS["resolved"]


def test_work_order_workflow_is_controlled():
    assert "assigned" in WORK_ORDER_TRANSITIONS["created"]
    assert "in_progress" in WORK_ORDER_TRANSITIONS["assigned"]
    assert "completed" in WORK_ORDER_TRANSITIONS["in_progress"]
    assert WORK_ORDER_TRANSITIONS["completed"] == set()
