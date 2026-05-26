# Contributing to DevWithSunil

Thank you for contributing.

## Local Setup

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

Create environment files:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Set up the database:

```bash
cd backend
psql "$DATABASE_URL" -f sql/init.sql
npm run seed:admin
```

## Development Rules

- Do not commit real `.env` files or credentials.
- Keep admin routes protected.
- Do not weaken JWT, CORS, rate limiting, or email security.
- Keep public content queries safe and database-backed.
- Update README or env examples when setup changes.
- Test frontend and backend before opening a pull request.

## Pull Requests

Use the pull request template and include screenshots for UI changes.
