# CivicLens AI — Design System & Component Library

## Visual Architecture
CivicLens AI implements a civic-tech operational design system supporting dual aesthetic modes:

1. **Modern Cyber-Civic Mode**: Deep navy canvas (`#070d16`), electric cyan accents (`#22d3ee`), glassmorphic panels, and glowing status indicators.
2. **Government Mode (UX4G / GIGW 3.0)**: Clean white slate backgrounds (`#f8fafc`), deep government navy (`#004085`), high-contrast slate text (`#0f172a`), and WCAG 2.1 AA accessible borders.

## Component Library
- **Page Shell & Animated Header**: Persistent sticky navigation with active route highlights, role indicator badge, and instant personnel switcher.
- **Stat Cards**: Dynamic KPIs with historical delta pills and animated metric counts.
- **Incident & Grievance Tables**: Sortable, filterable tables with centered severity badges, camera photo evidence indicators, and dossier inspector triggers.
- **Inspection Dossier Modal**: Comprehensive inspection lightboxes displaying citizen photos, GPS coordinates, progression pipelines, and officer transition buttons.
- **Interactive Leaflet Map Surface**: Dynamic client-side spatial map with clustering, radar rings, coordinate-focused deep zoom (`zoom=16`), and Back buttons.
- **Grievance Submission Portal**: 50MB zero-trust photo uploader, optional phone field, EXIF coordinate extractor, and word counter.
- **Accessibility & Contrast**: Built-in high-contrast Government Mode toggle adhering to Government of India Guidelines for Indian Websites.
