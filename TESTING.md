# Testing — Part 1

## Backend

Run:

```powershell
docker compose exec backend pytest
```

The CI pipeline also installs backend dependencies and executes pytest.

## Frontend type check

```powershell
cd frontend
npm install
npm run lint
```

## Frontend production build

```powershell
npm run build
```

## Docker smoke test

```powershell
docker compose up --build
curl.exe http://localhost:8000/health
curl.exe http://localhost:8000/ready
```

## Manual acceptance checklist

- landing page renders
- header/footer render
- custom 404 renders
- login works
- dashboard loads database aggregates
- assets page loads API records
- incidents page loads API records
- public report creates an incident
- GIS map renders coordinate-bearing assets
- work-order API works
- inspection API works
- audit events are created
- Part 2 AI flag remains false
