# SUPPORT.md — CivicLens AI Technical Support & Incident Escalation

Official operational support guide for civic authorities, participating departments, and developers.

---

## 1. Issue Reporting & Support Channels

- **Public Redressal & Bug Reports**: Submit an issue via GitHub Issues at [https://github.com/BijoySarkar19/CivicLens-Core/issues](https://github.com/BijoySarkar19/CivicLens-Core/issues).
- **Administrative Operations Helpline**: Directorate of Urban Development, Agartala, Tripura (`support@civiclens.local`).
- **Emergency Municipal Escalation**: Agartala Municipal Corporation Integrated Command & Control Center (ICCC), Lichubagan.

---

## 2. Severity Classification & Response SLA

| Level | Definition | Target First Response | Target Remediation |
| :--- | :--- | :--- | :--- |
| **P1 - Critical** | System-wide outage, database lock, public GIS offline | < 30 minutes | < 4 hours |
| **P2 - High** | AI vision inference failure, SMS gateway disruption | < 2 hours | < 12 hours |
| **P3 - Medium** | Non-critical reporting anomalies, visual styling issues | < 8 hours | < 48 hours |
| **P4 - Low** | Feature requests, documentation clarification | < 24 hours | Next scheduled release |

---

## 3. Diagnostic Data Collection

Before reporting an operational fault, collect:
1. Output of backend health check: `GET http://localhost:8000/health`
2. Output of database readiness check: `GET http://localhost:8000/ready`
3. Browser console errors and network request logs (F12 Developer Tools).
4. Timestamp and Request ID (`X-Request-ID` header).
