# Database — Part 1

## Source of truth

PostgreSQL/PostGIS is the transactional source of truth.

## Core tables

- `users`
- `departments`
- `assets`
- `incidents`
- `work_orders`
- `inspections`
- `maintenance_records`
- `dataset_sources`
- `domain_events`
- `audit_logs`

## Migration policy

Never edit an already-applied migration in a shared environment.

Current sequence:

```text
0001_initial
    ↓
0002_part1_professional_foundation
```

Future changes should use new Alembic revisions.

## Provenance

Asset records can retain:

- dataset source ID
- source record ID
- source name
- import timestamp

Dataset sources retain:

- source name
- publisher
- dataset name
- source URL
- license
- import time
- record count
- processing status

## Part 2 readiness

Historical condition, incident, inspection and maintenance records are retained so future feature pipelines can derive historical features without turning PostgreSQL into a model-training artifact store.
