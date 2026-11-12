# Troubleshooting

- If the frontend cannot reach the API, verify `NEXT_PUBLIC_API_URL` and CORS.
- If Postgres is unavailable, run `docker compose ps` and inspect `docker compose logs db`.
- If authentication fails, verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` and recreate the database only in development if needed.
- Never fix production data by manually editing tables; use migrations.
