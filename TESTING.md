# CivicLens AI Platform — Testing & Verification Guide

Comprehensive verification commands for backend test suites, frontend static type checking, Next.js production builds, and Docker container smoke tests.

## Backend Verification

```powershell
# Run backend pytest suite
$env:PYTHONPATH="backend"
& ".\.venv\Scripts\python.exe" -m pytest backend/tests

# Check ruff linting
& ".\.venv\Scripts\python.exe" -m ruff check backend
```

The CI pipeline also automatically runs pytest and ruff checks on every push.

## Frontend Type Check & Lint

```powershell
cd frontend
npx tsc --noEmit
npm run lint
```

## Frontend Production Build

```powershell
cd frontend
npm run build
```

## Docker Orchestration Test

```powershell
docker compose up -d --build
curl.exe http://localhost:8000/health
curl.exe http://localhost:3000/login
```

## Manual Acceptance Checklist

- Landing portal renders with civic operations metrics
- Header navigation and dual-mode high contrast toggle (Modern View / Government View)
- Citizen Grievance Portal (`/report`): photo evidence under 50MB, optional phone handling, GPS capture
- Citizen Grievance Tracking (`/login`): mobile OTP, reference code lookup, attached photo evidence display
- Admin Command & Control (`/admin`):
  - Citizen Grievances Desk with search & severity filters
  - Center-aligned severity & target badges
  - Quick Switch Personnel bar
  - Grievance Dossier Modal with photo evidence inspection & status transitions
  - Deep-zoom "View on Tripura Map" (Zoom 16 directly to coordinates)
  - Direct "Infrastructure Registry" asset focus link
- Predictive AI Suite (`/ai`): 90-day degradation curve, CV damage classifier head, what-if budget simulation
- Tripura GIS Spatial Heatmap (`/map`): Leaflet point markers, deep zoom, district filters
- State Infrastructure Registry (`/assets`): 96+ Tripura assets with category & district filters
