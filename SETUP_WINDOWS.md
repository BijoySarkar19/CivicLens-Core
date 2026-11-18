# SETUP_WINDOWS.md — CivicLens AI Windows 10/11 Setup Guide

Comprehensive setup instructions for running CivicLens AI natively or via Docker Desktop on Microsoft Windows.

---

## 1. System Requirements
- **OS**: Windows 10 (Build 19041+) or Windows 11 64-bit.
- **Docker**: Docker Desktop with WSL 2 backend enabled.
- **Development Tools**: PowerShell 7+ or Windows PowerShell 5.1, Git for Windows, VS Code.
- **Optional Local Runtimes**: Python 3.12 64-bit and Node.js 22 LTS (for bare-metal development).

---

## 2. One-Command Setup (Docker Desktop Recommended)

```powershell
# 1. Open PowerShell and navigate to your workspace
cd C:\Users\YOUR_USERNAME\Desktop

# 2. Clone the repository
git clone https://github.com/BijoySarkar19/CivicLens-Core.git
cd CivicLens-Core

# 3. Create local environment configuration
Copy-Item .env.example .env

# 4. Launch all containerized services (PostGIS, Redis, Backend, Frontend)
docker compose up -d --build
```

### Accessing Running Services
| Service | Browser URL | Port |
| :--- | :--- | :---: |
| **CivicLens Web Portal** | [http://localhost:3000](http://localhost:3000) | `3000` |
| **FastAPI Swagger API** | [http://localhost:8000/docs](http://localhost:8000/docs) | `8000` |
| **MinIO Storage Console** | [http://localhost:9001](http://localhost:9001) | `9001` |
| **Backend Health Probe** | [http://localhost:8000/health](http://localhost:8000/health) | `8000` |

---

## 3. Native Windows Local Development (Optional)

### Backend (Python 3.12)
```powershell
# Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install requirements
pip install -r backend/requirements.txt

# Run migrations & start Uvicorn
$env:PYTHONPATH="backend"
python -m uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload
```

### Frontend (Next.js 15)
```powershell
cd frontend
npm install
npm run dev -- -p 3000
```

---

## 4. Troubleshooting Windows Port Resets
- If opening `localhost:5432` or `localhost:6379` in a browser returns an error, this is expected: PostgreSQL and Redis are binary TCP sockets, not HTTP web pages. Connect to them using DBeaver or `psql`.
