import logging
import time
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from sqlalchemy import text

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.logging import configure_logging
from app.db.session import SessionLocal
from app.seed_admin import seed_admin

configure_logging()
logger = logging.getLogger("civiclens.api")

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        seed_admin()
    except Exception as exc:
        logger.warning("Database unavailable during startup seed: %s. Operating in standalone demo mode.", exc)
    logger.info("CivicLens AI Platform API starting")
    logger.info("Predictive AI Engine status: %s", settings.civiclens_ai_enabled)
    yield
    logger.info("CivicLens AI Platform API shutting down")


app = FastAPI(
    title="CivicLens AI Platform API",
    description="Smart urban governance & public infrastructure predictive intelligence platform.",
    version="2.1.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Request-ID"],
)


@app.middleware("http")
async def security_and_request_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
    request.state.request_id = request_id
    start = time.perf_counter()

    try:
        response = await call_next(request)
    except Exception:
        logger.exception(
            "Unhandled request | request_id=%s | method=%s | path=%s",
            request_id, request.method, request.url.path,
        )
        response = JSONResponse(
            status_code=500,
            content={"detail": "Internal server error", "request_id": request_id},
        )

    response.headers["X-Request-ID"] = request_id
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(self), microphone=(), geolocation=(self)"
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    if settings.app_env.lower() == "production":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

    logger.info(
        "request | request_id=%s | method=%s | path=%s | status=%s | duration_ms=%.2f",
        request_id, request.method, request.url.path,
        response.status_code, (time.perf_counter() - start) * 1000,
    )
    return response


@app.get("/health", tags=["System"])
def health():
    return {"status": "healthy", "service": "civiclens-ai-platform", "version": "2.1.0"}


@app.get("/ready", tags=["System"])
def ready():
    db_ok = False
    try:
        with SessionLocal() as db:
            db.execute(text("SELECT 1"))
            db_ok = True
    except Exception:
        logger.exception("Database readiness check failed")

    return {
        "status": "ready" if db_ok else "degraded",
        "database": "ok" if db_ok else "unavailable",
        "redis": "configured",
        "version": "2.1.0",
        "ai_enabled": settings.civiclens_ai_enabled,
    }


@app.get("/api/v1", tags=["System"])
def api_root():
    return {
        "name": "CivicLens AI Platform API",
        "version": "v1",
        "platform_version": "2.1.0",
        "ai_enabled": settings.civiclens_ai_enabled,
        "docs": "/docs",
    }


app.include_router(api_router)
