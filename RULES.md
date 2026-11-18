# RULES.md — CivicLens Architectural Invariants & Coding Rules

Strict engineering guidelines and invariant rules that must never be broken by contributors or automated AI agents.

---

## 1. Single Unified Platform Rule
- **NEVER** separate features into artificial phases, semesters, or isolated sub-sites.
- **NEVER** introduce disabled feature flags that lock out core functionality for reviewers.
- All capabilities (GIS, CV Damage Classifier, Predictive Risk, Inspections, Work Orders, Admin HR) must be accessible from the unified navigation hierarchy.

## 2. Dynamic Year & Timestamp Rule
- **NEVER** hardcode year strings (e.g. `© 2024` or `© 2025`) in UI footers or reports.
- **ALWAYS** compute the current year dynamically using `new Date().getFullYear()`.

## 3. Client-Side Spatial Map Rule
- **NEVER** import or invoke Leaflet (`L`, `react-leaflet`, `divIcon`, `map.flyTo`) directly inside React Server Components.
- **ALWAYS** isolate map components behind `dynamic(() => import(...), { ssr: false })`.
- **ALWAYS** guard browser window and document references with `typeof window !== "undefined"`.

## 4. Next.js App Router Suspense Rule
- **ALWAYS** wrap any client component that invokes `useSearchParams()` inside `<Suspense fallback={...}>` to prevent breaking Next.js static page generation during build time.

## 5. Defensive API Fetch Rule
- **NEVER** let an unhandled backend fetch failure crash the user interface or leave the screen showing an aggressive red "Failed to fetch" banner.
- **ALWAYS** supply an immediate, graceful fallback to the local Tripura seed datasets (`TRIPURA_SEED_ASSETS`, `DEMO_ADMIN_USERS`, `DEMO_INCIDENTS`, `DEMO_WORK_ORDERS`).

## 6. Contrast & Accessibility Rule
- **ALWAYS** ensure that in Government Mode (`isGovt`), unselected buttons, labels, and text render with high contrast (`#0f172a` or `#334155`), clean slate borders, and readable backgrounds. Never render light yellow or white text over light backgrounds.

## 7. Deep-Link Back Navigation Rule
- **ALWAYS** supply accessible Back buttons (`Back to Command Center` / `Back to Dossier`) on sub-pages navigated from administrative dossiers (`/map`, `/assets`) so the officer can return to their active review queue without friction.

## 8. Clean Optional Contact Field Rule
- **NEVER** display hardcoded or placeholder phone numbers when a citizen leaves optional contact information blank. Render `"No phone provided"` or `"Not Provided (Optional)"`.
