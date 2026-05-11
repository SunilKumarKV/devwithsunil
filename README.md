# DevWithSunil - AI, Coding & Full Stack Learning Platform

DevWithSunil is a production-focused full-stack learning platform for coding tutorials, AI tools, technical blogs, project showcases, newsletter subscriptions, and developer community updates.

## Live Website

https://devwithsunil.vercel.app

## YouTube Channel

https://www.youtube.com/@DevWithSunilTech

## Contact

devwithsunilyt@gmail.com

## About

DevWithSunil helps beginners and developers learn modern web development through real-world projects, production-level coding tutorials, UI/UX breakdowns, AI tools, and full-stack development workflows.

## Key Features

- YouTube video integration from real backend data
- Technical blog system with database-powered posts
- Blog detail pages with dynamic SEO support
- Project showcase for real portfolio projects
- Newsletter subscription API
- Contact form API with email notification support
- Admin dashboard route and protected admin API
- SEO component with Open Graph and Twitter metadata
- Sitemap and robots.txt for search indexing
- Vercel Analytics integration
- Responsive dark modern UI
- PostgreSQL database schema
- JWT authentication and admin role protection
- Empty states instead of fake/dummy content

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- ShadCN UI
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
- Nodemailer
- Helmet
- CORS
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
│   ├── sql
│   └── server.js
└── README.md
```

## Environment Variables

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_CONTACT_EMAIL=devwithsunilyt@gmail.com
VITE_YOUTUBE_URL=https://www.youtube.com/@DevWithSunilTech
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Backend

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000
APP_NAME=DevWithSunil
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://username:password@host:5432/devwithsunil
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRATION=4h
ALLOW_PUBLIC_REGISTRATION=true
SWAGGER_ENABLED=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=devwithsunilyt@gmail.com
EMAIL_PASS=your_google_app_password
EMAIL_TO=devwithsunilyt@gmail.com
```

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
```

## Run Locally

From the root folder:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000/api`

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
- `POST /api/contact`
- `POST /api/newsletter/subscribe`
- `GET /api/admin/dashboard` - admin only


## Deployment

### Frontend on Vercel

- Root directory: `frontend`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Backend on Render/Railway

- Root directory: `backend`
- Start command: `npm start`
- Add PostgreSQL database URL
- Add all backend environment variables

## Roadmap

- Full CRUD admin pages
- Markdown blog editor
- YouTube API auto-sync
- Project CRUD management
- Newsletter email campaigns
- Blog category and search filters
- Analytics dashboard
- Course/tutorial module
- AI-powered blog summaries
- Custom domain `devwithsunil.com`

## Author

Sunil Kumar  
DevWithSunil

- YouTube: https://www.youtube.com/@DevWithSunilTech
- Email: devwithsunilyt@gmail.com
- GitHub: https://github.com/SunilKumarKV
- LinkedIn: https://www.linkedin.com/in/sunilkumarkv44/
