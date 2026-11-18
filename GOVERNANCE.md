# GOVERNANCE.md — CivicLens AI Governance & Operating Model

This document outlines the decision-making processes, maintainer roles, and governance model of the CivicLens AI platform.

---

## 1. Governance Philosophy

CivicLens AI operates as an open-architecture smart governance and public infrastructure project. Governance is driven by transparency, architectural integrity, and alignment with Government of India Digital Public Infrastructure (DPI) guidelines.

---

## 2. Roles & Responsibilities

### Project Lead & Principal Maintainer
- Ultimate responsibility for architectural decisions, security disclosures, and production releases.
- Reviews and merges pull requests into the `main` branch.
- Current Lead: **Bijoy Sarkar** ([@BijoySarkar19](https://github.com/BijoySarkar19)).

### Domain Specialists
- **Spatial GIS Specialists**: Maintain geospatial geometry, coordinate projection bounds (EPSG:4326), and Leaflet integration.
- **Machine Learning Engineers**: Maintain ResNet-50 feature extractors, YOLOv8 model weights, and photogrammetric mensuration logic.
- **Frontend / Accessibility Advocates**: Ensure full compliance with UX4G and GIGW 3.0 accessibility standards.
- **Civic Department Liaisons**: Align system data models with PWD, TSECL, DWS, and Municipal requirements.

---

## 3. Decision-Making Process
- **Minor Changes**: Direct PR review and approval by at least one maintainer.
- **Major Architectural Additions**: Documented in an Issue or Design Proposal (`DESIGN.md` / `PLAN.md`) before implementation.
- **Security Patches**: Expedited review, isolated branch testing, and immediate release tagging.
