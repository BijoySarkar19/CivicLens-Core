# CivicLens AI — System Requirements & Technical Specifications

This document outlines the architectural, technical, and regulatory requirements governing the CivicLens AI platform.

## 1. Compliance & Accessibility Standards
- **UX4G & GIGW 3.0**: Government of India Guidelines for Indian Websites compliance.
- **WCAG 2.1 AA**: Dual-mode high-contrast view toggle (`/lib/govt-mode.tsx`) with accessible color contrast ratios (> 4.5:1 for normal text, > 3:1 for large headings and borders).
- **ISO 27001 & OWASP Top 10**: Secure authentication, parameterized SQL queries, rate limiting, and strict input validation.

## 2. Technical Stack Constraints
- **Frontend**: Next.js 15.5 App Router with dynamic SSR boundaries for Leaflet GIS maps and React Suspense wrappers for URL search parameters.
- **Backend**: FastAPI with async SQLAlchemy 2.0 ORM, GeoAlchemy2 PostGIS spatial functions, and SlowAPI rate limiting.
- **Data Persistence**: PostgreSQL 16 with PostGIS spatial extension (EPSG:4326), Redis 7 for broker caching and session validation.
- **AI / CV Head**: ResNet-50 feature extraction with YOLOv8 anchor-free object detection for structural defect identification and photogrammetric surface area calculations.
