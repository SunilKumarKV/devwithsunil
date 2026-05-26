# DevWithSunil

Production-focused developer brand and learning platform for coding tutorials, technical blogs, project showcases, newsletter subscriptions, contact messages, and admin-managed creator content.

## Live Links

- Website: https://devwithsunil.vercel.app
- YouTube: https://www.youtube.com/@DevWithSunilTech
- GitHub: https://github.com/SunilKumarKV/devwithsunil
- LinkedIn: https://www.linkedin.com/in/sunilkumarkv44/

## Overview

DevWithSunil is built as a full-stack platform for publishing developer content, managing blogs/videos/projects, collecting newsletter subscribers, and handling contact messages through an admin dashboard.

The project focuses on real production needs such as SEO, analytics, authentication, database-backed content, admin workflows, and deployment-ready environment configuration.

## Core Features

- Developer landing page
- Technical blog system
- Blog draft and publish workflow
- YouTube video management
- Project showcase management
- Newsletter subscription API
- Contact form API
- Admin login with JWT authentication
- Admin dashboard for blogs, videos, and projects
- SEO metadata support
- Sitemap and robots.txt
- Google Analytics support
- Vercel Analytics support
- PostgreSQL-backed data

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- React Query
- Framer Motion
- React Helmet Async

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt
- Nodemailer
- Helmet
- CORS
- Express Rate Limit
- Express Validator
- Swagger Docs

## Folder Structure

```txt
devwithsunil
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── pages
│       ├── lib
│       └── main.tsx
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── scripts
│   ├── sql
│   └── server.js
└── README.md
```

## Environment Setup

Copy example environment files:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### Frontend Environment

```env
VITE_API_URL=http://localhost:5000
VITE_CONTACT_EMAIL=devwithsunilyt@gmail.com
VITE_YOUTUBE_URL=https://www.youtube.com/@DevWithSunilTech
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_VERCEL_ANALYTICS=false
```

### Backend Environment

```env
NODE_ENV=development
PORT=5000
APP_NAME=DevWithSunil
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://username:password@host:5432/devwithsunil
JWT_SECRET=replace_with_a_very_long_random_secret
JWT_EXPIRATION=4h
ALLOW_PUBLIC_REGISTRATION=false
SWAGGER_ENABLED=true
ADMIN_NAME=Sunil Kumar
ADMIN_EMAIL=devwithsunilyt@gmail.com
ADMIN_PASSWORD=your_admin_password_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=devwithsunilyt@gmail.com
EMAIL_PASS=your_google_app_password
EMAIL_TO=devwithsunilyt@gmail.com
```

Never commit real secrets or production `.env` files.

## Installation

```bash
git clone https://github.com/SunilKumarKV/devwithsunil.git
cd devwithsunil
npm install
cd frontend && npm install
cd ../backend && npm install
```

## Database Setup

```bash
cd backend
psql "$DATABASE_URL" -f sql/init.sql
npm run seed:admin
```

## Run Locally

From the root folder:

```bash
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000/api

## Important Routes

### Frontend

- `/` - Home page
- `/blog` - Blog list
- `/blog/:slug` - Blog detail
- `/admin` - Admin dashboard

### Backend

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/blog/posts`
- `POST /api/blog/posts` - admin only
- `GET /api/videos`
- `POST /api/videos` - admin only
- `GET /api/projects`
- `POST /api/projects` - admin only
- `POST /api/contact`
- `POST /api/newsletter/subscribe`
- `GET /api/admin/dashboard` - admin only

## Admin Dashboard

The admin dashboard supports:

- Secure JWT login
- Dashboard stats
- Blog create/edit/delete
- Blog draft/publish/schedule workflow
- YouTube video create/delete workflow
- Project create/delete workflow
- Subscriber/message counts
- Logout support
- Database-backed public content

## Deployment

### Frontend on Vercel

- Root directory: `frontend`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` to the deployed backend API URL

### Backend on Render/Railway

- Root directory: `backend`
- Start command: `npm start`
- Add PostgreSQL `DATABASE_URL`
- Add all backend environment variables
- Run database schema setup
- Seed admin account

## Production Environment Notes

Frontend:

```env
VITE_API_URL=https://your-backend-url.onrender.com
VITE_ENABLE_VERCEL_ANALYTICS=false
VITE_GA_MEASUREMENT_ID=
```

Backend:

```env
NODE_ENV=production
DATABASE_URL=your_postgres_url
JWT_SECRET=your_long_secret
ADMIN_EMAIL=devwithsunilyt@gmail.com
ADMIN_PASSWORD=your_secure_admin_password
CORS_ORIGIN=https://devwithsunil.vercel.app
```

Restart/redeploy services after changing production environment variables.

## SEO & Analytics

- SEO component included
- Sitemap and robots support
- Google Analytics environment support
- Vercel Analytics toggle support

## Security

- JWT authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS configuration
- Rate limiting
- Environment-based secret management

## Author

Sunil Kumar K V

- Portfolio: https://sunilcraft.vercel.app
- YouTube: https://www.youtube.com/@DevWithSunilTech
- GitHub: https://github.com/SunilKumarKV
- LinkedIn: https://www.linkedin.com/in/sunilkumarkv44/
