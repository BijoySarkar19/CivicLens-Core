# CivicLens AI Data Pipeline & Provenance Registry

CivicLens AI maintains an auditable data pipeline and provenance registry designed for public infrastructure assets and field grievance streams across Tripura's 8 administrative districts.

## Data Provenance & Ingestion Schema

Every ingested dataset source records:
- Source organization and directorate (e.g., PWD, DWS, TSECL, AMC)
- Publisher and official catalog citation
- Source URL / endpoint and cryptographic checksum
- Data licensing terms (e.g., Open Government Data License - India)
- Import timestamp and total record tally
- Verification and processing status

All infrastructure assets retain a foreign key reference to their provenance origin (`dataset_id`) and upstream record identifier (`source_record_id`).

## Multi-Stage Ingestion Pipeline

```text
Source Selection & Authentication
  → Raw Data Upload / Endpoint Polling
  → Ingestion Preview & Quota Check
  → Schema Detection & Geocoding Verification
  → Coordinate Reference System Normalization (EPSG:4326)
  → Deduplication & Topological Conflict Detection
  → Data Transformation & Attribute Normalization
  → Atomic PostGIS Spatial Insertion
  → Execution Summary Report
  → Immutable SHA-256 Audit Ledger Inscription
```
