# Docker Deployment & Container Architecture

CivicLens AI uses Docker and Docker Compose v2 for multi-container orchestration across database, cache, backend, worker, storage, and frontend tiers.

## Container Roster

| Container Name | Base Image | Internal Port | Host Port | Function | Health Check |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `civiclens-frontend` | `node:22-alpine` | `3000` | `3000` | Next.js 15.5 Web Portal (Citizens, Officers & Admin) | HTTP GET `/` |
| `civiclens-backend` | `python:3.12-slim` | `8000` | `8000` | FastAPI 0.115 REST API & Decision Engine | HTTP GET `/health` |
| `civiclens-db` | `postgis/postgis:16-3.4` | `5432` | `5432` | PostgreSQL 16 + PostGIS Spatial Engine (EPSG:4326) | `pg_isready -U civiclens` |
| `civiclens-redis` | `redis:7-alpine` | `6379` | `6379` | In-memory cache & event broker | `redis-cli ping` |
| `civiclens-minio` | `quay.io/minio/aistor/minio` | `9000`, `9001` | `9000`, `9001` | S3-compatible photographic evidence object storage | TCP connect |

## Management Commands

### Start All Services
```bash
docker compose up -d
```

### Rebuild and Restart Application Tiers
```bash
docker compose up -d --build frontend backend
```

### View Live Logs
```bash
# Stream all logs
docker compose logs -f

# Stream frontend or backend logs specifically
docker compose logs -f frontend
docker compose logs -f backend
```

### Check Service Health
```bash
docker compose ps
```

### Graceful Shutdown
```bash
docker compose down
```
*(Database volumes are preserved in `civiclens-pgdata` across container rebuilds).*
