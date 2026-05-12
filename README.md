# DevWithSunil - AI, Coding & Full Stack Learning Platform

DevWithSunil is a production-focused full-stack learning platform for YouTube tutorials, technical blogs, project showcases, newsletter subscriptions, contact messages, and admin-managed creator content.

## Live Links

- Website: https://devwithsunil.vercel.app
- YouTube: https://www.youtube.com/@DevWithSunilTech
- GitHub Repo: https://github.com/SunilKumarKV/devwithsunil
- Contact Email: devwithsunilyt@gmail.com

## What This Project Includes

1. React + TypeScript + Vite frontend
2. Node.js + Express backend
3. PostgreSQL database schema
4. Real project data from database
5. Blog system with draft/published status
6. YouTube video management API
7. Newsletter subscription API
8. Contact form API with email notification support
9. Admin login with JWT authentication
10. Admin dashboard for blogs, videos, and projects
11. SEO component with Open Graph and Twitter metadata
12. `sitemap.xml` and `robots.txt`
13. Google Analytics support
14. Vercel Analytics support
15. Production-safe environment variable setup

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- React Query
- Framer Motion
- React Helmet Async
- Vercel Analytics

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt password hashing
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
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── lib
│   │   └── main.tsx
│   └── package.json
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

Copy the example files:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_CONTACT_EMAIL=devwithsunilyt@gmail.com
VITE_YOUTUBE_URL=https://www.youtube.com/@DevWithSunilTech
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Backend `.env`

```env
NODE_ENV=development
PORT=5000
APP_NAME=DevWithSunil
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://username:password@host:5432/devwithsunil
JWT_SECRET=replace_with_a_very_long_random_secret_minimum_32_chars
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

Important: do not commit real passwords to GitHub. For Gmail email sending, `EMAIL_PASS` must be a Google App Password, not your normal Gmail login password.

## Installation

```bash
git clone https://github.com/SunilKumarKV/devwithsunil.git
cd devwithsunil
npm install
cd frontend && npm install
cd ../backend && npm install
```

## Database Setup

Run the schema and real project seed data:

```bash
cd backend
psql "$DATABASE_URL" -f sql/init.sql
```

## Create Admin Account

After updating `backend/.env`, run:

```bash
cd backend
npm run seed:admin
```

Admin login page:

```txt
http://localhost:5173/admin
```

Use the email and password from your local `backend/.env`:

```txt
ADMIN_EMAIL=devwithsunilyt@gmail.com
ADMIN_PASSWORD=your_admin_password_here
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

## Admin Dashboard Features

1. Secure JWT login
2. Dashboard stats
3. Create blog posts
4. Add YouTube videos
5. Add projects
6. View subscriber/message counts
7. Logout support
8. Database-backed public content

## Deployment

### Frontend on Vercel

- Root directory: `frontend`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Add frontend environment variables in Vercel settings

### Backend on Render/Railway

- Root directory: `backend`
- Start command: `npm start`
- Add PostgreSQL database URL
- Add all backend environment variables
- Run `sql/init.sql`
- Run `npm run seed:admin`

## SEO & Analytics

- SEO component: `frontend/src/components/SEO.tsx`
- Sitemap: `frontend/public/sitemap.xml`
- Robots: `frontend/public/robots.txt`
- Google Analytics: set `VITE_GA_MEASUREMENT_ID`
- Vercel Analytics: enabled in `frontend/src/App.tsx`

## Author

Sunil Kumar  
DevWithSunil

- YouTube: https://www.youtube.com/@DevWithSunilTech
- Email: devwithsunilyt@gmail.com
- GitHub: https://github.com/SunilKumarKV
- LinkedIn: https://www.linkedin.com/in/sunilkumarkv44/

## Admin Login and CORS Fix Notes

Admin URL:

- Local: `http://localhost:5173/admin` or `http://localhost:5174/admin`
- Production: `https://devwithsunil.vercel.app/admin`

Required backend environment variables:

```env
ADMIN_EMAIL=devwithsunilyt@gmail.com
ADMIN_PASSWORD=your_admin_password_here
FRONTEND_URL=https://devwithsunil.vercel.app
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:8080,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:8080,https://devwithsunil.vercel.app
```

Required frontend environment variables:

```env
VITE_API_URL=http://localhost:5000
```

For production frontend on Vercel, set `VITE_API_URL` to your deployed backend URL, for example:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

The backend now automatically creates/updates the admin user on startup when `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set. You can also manually run:

```bash
npm run seed:admin
```



## Latest production fixes

- Admin dashboard API now verifies/creates the required PostgreSQL tables on backend startup.
- `/api/admin/dashboard` returns real counts plus recent blogs, videos, projects, newsletter subscribers, and contact messages.
- Admin panel now shows database-backed lists instead of only static cards.
- Vercel Analytics is disabled by default unless `VITE_ENABLE_VERCEL_ANALYTICS=true` is set after enabling Web Analytics in Vercel.
- Vercel rewrites now exclude `/_vercel/*`, favicon, robots, sitemap, manifest, and assets so analytics/static files are not rewritten to `index.html`.

### Required production environment variables

Frontend on Vercel:

```env
VITE_API_URL=https://devwithsunil-backend.onrender.com
VITE_ENABLE_VERCEL_ANALYTICS=false
VITE_GA_MEASUREMENT_ID=
```

Backend on Render:

```env
ADMIN_EMAIL=devwithsunilyt@gmail.com
ADMIN_PASSWORD=your_secure_admin_password
CORS_ORIGIN=https://devwithsunil.vercel.app,http://localhost:5173,http://localhost:5174,http://localhost:8080
```

Restart the Render backend after changing environment variables.

## Latest Admin Blog Upgrade

This version upgrades the admin panel blog workflow so saved blogs are stored in PostgreSQL and can be managed from `/admin`.

### Implemented

1. Blog draft/publish status.
2. Markdown-style rich text content editor with preview.
3. Thumbnail/cover image URL field.
4. SEO title field.
5. SEO description field.
6. Schedule publish date/time field.
7. Featured blog toggle.
8. View count support.
9. Like count support.
10. Admin blog search.
11. Admin blog status filter.
12. Edit existing blog.
13. Delete blog.
14. Public blog list only shows published blogs after their scheduled time.
15. Admin blog manager shows drafts, published posts, views, likes, and schedule status.

### Important

If a blog is saved as `draft`, it appears only in the admin panel. To show it on the public `/blog` page, set status to `published`. If `scheduled_at` is a future date, it will appear only after that date/time.

### Database Migration

The backend automatically adds the new blog columns on startup through `utils/setupDatabase.js`. For production, redeploy or restart the Render backend after pushing this version.

## Latest Admin Production Fixes

This version upgrades the admin panel so content created in admin is visible immediately in the correct dashboard sections.

### Implemented

1. Added admin video listing API: `GET /api/videos/admin/all`.
2. Added admin project listing API: `GET /api/projects/admin/all`.
3. Added video delete API: `DELETE /api/videos/:id`.
4. Added project delete API: `DELETE /api/projects/:id`.
5. Updated video create API to upsert by YouTube ID and refresh `updated_at`.
6. Updated project create API to upsert by slug and refresh `updated_at`.
7. Added video manager in admin panel with search, open, and delete actions.
8. Added project manager in admin panel with search, live link, and delete actions.
9. Added recent blogs to the admin dashboard overview.
10. Fixed admin dashboard refresh after blog/video/project save or delete.
11. Invalidated all affected React Query caches after admin mutations.
12. Improved blog save payload defaults for slug, SEO title, SEO description, and scheduled publish.
13. Added featured toggles for videos and projects.
14. Kept public site clean: only featured videos/projects and published blogs show publicly.
15. Verified frontend production build and frontend tests.
16. Verified backend tests.

### Production Environment Notes

Frontend Vercel:

```env
VITE_API_URL=https://devwithsunil-backend.onrender.com
VITE_ENABLE_VERCEL_ANALYTICS=false
```

Backend Render:

```env
NODE_ENV=production
DATABASE_URL=your_postgres_url
JWT_SECRET=your_long_secret
ADMIN_EMAIL=devwithsunilyt@gmail.com
ADMIN_PASSWORD=your_admin_password
CORS_ORIGIN=https://devwithsunil.vercel.app,http://localhost:5173,http://localhost:5174,http://localhost:8080
```

After changing environment variables, redeploy both frontend and backend.
