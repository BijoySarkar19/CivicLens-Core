<div align="center">

# 🏛️ CivicLens Core

### Professional Public Infrastructure Operations Platform
**Next-Generation Civic Intelligence & Public Operations Framework**

[![GIGW 3.0 Compliant](https://img.shields.io/badge/GIGW%203.0-Compliant-0a5c9e?style=for-the-badge&logo=gov.in&logoColor=white)](https://guidelines.india.gov.in/)
[![WCAG 2.1 Level AA](https://img.shields.io/badge/WCAG%202.1-Level%20AA-138808?style=for-the-badge&logo=w3c&logoColor=white)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Security Hardened](https://img.shields.io/badge/Security-CERT--In%20Hardened-ff9933?style=for-the-badge&logo=shield&logoColor=white)](https://www.cert-in.org.in/)
[![Docker Compose Ready](https://img.shields.io/badge/Docker-Compose%20v2-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Built with Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI Backend](https://img.shields.io/badge/FastAPI-1.0-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

---

```
  ____ _       _      _                      ____                 
 / ___(_)_   _(_) ___| |    ___ _ __  ___   / ___|___  _ __ ___   
| |   | \ \ / / |/ __| |   / _ \ '_ \/ __| | |   / _ \| '__/ _ \  
| |___| |\ V /| | (__| |__|  __/ | | \__ \ | |__| (_) | | |  __/  
 \____|_| \_/ |_|\___|_____\___|_| |_|___/  \____\___/|_|  \___|  
                                                                   
   »»» PUBLIC INFRASTRUCTURE OPERATIONS & GOVERNANCE SUITE «««
```

---

<p align="center">
  <a href="#-features">Key Features</a> •
  <a href="#-indian-government-mode-gigw-30">Government View (GIGW 3.0)</a> •
  <a href="#-admin--worker-control-center">Admin & Worker Portal</a> •
  <a href="#-security--anti-exploit-architecture">Security Architecture</a> •
  <a href="#-photo--gps-evidence-intake">50MB Evidence & GPS</a> •
  <a href="#-docker-deployment">Docker Deployment</a> •
  <a href="#-multi-device-responsive-design">Mobile / Tablet / TV</a>
</p>

</div>

---

## 🌟 Overview

**CivicLens Core** is an enterprise-grade full-stack operations platform designed for civic authorities, municipal corporations, public works departments, and citizens. 

It connects spatially-grounded infrastructure assets (via **PostgreSQL + PostGIS**), citizen grievance reports, field inspections, maintenance cycles, and immutable audit logs into a unified, transparent operational system.

> 🛡️ **Zero Hallucination AI Boundary:** CivicLens Core Part 1 deliberately uses measured, real transactional database records. Predictive models remain disabled (`CIVICLENS_AI_ENABLED=false`) until explicitly enabled in Part 2.

---

## 🚀 Key Features

| Capability | Technical Implementation | Highlights |
|---|---|---|
| **Dual View Architecture** | Modern High-Tech UI $\leftrightarrow$ GIGW 3.0 Indian Govt View | Instant one-click switch button in the top navigation bar with persistent preference. |
| **Admin & Worker Portal** | `/admin` RBAC-protected Command Center | Live worker list, role-based badges, system connectivity diagnostics, department records. |
| **50MB Photo Upload** | Client + Server binary validation | Direct camera capture on mobile/tablets, client-side strict `< 50MB` check, magic-byte verification. |
| **GPS Geolocation** | HTML5 Geolocation + PostGIS Point | Automatic latitude/longitude detection, accuracy radius, and manual landmark input. |
| **Interactive GIS Map** | Leaflet + OpenStreetMap + PostGIS | Live spatial infrastructure map with cluster markers and asset details. |
| **Auditable Workflows** | Controlled state machine transitions | `Report` $\to$ `Verify` $\to$ `Work Order` $\to$ `Close` with correlation IDs. |
| **Custom 404 & Errors** | Interactive fallback pages | Floating animations, quick navigation shortcuts, bilingual English/Hindi notices. |

---

## 🇮🇳 Indian Government Mode (GIGW 3.0 & WCAG 2.1 AA)

CivicLens Core features a dedicated **Government Mode** compliant with the **Guidelines for Indian Government Websites (GIGW 3.0)**, **ISO 23026**, and the **Rights of Persons with Disabilities (RPwD) Act, 2016**:

- **Official Tricolour Emblem Stripe**: Saffron, White, and Green header branding.
- **National Typography**: High-legibility Noto Sans / Devanagari font system.
- **Contrast & Visibility**: Minimum $4.5:1$ contrast ratio across all elements.
- **Accessibility Tools**: Integrated `A+` (enlarge), `A` (standard), `A-` (compact) font scaling.
- **Screen Reader Support**: Semantic landmarks (`<header>`, `<main id="main-content">`, `<nav>`, `<footer>`), `<a href="#main-content" class="skip-link">`, explicit form `htmlFor`, and `aria-live` status regions.
- **Print Optimization**: Dedicated `@media print` style sheets with automated URL expansion.

---

## 👷 Admin & Worker Control Center (`/admin`)

The Administrative and Field Operations dashboard provides real-time governance:

1. **KPI Overview**: Live operational metrics for active assets, critical incidents, open work orders, and maintenance schedules.
2. **Worker & User Directory**:
   - Super Admin (`super_admin`)
   - Infrastructure Manager (`infrastructure_manager`)
   - Department Officer (`department_officer`)
   - Field Inspector (`field_inspector`)
   - Data Administrator (`data_administrator`)
   - Public Citizen (`public_user`)
3. **Departments Registry**: Urban development departments, water boards, electrical utilities, and transit authorities.
4. **Immutable Audit Trail**: Chronological event logs detailing actor email, action performed, entity targets, and request tracing IDs.
5. **System Diagnostics**: Live FastAPI health, PostgreSQL/PostGIS connection, Redis latency, and rate limiter status.

---

## 🔒 Security & Anti-Exploit Architecture

Hardened against injection, unauthorized access, and malicious payloads:

- **HttpOnly & SameSite Cookies**: Authentication JWT tokens are never exposed to browser `localStorage` or `sessionStorage` (mitigates XSS token theft).
- **Strict Content Security & Headers**:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` (clickjacking defense)
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(self), microphone=(), geolocation=(self)`
  - `Cross-Origin-Opener-Policy: same-origin`
- **Upload Safety & Sanitization**:
  - File size strictly capped under **50MB**.
  - Binary magic-byte header validation (prevents renaming `.exe` or `.sh` to `.jpg`).
  - Path traversal defense (`os.path.basename` + regex sanitization).
  - SVG upload rejection (eliminates embedded SVG JavaScript XSS vectors).
- **Rate Limiting**: Distributed rate limits enforced via `slowapi` on public and authentication endpoints.

---

## 📷 Photo & GPS Evidence Intake (`/report`)

Citizens and field inspectors can document public grievances:

```
[ Citizen Report ] ──► [ Camera Capture / File Select (< 50MB) ]
        │
        ├──► [ GPS Geolocation Pinning (Lat / Lng) ]
        │
        ├──► [ Anti-Tamper & Magic Byte Verification ]
        │
        └──► [ Ingest into PostGIS Spatial Database & Audit Trail ]
```

- **Camera Trigger**: Tap to instantly activate the camera on smartphones and tablets.
- **Drag-and-Drop**: Upload high-resolution site evidence on desktop workstations.
- **Instant Geolocation**: Click `Detect My Location` to capture coordinates with accuracy radius.

---

## 📱 Multi-Device Responsive Design

CivicLens Core is engineered for flawless rendering across all screen categories:

- **Mobile Phones (320px – 640px)**: Compact layouts, collapsible navigation drawer, minimum 48px touch targets, camera-ready file inputs.
- **Tablets & Foldables (641px – 1024px)**: Dual-column grid views, optimized touch scrolling, and tablet landscape support.
- **Desktops & Laptops (1025px – 1919px)**: Full GIS map visualization, multi-tab administrative panels, and data tables with horizontal scroll guards.
- **TVs & Ultra-Wide 4K Displays (≥ 1920px)**: 10-foot UI styling, larger base font sizes, high-contrast outlines for remote control / keyboard navigation.

---

## 🐳 Docker Deployment

Run the complete platform stack (PostgreSQL + PostGIS, Redis, MinIO, FastAPI Backend, Celery Worker, Next.js Frontend) with a single command:

### 1. Clone the Repository

```bash
git clone https://github.com/BijoySarkar19/CivicLens-Core.git
cd CivicLens-Core
```

### 2. Configure Environment

```bash
cp .env.example .env
```

### 3. Build and Start Services

```bash
docker compose up --build
```

### 4. Verify Endpoints

| Service | Address | Credentials / Info |
|---|---|---|
| **Next.js Web Portal** | `http://localhost:3000` | Modern UI + GIGW Indian Govt View |
| **Admin & Worker Desk** | `http://localhost:3000/admin` | Login required |
| **FastAPI Swagger Docs**| `http://localhost:8000/docs` | OpenAPI 3.1 specifications |
| **MinIO Console** | `http://localhost:9001` | MinIO object storage dashboard |

---

## 🧪 Testing & Verification

Run the comprehensive test suites:

```powershell
# Frontend Type Checking & Linting
cd frontend
npm run lint

# Frontend Production Build
npm run build

# Backend Test Suite
$env:PYTHONPATH = "backend"
pytest backend/tests
```

---

## 📄 License & Credits

- **Repository**: [https://github.com/BijoySarkar19/CivicLens-Core.git](https://github.com/BijoySarkar19/CivicLens-Core.git)
- **Design Guidelines**: [UX4G Design System 3.0](https://ux4g.gov.in/) & [GIGW 3.0](https://guidelines.india.gov.in/)
- **Map Data**: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors

<div align="center">
  <sub>Built with transparency for public infrastructure operations.</sub>
</div>
