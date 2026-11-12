# Part 2 — CivicLens AI

Part 2 is intentionally a future extension.

## Planned capabilities

- predictive risk modeling
- predictive maintenance
- computer vision
- anomaly detection
- semantic duplicate detection
- spatio-temporal forecasting
- resource and route optimization
- recommendation systems
- explainability
- model monitoring
- evaluation pipelines
- MLOps

## Architectural rule

Part 1 PostgreSQL/PostGIS remains the operational source of truth.

Part 2 should use:

```text
API v2
event streams
background jobs
feature pipelines
model registry
evaluation datasets
model monitoring
```

without coupling ML logic into basic CRUD handlers.

## Current status

No Part 2 model is enabled in this repository.

```text
CIVICLENS_AI_ENABLED=false
```
