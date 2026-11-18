# CivicLens AI — Troubleshooting Guide

This guide provides diagnosis and remediation steps for common operational issues encountered during development or deployment.

## Common Issues & Remediation

### 1. Browser "Connection Reset" on Port 5432 or 6379
- **Cause**: Port 5432 (PostgreSQL) and Port 6379 (Redis) are raw TCP binary network sockets, not HTTP web servers.
- **Solution**: Do not open `http://localhost:5432` or `http://localhost:6379` in a web browser. Access the web interface at `http://localhost:3000` (Web Portal) or `http://localhost:8000/docs` (Swagger API). Use database GUI tools (DBeaver, TablePlus, or `psql`) to connect to port 5432.

### 2. Frontend Fails to Connect to Backend API
- **Diagnosis**: Verify `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000/api/v1`).
- **Check Backend Health**: Run `curl http://localhost:8000/health` or `docker compose logs backend`.
- **CORS Configuration**: Ensure `BACKEND_CORS_ORIGINS` in `.env` includes `http://localhost:3000`.

### 3. Leaflet SSR / Window Not Defined Errors
- **Cause**: Leaflet relies on browser window primitives unavailable during server-side static rendering.
- **Solution**: Ensure all map components are dynamically imported client-side via:
  ```tsx
  dynamic(() => import("@/components/map-client"), { ssr: false })
  ```

### 4. Next.js Suspense Boundary Warning during Build
- **Cause**: Consuming `useSearchParams()` without a surrounding `<Suspense>` wrapper.
- **Solution**: Wrap the client component inside `<Suspense fallback={...}>` in the page definition.

### 5. Docker Containers Not Becoming Healthy
- **Inspection**: Run `docker compose ps` to inspect container health statuses.
- **View Container Logs**:
  ```bash
  docker compose logs db
  docker compose logs backend
  docker compose logs frontend
  ```
- **Reset Development Volumes**: If the database schema becomes corrupted in development:
  ```bash
  docker compose down -v
  docker compose up -d --build
  ```
