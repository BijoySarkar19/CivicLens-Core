# PLAN.md — CivicLens AI Implementation & Execution Plan

Strategic architectural roadmap, engineering milestones, and delivery scope for the CivicLens AI Smart Urban Governance Platform.

---

## 1. Project Objectives
1. Provide a unified decision-support and dispatch platform for urban infrastructure maintenance across Tripura's 8 administrative districts.
2. Bridge public grievances with automated predictive analytics (spatio-temporal failure risk, computer vision defect classification, NLP duplicate clustering).
3. Ensure institutional-grade compliance with UX4G and GIGW 3.0 accessibility guidelines.
4. Deliver high-reliability administrative oversight (tamper-evident PostGIS audit logging, employee dossier, and executive dismissal governance).

---

## 2. Milestone Architecture

### Phase 1: Core Foundation & Spatial Infrastructure (Complete)
- [x] Next.js 15 App Router architecture with Leaflet dynamic SSR boundaries.
- [x] FastAPI REST backend with PostGIS spatial database engine (EPSG:4326).
- [x] Comprehensive 96+ Tripura infrastructure asset dataset covering all 8 districts.
- [x] Interactive GIS Spatial Heatmap with deep zoom, asset focus bounds, and clustering.

### Phase 2: AI Decision Layer & Explainable Vision (Complete)
- [x] Predictive Infrastructure Risk Engine (90-day probabilistic degradation curve).
- [x] Explainable Computer Vision Damage Classifier (ResNet-50 + YOLOv8 architecture).
- [x] Custom photo upload and camera snapshot ingestion with dynamic laser scanning.
- [x] 4 realistic defect presets (Pothole, Shear Crack, Drainage Scour, Electrical Hazard).
- [x] 5-Stage "How to Understand this AI Decision" visual pipeline explainer.
- [x] Automated Work Order generator and verifiable cryptographic Inspection Certificate export.

### Phase 3: Administrative Governance & Incident Redressal (Complete)
- [x] Super Admin Command & Control center with 5-section operational dashboard.
- [x] Complete employee profile dossier (photo avatar, employee ID, clearance tier, station).
- [x] Executive dismissal workflow with verifiable cryptographic revocation tokens.
- [x] Immutable PostGIS-backed audit logging with actor, IP, timestamp, and SHA-256 hash.
- [x] UX4G / GIGW 3.0 high-contrast dual-mode toggle.

### Phase 4: Citizen Redressal & Deep Spatial Targeting (Complete)
- [x] Real-time grievance tracking via Reference Code (e.g. `INC-TRP-2842C270`) or phone.
- [x] Optional phone number handling without synthetic placeholder values.
- [x] Attached site photographic evidence preview with full-resolution inspection lightbox.
- [x] Direct deep-zoom coordinate navigation (`zoom=16`) from administrative dossiers to Tripura GIS map.
- [x] Accessible navigation Back buttons on `/map` and `/assets` returning to Command Center.
- [x] Centered severity pills and `★ TARGET` badges conforming to WCAG 2.1 AA.

---

## 3. Quality Gates & Acceptance Criteria
- Zero TypeScript compilation errors (`npx tsc --noEmit`).
- All Pytest unit and regression tests passing (`100%`).
- Clean Next.js static asset build without hydration or chunk errors.
- Responsive rendering on mobile, tablet, and widescreen desktop displays.
