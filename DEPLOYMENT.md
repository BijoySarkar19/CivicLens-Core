# CivicLens AI — Deployment & Infrastructure Guide

This guide covers production deployment recommendations, reverse-proxy configurations, and security baselines for CivicLens AI.

## Architecture & Network Topology

```text
[Internet / Citizen & Officer Clients]
                │
         (HTTPS Port 443)
                ▼
  [Reverse Proxy: Nginx / Caddy / Cloudflare]
     │                                 │
     ▼ (Reverse Proxy :3000)           ▼ (Reverse Proxy :8000)
[Next.js Web Frontend]        [FastAPI Application Backend]
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
      [PostgreSQL 16 + PostGIS]                    [Redis 7 Cache]
      (Internal VPC :5432)                         (Internal VPC :6379)
```

## Production Security Checklist
1. **TLS / SSL Termination**: Enforce HTTPS on port 443 with HSTS enabled (`Strict-Transport-Security: max-age=31536000`).
2. **Cookie Security**: Set `COOKIE_SECURE=true` in environment configuration to enforce `Secure; HttpOnly; SameSite=Lax` cookies.
3. **Database Isolation**: Never bind port 5432 or 6379 to public interfaces (`0.0.0.0`). Restrict database access strictly to the container network or private VPC subnet.
4. **Environment Secrets**: Generate cryptographically secure values for `SECRET_KEY`, database passwords, and JWT signing keys.
5. **Backups & Recovery**: Configure automated daily snapshots of the PostGIS database and MinIO storage volumes.
