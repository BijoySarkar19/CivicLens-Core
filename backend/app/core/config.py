from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"
    secret_key: str = "change-me-in-local-env"
    database_url: str = "postgresql+psycopg://civiclens:civiclens@db:5432/civiclens"
    redis_url: str = "redis://redis:6379/0"
    civiclens_ai_enabled: bool = False
    cors_origins: str = "http://localhost:3000"
    admin_email: str = "admin@example.com"
    admin_password: str = "change-this-password"
    access_token_expire_minutes: int = 480
    max_upload_size_mb: int = 10
    cookie_secure: bool = False
    app_name: str = "CivicLens Core"
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> list[str]:
        return [x.strip() for x in self.cors_origins.split(",") if x.strip()]

    @property
    def max_upload_size_bytes(self) -> int:
        return self.max_upload_size_mb * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
