# AGENTS.md — CivicLens AI Multi-Agent Development Guide

This document provides system context, architectural constraints, command specifications, and behavioral rules for automated AI coding agents (GitHub Copilot Workspace, Claude Code, Gemini CLI, Cursor, Windsurf, DevIn).

---

## 1. System Overview

**CivicLens AI** is an enterprise-grade Smart Urban Governance & Public Infrastructure Intelligence Platform designed for municipal corporations and state public works departments, calibrated specifically for the state of Tripura (8 districts: West Tripura, Sepahijala, Khowai, Gomati, South Tripura, Dhalai, Unakoti, North Tripura).

### Tech Stack
- **Frontend**: Next.js 15.5 (App Router), React 19, TypeScript 5, Tailwind CSS 3.4, Framer Motion, Leaflet + React-Leaflet (dynamic SSR-safe imports), Lucide React.
- **Backend**: FastAPI 0.115, Python 3.12, SQLAlchemy 2.0, Pydantic 2, GeoAlchemy2, SlowAPI rate limiting, Uvicorn.
- **Database & Cache**: PostgreSQL 16 + PostGIS 3.4 (spatial geometry, EPSG:4326), Redis 7 (broker & caching).
- **Computer Vision & ML**: ResNet-50 deep feature extractor + YOLOv8 anchor-free object detection head, photogrammetric depth/surface area mensuration.
- **Compliance & UI Standards**: UX4G Design System, GIGW 3.0 (Government of India Guidelines for Indian Websites), WCAG 2.1 AA accessible high-contrast toggle (`/lib/govt-mode.tsx`).

---

## 2. Workspace Invariants & Strict Rules

1. **Unified Platform Philosophy**:
   - There is NO division between "Part 1" and "Part 2" in the user interface or backend routing. The entire platform is a unified, single-pane civic operations command center.
   - Never render artificial barriers, "Part 2 Disabled" gates, or separated buttons.

2. **Leaflet & Window SSR Boundaries**:
   - Leaflet and map components (`react-leaflet`, `L.divIcon`, `window`, `navigator`) MUST only run client-side.
   - Always load map components dynamically using `dynamic(() => import(...), { ssr: false })`.
   - Never instantiate Leaflet objects inside React Server Components.

3. **Next.js App Router Static Generation (`useSearchParams`)**:
   - Any client component consuming `useSearchParams()` MUST be wrapped inside a `<Suspense fallback={...}>` boundary to prevent de-opting the entire route from static rendering or crashing Next.js builds.

4. **Dynamic Timestamps & Year**:
   - Never hardcode the copyright year in UI footers or reports. Always use dynamic expressions: `new Date().getFullYear()`.

5. **Dual-Mode High Contrast (UX4G / GIGW 3.0)**:
   - Always test components in both **Modern View** (dark cyberpunk aesthetic, cyan/indigo glows) and **Government View** (`isGovt`, UX4G blue `#004085`, slate-900 high contrast text `#0f172a`, crisp white card backgrounds, accessible borders `#cbd5e1`).

6. **Defensive API Fallbacks**:
   - When communicating with backend endpoints, always implement structured try/catch blocks that fall back to rich Tripura seed datasets (`TRIPURA_SEED_ASSETS`, `DEMO_INCIDENTS`, `DEMO_WORK_ORDERS`, `DEMO_ADMIN_USERS`).
   - Never surface raw red unhandled "Failed to fetch" error banners to the user.

---

## 3. Standard Verification Commands

### Backend
```powershell
# Run pytest test suite
$env:PYTHONPATH="backend"
& ".\.venv\Scripts\python.exe" -m pytest backend/tests

# Start FastAPI development server
& ".\.venv\Scripts\python.exe" -m uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload
```

### Frontend
```powershell
# Type check without emitting files
cd frontend
npx tsc --noEmit

# Next.js development server
npm run dev -- -p 3000

# Production build test
npm run build
```

---

## 4. Key Directory Structure
```
CivicLens-Core/
├── backend/
│   ├── app/
│   │   ├── api/v1/         # FastAPI endpoints (assets, incidents, work orders, audit)
│   │   ├── core/           # Configuration, security tokens, logging
│   │   ├── db/             # SQLAlchemy engine & PostGIS sessions
│   │   ├── models/         # Database models (User, Asset, Incident, WorkOrder, Audit)
│   │   ├── services/       # Business logic & state transition graphs
│   │   └── main.py         # App factory & security middleware
│   └── tests/              # Pytest verification suites
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Unified landing portal (Citizens & Officers)
│   │   ├── admin/          # Admin Command & Control + Employee Dossier & Dismissal
│   │   ├── ai/             # Predictive Risk, Computer Vision, NLP & What-If
│   │   ├── assets/         # 60+ Tripura Infrastructure Assets (GIS linked)
│   │   ├── dashboard/      # Executive Operations Dashboard
│   │   ├── map/            # Interactive Leaflet GIS Spatial Heatmap
│   │   ├── incidents/      # Public & field grievance reports
│   │   └── work-orders/    # Municipal execution work tickets
│   ├── components/         # Reusable UI widgets & Leaflet map clients
│   └── lib/                # TypeScript types, seed records, API wrappers
└── docker-compose.yml      # Orchestrated multi-container deployment
```
