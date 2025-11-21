# JliebCd9631e622294197A36e70131ccafb5d

TurboVets Application Project

Note: AI was used to assist with this project.

## Backend database
- The Nest API uses SQLite via TypeORM; the driver is already installed.
- A file-based database is created at `database.sqlite` in the workspace root.
- Entities decorated with `@Entity()` under `apps/api/src` are auto-loaded; add new ones and TypeORM will sync the schema (dev-only).
- Auth endpoint: `POST /api/auth/login` with `{ "username": "...", "password": "..." }`. Default seeded users are `admin/admin123` and `user/user123`.
