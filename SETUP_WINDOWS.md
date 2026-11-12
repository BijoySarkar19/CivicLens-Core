# CivicLens Core — Windows Setup

## Requirements

- Windows 10/11
- Docker Desktop
- VS Code
- Python 3.12 for local backend development
- Node.js 22 for local frontend development

## 1. Clone/open the project

```powershell
cd C:\Users\YOUR_NAME\Desktop
git clone <YOUR_REPOSITORY_URL> CivicLens-Core
cd CivicLens-Core
```

## 2. Create the environment file

```powershell
Copy-Item .env.example .env
```

Edit `.env` and set a strong `SECRET_KEY` and local development passwords.

## 3. Start the full stack

```powershell
docker compose up --build
```

Open:

- Frontend: http://localhost:3000
- API: http://localhost:8000
- Swagger: http://localhost:8000/docs
- MinIO Console: http://localhost:9001

## 4. Development administrator

The backend creates the administrator from:

```text
ADMIN_EMAIL
ADMIN_PASSWORD
```

Never commit `.env`.

## 5. Stop

```powershell
docker compose down
```

To also remove development database/storage volumes:

```powershell
docker compose down -v
```

Use `down -v` only when you intentionally want to delete local database data.
