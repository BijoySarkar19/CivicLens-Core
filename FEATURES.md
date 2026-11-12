# Features — Part 1

## Operational features

| Feature | Status |
|---|---|
| Authentication | Implemented |
| HttpOnly cookie authentication | Implemented |
| RBAC foundation | Implemented |
| Asset registry | Implemented |
| Asset provenance | Implemented |
| PostGIS point geometry | Implemented |
| GIS asset map | Implemented |
| Public incident intake | Implemented |
| Incident state machine | Implemented |
| Incident verification metadata | Implemented |
| Work orders | Implemented |
| Work-order state machine | Implemented |
| Field inspections | Implemented |
| Maintenance records | Implemented |
| Dataset source registry | Implemented |
| Domain events | Implemented |
| Audit trail | Implemented |
| Request correlation IDs | Implemented |
| Rate limiting | Implemented for login/public intake |
| Security headers | Implemented |
| Redis | Implemented |
| Celery foundation | Implemented |
| MinIO service | Available in Compose |
| Custom 404 | Implemented |
| Custom application error page | Implemented |
| Animated header/footer/landing UI | Implemented |
| CI | Implemented |
| Predictive AI | Part 2 |
| Computer vision | Part 2 |
| Forecasting | Part 2 |
| Optimization | Part 2 |
| MLOps | Part 2 |

## Design principle

A feature is not considered complete merely because a UI card exists. The intended completion path is:

```text
database → validation → service/workflow → API → authorization
→ UI → error handling → audit/event → test → documentation
```
