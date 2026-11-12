# Authentication — Part 1

## Flow

```text
Login form
   ↓
OAuth2 form endpoint
   ↓
Password verification
   ↓
JWT creation
   ↓
HttpOnly cookie
   ↓
Protected API requests
```

The API also supports a bearer token for Swagger and external clients.

## Roles

```text
super_admin
infrastructure_manager
department_officer
field_inspector
data_administrator
public_user
```

## Development administrator

The startup seed reads:

```text
ADMIN_EMAIL
ADMIN_PASSWORD
```

from `.env`.

Do not use the development password in production.

## Session behavior

The frontend does not store the JWT in localStorage. Browser authentication is carried in an HttpOnly cookie.
