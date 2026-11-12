<div align="center">

# 🏛️ CivicLens AI
### Smart Urban Infrastructure Operations & Predictive Intelligence Platform
**Unified Municipal Asset Management · Computer Vision Defect Mensuration · 90-Day Failure Forecasting · Spatio-Temporal GIS**

[![Platform Type](https://img.shields.io/badge/Platform-Academic%20%26%20Civic%20Demo-0284c7?style=for-the-badge&logo=codeforces&logoColor=white)](/)
[![Tripura Geospatial Coverage](https://img.shields.io/badge/Tripura-8%20Districts%20Active-0a5c9e?style=for-the-badge&logo=leaflet&logoColor=white)](/map)
[![AI Decision Engine](https://img.shields.io/badge/AI%20Engine-v2.1%20Online-059669?style=for-the-badge&logo=pytorch&logoColor=white)](/ai)
[![GIGW 3.0 & UX4G](https://img.shields.io/badge/Design-UX4G%20%2F%20GIGW%203.0-004085?style=for-the-badge&logo=accessibility&logoColor=white)](https://guidelines.india.gov.in/)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-15803d?style=for-the-badge&logo=w3c&logoColor=white)](https://www.w3.org/WAI/)
[![Docker Compose Ready](https://img.shields.io/badge/Docker-Compose%20v2-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Built with Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI Backend](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

---

```
   ____ _       _      _                      _    ___ 
  / ___(_)_   _(_) ___| |    ___ _ __  ___   / \  |_ _|
 | |   | \ \ / / |/ __| |   / _ \ '_ \/ __| / _ \  | | 
 | |___| |\ V /| | (__| |__|  __/ | | \__ \/ ___ \ | | 
  \____|_| \_/ |_|\___|_____\___|_| |_|___/_/   \_\___|
                                                       
 »» URBAN INFRASTRUCTURE INTELLIGENCE & DECISION PLATFORM ««
```

> [!NOTE]
> **Demonstration Platform**: CivicLens AI is an advanced civic operations and spatial infrastructure research platform calibrated for the State of Tripura. It showcases smart urban decision layers, predictive failure curves, computer vision defect quantification, and municipal dispatch workflows.

---

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-complete-unified-architecture">Unified Architecture</a> •
  <a href="#-project-directory-structure">Folder Structure</a> •
  <a href="#-ai-predictive-decision-layer">AI Decision Engine</a> •
  <a href="#-tripura-infrastructure-95-comprehensive-assets">Tripura Assets &amp; Panchayats</a> •
  <a href="#-human-resources--employee-dossier">HR &amp; Personnel Dossier</a> •
  <a href="#-docker--quickstart">Docker &amp; Endpoints</a> •
  <a href="#-security--standards-compliance">Security &amp; Standards</a>
</p>

</div>

---

## 🌟 Overview

**CivicLens AI** bridges public grievance reporting with predictive spatial intelligence. Instead of keeping citizen reporting and field operations in silos, CivicLens unifies the entire municipal lifecycle into a single high-performance pane:

```mermaid
flowchart LR
    A["Citizen & Field Sensors\n(GPS + Photos)"] --> B["Ingestion & Validation\n(Zero-Trust Magic Bytes)"]
    B --> C["Intelligent Decision Layer\n(Computer Vision + XAI)"]
    C --> D["Automated Work Order\n(SLA + Cost Estimation)"]
    D --> E["Municipal Contractor Dispatch\n(Tripura Squads A-E)"]
    E --> F["Tamper-Evident Audit Ledger\n(PostGIS SHA-256)"]
```

### Core Innovations:
1. **95+ Tripura Infrastructure Assets**: Spans all 8 districts (*West Tripura, Sepahijala, Khowai, Gomati, South Tripura, Dhalai, Unakoti, North Tripura*), including **Railway Stations & Junctions** (AGTL, Sabroom, Udaipur, Dharmanagar), **Inter-state Rail Corridors**, **Mountain Tunnels** (Longtharai, Atharamura, Baramura), **Major Bridges** (Maitri Setu, Howrah 4-Lane, Manu, Gumti), **Principal Rivers** (Gumti, Howrah, Manu, Khowai, Feni), tourist destinations, expressways, municipal wards, **8 rural Gram Panchayats**, drainage sluices, lakes, power plants, police stations, and fire brigade stations.
2. **Interactive Computer Vision Defect Classifier**:
   - Field camera snap / custom image upload with dynamic laser scan animation.
   - 4 high-definition realistic vector defect presets (Pothole, Structural Crack, Drainage Scour, Electrical Hazard).
   - **5-Stage Explainable AI Pipeline**: RGB Ingestion $\rightarrow$ ResNet-50 Features $\rightarrow$ YOLOv8 Localization $\rightarrow$ Photogrammetric Mensuration $\rightarrow$ Condition Score Penalty & Automated Work Order.
   - Cryptographically signed AI Inspection Certificate export with verifiable SHA-256 hash.
3. **90-Day Predictive Failure Curve**: Multi-variate degradation forecasting weighing age, monsoon rainfall saturation, freight volume, and inspection history.
4. **Duplicate Grievance Clustering**: Automatically aggregates multiple citizen complaints for the same physical issue within $50\text{ m}$ into a single unified master work order.
5. **Superadmin Personnel Dossier & Access Management**: Complete officer profiles with authentic Indian portraits, employee codes, designation, contact numbers, gender, marital status, and a "Revoke Credentials & Dismiss" action with simulated automated NIC email notice dispatch.
6. **Dual-View UI Engine**: Instant one-click toggle between **Cyber-Modern View** and **Indian Government (UX4G / GIGW 3.0) View** with WCAG 2.1 AA accessible contrast.

---

## 🏗️ Complete Unified Architecture

```
                                CIVICLENS UNIFIED PLATFORM
                                            │
        ┌───────────────────────────────────┼───────────────────────────────────┐
        │                                   │                                   │
   Public Portal                     Officer Command                      Admin Center
 (Citizen Grievance & OTP)         (Dispatch & Operations)            (Audit, Users & System)
        │                                   │                                   │
        └───────────────────────────────────┼───────────────────────────────────┘
                                            │
                            Next.js 15 Web Application
                         (Responsive Mobile / Tablet / TV)
                                            │
                                FastAPI API Gateway
                            (Port 8000 / Reverse Proxy)
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         │                                  │                                  │
   Asset Service                     Incident Service                  Work Order Service
 (95+ Tripura Assets)              (GPS & 50MB Evidence)             (SLA & Dispatching)
         │                                  │                                  │
         ├──────────────────────────────────┼──────────────────────────────────┤
         │                                  │                                  │
   Inspection Service                Audit Trail Ledger                GIS Spatial Engine
 (Condition Impact Scores)         (SHA-256 Tamper-Evident)          (PostGIS EPSG:4326)
         │                                  │                                  │
         └──────────────────────────────────┼──────────────────────────────────┘
                                            │
                            INTELLIGENT DECISION LAYER
                                            │
        ┌───────────────────────────────────┼───────────────────────────────────┐
        │                                   │                                   │
  Risk & Failure Prediction          Computer Vision                 Duplicate Clustering
 (90-Day Degradation Curve)        (ResNet-50 + YOLOv8)            (Semantic Proximity Embeddings)
        │                                   │                                   │
        ├───────────────────────────────────┼───────────────────────────────────┤
        │                                   │                                   │
  What-If Strategic Simulator        Route Optimizer                Natural Language Assistant
 (Deferred Budget Penalties)       (5 Tripura Field Squads)        (Plain-Text Query Answering)
                                            │
                               MLOps Pipeline & Monitoring
                        (v2.1 Telemetry · F1: 0.901 · Drift: 0.028)
```

---

## 🧠 AI Predictive Decision Layer

```mermaid
sequenceDiagram
    autonumber
    actor Citizen as Citizen / Field Inspector
    participant Web as CivicLens Web (Next.js)
    participant AI as ResNet-50 + YOLOv8 Head
    participant Engine as Priority & Scoring Engine
    participant PWD as Municipal Execution Squad

    Citizen->>Web: Uploads 1080p RGB Field Photo
    Web->>AI: Normalizes tensor & runs feature pyramid
    AI-->>Web: Returns Defect Class (94.2%), Depth (12.5 cm), Area (0.85 m²)
    Web->>Engine: Computes condition score impact (42/100 Poor)
    Engine->>PWD: Auto-generates P1 Work Order (WO-TR-2026-XXXX)
    PWD-->>Citizen: Dispatches repair crew with 48h SLA window
```

### 1. 90-Day Predictive Failure Forecasting
Instead of waiting for an asset to physically fail, CivicLens predicts degradation beforehand:
$$\text{Risk Score} = w_1 \cdot \text{Age} + w_2 \cdot \text{Monsoon Saturation} + w_3 \cdot \text{Incident Frequency} + w_4 \cdot \text{Freight Load}$$

### 2. Explainable Computer Vision (XAI)
- **Input**: User photo upload or live field camera snapshot.
- **Backbone**: ResNet-50 deep convolutional network extracting multi-scale edge and texture feature maps.
- **Head**: YOLOv8 anchor-free regression predicting defect coordinates `[x, y, w, h]`.
- **Metrics**: Calibrated pixel-to-metric scaling computes real-world depth (cm) and surface area ($m^2$).
- **Direct Dispatch**: One-click generation of assigned work orders with budget estimates and SLA deadlines.

---

## 🏛️ Tripura Infrastructure (95+ Comprehensive Assets)

CivicLens includes built-in geospatial data covering all 8 districts of Tripura:

| Category | Representative Assets | Count | Key Features |
| :--- | :--- | :---: | :--- |
| **Tourist & Heritage** | Ujjayanta Palace, Neermahal, Unakoti, Matabari, Pilak, Jampui Hills | 10 | Heritage stormwater drainage, visitor access pathways, lighting |
| **Railway Stations** | **Agartala Jn (AGTL), Dharmanagar (DMR), Udaipur (UDPU), Sabroom (SBRM), Kumarghat, Ambassa, Belonia, Teliamura** | 8 | Broad-gauge platforms, Rajdhani/Tejas rakes, signaling depots |
| **Rail Routes & Corridors** | **Agartala-Sabroom Trunk (110 km), Lumding-Badarpur Lifeline, Agartala-Akhaura International Link** | 3 | Electrified broad/dual gauge, inter-state & international trade lines |
| **Railway Tunnels** | **Longtharai Tunnel (1,962 m - Longest in State), Atharamura Tunnel, Baramura Tunnel** | 3 | Deep rock mountain bores, seismic telemetry, ventilation pumps |
| **Major Bridges** | **Maitri Setu (1.9 km Feni River), Howrah River Battala 4-Lane, Manu River NH-8, Gumti River, Khowai River** | 5 | Pre-stressed concrete spans, international links, pier scour aprons |
| **Principal Rivers** | **Gumti (Gomati), Howrah (Saidra), Manu (167 km), Khowai, Feni, Dhalai, Juri, Muhuri** | 8 | Hydrological basin telemetry, flood sluice networks, river embankments |
| **Named Expressways** | MBB Airport Expressway, VIP Road, Melaghar Highway, Baramura Pass | 10 | Bitumen pavement telemetry, culverts, bridge approaches |
| **Municipal Wards** | AMC Ward 1, 2, 7, 12, 18, 25, 31, Ward 50 (Khayerpur Extension) | 11 | Urban jurisdiction boundaries, ward sanitation, DWS pipelines |
| **Gram Panchayats** | **Lembucherra, Matabari, Madhupur, Bagbassa, Rajnagar, Halahali, Padmabil, Fatikroy** | 8 | Rural civic centers, village piped water, cyclone shelters |
| **Drainage Canals** | Howrah Outfall Canal, Battala High-Capacity Pumps, Akhaura Canal | 5 | Sluice gates, stormwater runoff telemetry, flood basins |
| **Lakes & Waterways** | Rudrasagar Lake, Jagannath Dighi, Amar Sagar, Kalyan Sagar | 5 | Embankment stability, tourist piers, water level monitoring |
| **Smart Traffic Signals** | Battala ITMS, Post Office Chowmuhani, Motor Stand Tri-Junction | 6 | Automated signal timings, green-preemption for emergency tenders |
| **Power Stations** | Palatana 726MW CCGT, Rokhia Gas Thermal, Baramura Turbine Station | 5 | High-voltage transmission substations, perimeter monitoring |
| **Police Stations** | West Agartala PS, East Agartala PS, Radhakishorepur PS Udaipur | 5 | Jurisdictional law enforcement and emergency dispatch posts |
| **Fire Stations** | Agartala Central Fire Station Battala, Udaipur Fire Station | 4 | Hydraulic foam tenders, crash response, chemical rescue gear |

---

## 👥 Human Resources & Personnel Dossier

The `/admin` command center provides enterprise personnel oversight:

- **Official Identity Cards**: Displays officer photo, designation, government employee ID (e.g. `TR-PWD-2023-042`), station posting, and security clearance.
- **Demographics**: Tracks officer **Gender** (*Male / Female*) and **Marital Status** (*Married, Single, Widow, Divorced*).
- **Communication Channels**: Official registered government email and mobile contact numbers displayed with high-contrast accessibility.
- **Revoke & Dismiss (Fire) Workflow**:
  - Requires executive confirmation.
  - Updates personnel status to `Relieved / Revoked`.
  - Dispatches a simulated official termination transmission notice to the officer's registered email with a cryptographic revocation token (`TR-REV-NIC-XXXXXXX`).
  - Stamped into the tamper-evident PostGIS audit log with immutable timestamps.

---

## 🚀 Docker & Quickstart

### Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose v2+
- Node.js 18+ & Python 3.12 (for standalone local development)

### One-Command Deployment (Docker Compose)
```bash
# 1. Clone the repository
git clone https://github.com/BijoySarkar19/CivicLens-Core.git
cd CivicLens-Core

# 2. Start all services (PostGIS, Redis, FastAPI Backend, Next.js Web)
docker compose up -d

# 3. Check running services
docker compose ps
```

### Service Endpoints & Network Access

> [!IMPORTANT]
> **Web Browser vs. Database/Cache Protocols**:
> - Only **Port 3000** (Web Portal) and **Port 8000** (FastAPI / Swagger) are HTTP web servers accessible directly via your web browser.
> - **Port 5432** (PostgreSQL/PostGIS) and **Port 6379** (Redis) are raw TCP database/cache network sockets. Opening `http://localhost:5432` or `http://localhost:6379` in a web browser will intentionally return a connection reset or empty response because they communicate using binary database protocols (`psql`/`redis-cli`), not HTTP.

#### 🌐 Web Browser Interfaces (Open in Web Browser)
| Application Interface | Browser URL | Port | Health Status / Description |
| :--- | :--- | :---: | :--- |
| **CivicLens Web Portal** | [`http://localhost:3000`](http://localhost:3000) | `3000` | Ready (`200 OK`) · Citizen, Officer &amp; Admin UI |
| **Interactive API Docs (Swagger)** | [`http://localhost:8000/docs`](http://localhost:8000/docs) | `8000` | Interactive OpenAPI schema &amp; endpoint testing |
| **Alternative API Docs (ReDoc)** | [`http://localhost:8000/redoc`](http://localhost:8000/redoc) | `8000` | Formatted technical API documentation |
| **MinIO S3 Storage Console** | [`http://localhost:9001`](http://localhost:9001) | `9001` | Web storage manager (`civiclens` / `Admin123!`) |
| **Backend Health Probe** | [`http://localhost:8000/health`](http://localhost:8000/health) | `8000` | Operational status: `{"status": "ok"}` |

#### 🗄️ Backend Data Services (Internal TCP Sockets — Not Web Pages)
| Service | Protocol &amp; Socket | Port | Access Tool / Connection String |
| :--- | :--- | :---: | :--- |
| **PostgreSQL 16 + PostGIS 3.4** | TCP / PostgreSQL Wire | `5432` | `postgresql://civiclens:Admin123!@localhost:5432/civiclens` (DBeaver, TablePlus, `psql`) |
| **Redis 7 In-Memory Cache** | TCP / Redis RESP | `6379` | `redis://localhost:6379/0` (`redis-cli -h localhost -p 6379`) |
| **MinIO S3 Storage API** | TCP / S3 REST | `9000` | `http://localhost:9000` (Boto3 / AWS S3 SDK endpoint) |

---

## 📂 Project Directory Structure

```
CivicLens-Core/
├── .github/                      # CI/CD automation & release workflows
├── backend/                      # High-performance FastAPI 0.115 backend application
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py           # Dependency injection (PostGIS sessions, OAuth2 auth)
│   │   │   └── v1/               # Versioned REST endpoints
│   │   │       ├── admin.py          # Admin controls & user dossier management
│   │   │       ├── analytics.py      # Operations dashboard KPIs & failure curves
│   │   │       ├── assets.py         # 95+ spatial assets (Wards, Panchayats, Railways, Tunnels, Bridges, Rivers)
│   │   │       ├── audit.py          # PostGIS SHA-256 cryptographic audit trail
│   │   │       ├── auth.py           # JWT token generation & cookie management
│   │   │       ├── departments.py    # Municipal department registry (AMC, PWD, DWS, TSECL)
│   │   │       ├── incidents.py      # Grievance ingestion, 50MB uploads & GPS verification
│   │   │       ├── inspections.py    # Field quality inspections & condition scoring
│   │   │       └── work_orders.py    # Contractor squad assignment & SLA status
│   │   ├── core/                 # Configuration, security tokens, rate limiting, logging
│   │   ├── db/                   # SQLAlchemy 2.0 engine & PostGIS connection pool
│   │   ├── models/               # Database ORM models (Spatial geometry tables)
│   │   ├── schemas/              # Pydantic v2 validation contracts
│   │   ├── services/             # Incident state machines & triage workflows
│   │   └── main.py               # FastAPI application factory & CORS middleware
│   ├── tests/                    # Pytest verification suite (Health, Auth, Workflows)
│   ├── Dockerfile                # Multi-stage Python 3.12 container
│   └── requirements.txt          # Python dependencies
├── frontend/                     # Next.js 15.5 App Router web client
│   ├── app/
│   │   ├── admin/                # Admin Command & Control + Employee Dossier & Dismissal
│   │   ├── ai/                   # Predictive Risk, Computer Vision, NLP & What-If Simulator
│   │   ├── assets/               # 70+ Tripura Infrastructure Assets (Wards 50, Panchayats)
│   │   ├── dashboard/            # Executive Operations Dashboard (KPIs & Risk Map)
│   │   ├── incidents/            # Public & field grievance desk
│   │   ├── inspections/          # Field quality audits & structural condition scoring
│   │   ├── login/                # Dual citizen OTP tracker & 1-click officer command login
│   │   ├── map/                  # Interactive Leaflet GIS spatial heatmap
│   │   ├── report/               # Public grievance submission (50MB photo + GPS capture)
│   │   ├── work-orders/          # Municipal execution work tickets & contractor squads
│   │   ├── layout.tsx            # Root application layout & typography
│   │   ├── page.tsx              # Unified landing portal (Dual Modern / Govt View)
│   │   └── globals.css           # Tailwind styling & UX4G / GIGW 3.0 accessibility tokens
│   ├── components/               # Reusable UI widgets, header, footer, policy reader modals
│   ├── lib/                      # TypeScript definitions, Tripura seed datasets, API client
│   ├── middleware.ts             # Next.js edge route protection & deep-linking intent handler
│   ├── Dockerfile                # Multi-stage Node.js 22 container
│   └── package.json              # Web client dependencies & build scripts
├── docker-compose.yml            # Multi-container orchestration (Web, Backend, PostGIS, Redis)
├── README.md                     # Comprehensive platform manual & architectural guide
├── AGENTS.md                     # Persistent AI agent runbook & constraints
├── CLAUDE.md                     # Anthropic Claude Code operational context
├── DESIGN.md                     # Machine-readable UX4G/GIGW 3.0 design system specifications
├── ARCHITECTURE.md               # System diagrams & microservice hierarchies
├── PLAN.md                       # Immediate roadmap & engineering objectives
├── BACKLOG.md                    # Prioritized feature pipeline & non-goals
├── CONTRIBUTING.md                # Standard operating guidelines for code contributions
├── CHANGELOG.md                  # Chronological record of updates & releases
├── LICENSE.md                    # Apache 2.0 open-source license
└── SECURITY.md                   # Security vulnerability reporting & disclosure guidelines

---

## 🔐 Credentials & Interactive Navigation

| Portal | Route | Demo Credentials | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin Command & Control** | `/admin` | `admin@civiclens.local` / `AdminPass123!` | Personnel dossier, dismissal simulation, audit logs, system telemetry |
| **Predictive AI Suite** | `/ai` | Public Access | CV damage detector, photo upload, 90-day risk curve, What-If slider |
| **Tripura GIS Map** | `/map` | Public Access | Interactive Leaflet heatmap, deep zoom, asset marker focus |
| **Asset Registry** | `/assets` | Public Access | 95+ assets with category filters: Municipal Wards, Panchayats, Railways, Tunnels, Bridges, Rivers, Tourist |
| **Citizen Grievance Submission** | `/report` | Public Access | Photo evidence, GPS capture, word counter (5 to 10,000 words) |
| **Grievance Status Tracker** | `/login` | Mobile: `98621 44520` (OTP: `123456`) | Real-time complaint progression timeline and resolution SLA |

---

## 🛡️ Security & Standards Compliance

- **GIGW 3.0 & UX4G**: Adheres to Government of India Guidelines for Indian Websites and UX4G design tokens.
- **WCAG 2.1 Level AA**: Full keyboard navigation, ARIA roles, high-contrast text ratios ($\ge 7:1$).
- **Zero-Trust Uploads**: 50MB hard limit with magic-byte verification (JPEG, PNG, WEBP).
- **OWASP Hardened**: HTTP security headers (`Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`).

---

<div align="center">
  <sub>CivicLens AI · Urban Infrastructure Operations &amp; Predictive Intelligence Demonstration Platform</sub><br />
  <sub>Calibrated for Municipal Corporations &amp; District Administrations across Tripura</sub>
</div>
