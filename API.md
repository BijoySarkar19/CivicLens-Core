# API — Part 1

Base path:

```text
/api/v1
```

## Authentication

```text
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

Browser login uses an HttpOnly cookie. API clients can use the returned bearer token.

## Assets

```text
GET  /api/v1/assets/
POST /api/v1/assets/
GET  /api/v1/assets/{id}
```

## Incidents

```text
GET   /api/v1/incidents/
POST  /api/v1/incidents/
POST  /api/v1/incidents/public
GET   /api/v1/incidents/{id}
PATCH /api/v1/incidents/{id}/status
```

## Work orders

```text
GET   /api/v1/work-orders/
POST  /api/v1/work-orders/
PATCH /api/v1/work-orders/{id}/status
```

## Inspections

```text
GET  /api/v1/inspections/
POST /api/v1/inspections/
```

## Maintenance

```text
GET  /api/v1/maintenance/
POST /api/v1/maintenance/
```

## Departments

```text
GET  /api/v1/departments/
POST /api/v1/departments/
```

## Provenance

```text
GET  /api/v1/datasets/sources
POST /api/v1/datasets/sources
```

## Analytics

```text
GET /api/v1/analytics/summary
```

Analytics are deterministic database aggregates. No AI score is returned.

## Audit

```text
GET /api/v1/audit/
```

## Documentation

Swagger:

```text
http://localhost:8000/docs
```
