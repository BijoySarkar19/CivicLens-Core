# CLAUDE.md — Context & Instructions for Claude Code / Anthropic Assistants

This file provides project-level instructions, conventions, and fast commands for Claude Code and related Anthropic AI agents working in `CivicLens-Core`.

---

## 🎯 Project Mandate
CivicLens Core is an intelligent civic operations and predictive infrastructure asset management system developed for Tripura State Urban Development & Municipalities. It integrates interactive GIS mapping, AI risk forecasting, computer vision defect detection, and automated dispatch workflows into a single cohesive platform.

---

## ⚡ Essential Commands

### Development Servers
- **Backend (FastAPI)**:
  `$env:PYTHONPATH="backend"; & ".\.venv\Scripts\python.exe" -m uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload`
- **Frontend (Next.js)**:
  `cd frontend; npm run dev -- -p 3000`

### Testing & Verification
- **Run Backend Tests**:
  `$env:PYTHONPATH="backend"; & ".\.venv\Scripts\python.exe" -m pytest backend/tests`
- **Frontend Type Check**:
  `cd frontend; npx tsc --noEmit`
- **Frontend Production Build**:
  `cd frontend; npm run build`

---

## 🏛 Architecture & Design Principles

1. **GIGW 3.0 & UX4G Dual Mode**:
   - The platform supports dynamic switching between **Modern View** (dark cybersecurity theme) and **Government View** (`isGovt`, UX4G Indian Government standards).
   - In Government mode, ensure high-contrast styling: `#0f172a` text, white `#ffffff` or light slate `#f8fafc` containers, and clear borders `#cbd5e1`. Avoid faint text.

2. **Unified System (No Part 1 vs Part 2)**:
   - All modules (GIS, Computer Vision, Risk Prediction, Incident Redressal, Work Orders, Superadmin HR Management) exist together.
   - Do not divide features into artificial semesters or phases.

3. **Tripura Geographic Coverage**:
   - Covers all 8 districts of Tripura: West Tripura, Sepahijala, Khowai, Gomati, South Tripura, Dhalai, Unakoti, North Tripura.
   - 60+ curated assets spanning tourist landmarks (Ujjayanta Palace, Neermahal, Unakoti, Matabari), national highways, municipal wards, drainage networks, power stations (Palatana CCGT, Rokhia), police stations, and fire brigade bases.

4. **GIS Integration**:
   - Every asset card or table entry links directly to `/map?assetId=<id>`, which automatically flies to and highlights that coordinate on the Leaflet spatial map.

5. **HR & Access Management**:
   - The Superadmin `/admin` panel includes an Employee Dossier and a "Revoke Credentials & Fire Officer" action that simulates an automated official notice dispatch to the officer's registered government email address and registers an immutable entry in the audit trail.
