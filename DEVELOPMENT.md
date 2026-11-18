# CivicLens AI — Developer Setup & Workflows

## Local Development Workflow

### 1. Prerequisites
- Python 3.12+
- Node.js 20+ / npm 10+
- PostgreSQL 16 with PostGIS 3.4
- Redis 7+

### 2. Backend Setup
```powershell
# Create and activate Python virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r backend/requirements.txt

# Run database migrations
$env:PYTHONPATH="backend"
alembic upgrade head

# Start FastAPI development server
python -m uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend Setup
```powershell
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Next.js development server
npm run dev -- -p 3000
```

### 4. Code Quality & Verification Commands
```powershell
# Type-check frontend without emitting files
cd frontend
npx tsc --noEmit

# Test production build
npm run build

# Run backend test suite
$env:PYTHONPATH="backend"
python -m pytest backend/tests

# Run Python linter & style checker
python -m ruff check backend
```
