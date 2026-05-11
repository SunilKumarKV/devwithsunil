# DevWithSunil Backend

Node.js + Express + PostgreSQL backend for DevWithSunil.

## Setup

```bash
cp .env.example .env
npm install
psql "$DATABASE_URL" -f sql/init.sql
npm run seed:admin
npm run dev
```

Admin email defaults to `devwithsunilyt@gmail.com` through `ADMIN_EMAIL`.

Do not commit real passwords. Use Google App Password for SMTP email sending.
