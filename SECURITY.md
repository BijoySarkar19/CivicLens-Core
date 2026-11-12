# Security — Part 1

## Authentication

- JWT access tokens
- HttpOnly cookie for browser sessions
- Bearer-token compatibility for API clients/Swagger
- configurable expiration
- inactive users are rejected

## Authorization

Roles are represented in the domain:

- `super_admin`
- `infrastructure_manager`
- `department_officer`
- `field_inspector`
- `data_administrator`
- `public_user`

Endpoint-level authorization should be tightened further as additional administrative screens are introduced.

## API protections

- Pydantic validation
- rate limiting on login
- rate limiting on public incident intake
- CORS allowlist
- request correlation IDs
- security response headers
- no password/token logging
- production-only HSTS

## Browser session

The frontend does not persist the JWT in `localStorage`. The browser uses an HttpOnly cookie.

## Secrets

`.env` is ignored by Git and is not part of the distributable source archive.

## Upload security

Part 1 defines a maximum upload-size setting and MinIO storage foundation. A production evidence-upload module must additionally enforce MIME validation, content inspection, object-key isolation and malware scanning before accepting untrusted files.

## Production checklist

Before public deployment:

- use HTTPS
- set `COOKIE_SECURE=true`
- replace development database credentials
- replace MinIO credentials
- generate a high-entropy `SECRET_KEY`
- restrict CORS to the real frontend origin
- place the API behind a reverse proxy
- enable database backups
- enable centralized logs/metrics
- review rate limits
- configure object-storage lifecycle and access policies
