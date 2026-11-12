from celery import Celery

from app.core.config import settings

celery_app = Celery("civiclens", broker=settings.redis_url, backend=settings.redis_url)
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
)


@celery_app.task(name="civiclens.jobs.health_check")
def health_check():
    return {"status": "ok", "service": "civiclens-worker"}


@celery_app.task(name="civiclens.jobs.generate_report")
def generate_report(report_type: str):
    return {"status": "queued", "report_type": report_type}


@celery_app.task(name="civiclens.jobs.process_dataset")
def process_dataset(dataset_id: int):
    return {"status": "queued", "dataset_id": dataset_id}
