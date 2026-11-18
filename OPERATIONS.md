# OPERATIONS.md — CivicLens AI Operational Runbook & Site Reliability

This document outlines site reliability standards, monitoring probes, and disaster recovery procedures for CivicLens AI.

---

## 1. Health & Readiness Probes

| Probe Endpoint | Target Port | Normal Response | Description |
| :--- | :---: | :--- | :--- |
| **Backend Health** | `:8000/health` | `{"status":"healthy","service":"civiclens-ai-platform","version":"2.1.0"}` | Checks API process vitality |
| **Backend Readiness** | `:8000/ready` | `{"status":"ready"}` | Verifies database pool and Redis socket connections |
| **Frontend Health** | `:3000/` | `HTTP 200 OK` | Verifies Next.js edge router rendering |

---

## 2. Structured Logging & Secret Redaction
- All log messages emitted by FastAPI and Uvicorn must be structured JSON.
- Passwords, bearer tokens, OTP codes, and JWT secret keys are strictly redacted via custom log filters.
- Sensitive citizen identifiers (personal phone numbers) are logged only as truncated hashes (e.g. `+91 ******4520`).

---

## 3. Disaster Recovery & Backups
- **PostGIS Snapshots**: Execute daily automated `pg_dump` backups saved to encrypted offsite object storage.
- **Evidence Storage**: MinIO object storage volumes mirrored with write-once-read-many (WORM) policies.
- **Recovery Time Objective (RTO)**: $\le 30\text{ minutes}$.
- **Recovery Point Objective (RPO)**: $\le 60\text{ minutes}$.
