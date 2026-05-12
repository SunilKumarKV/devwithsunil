const pool = require('../config/db');
const logger = require('./logger');

const setupDatabase = async () => {
  const statements = [
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      tag TEXT NOT NULL DEFAULT 'General',
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      read_time INT NOT NULL DEFAULT 3,
      status TEXT NOT NULL DEFAULT 'published',
      cover_image TEXT,
      seo_title TEXT,
      seo_description TEXT,
      scheduled_at TIMESTAMPTZ,
      featured BOOLEAN NOT NULL DEFAULT false,
      view_count INT NOT NULL DEFAULT 0,
      like_count INT NOT NULL DEFAULT 0,
      tags TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      youtube_id TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      thumbnail_url TEXT NOT NULL,
      video_url TEXT NOT NULL,
      published_at TIMESTAMPTZ,
      featured BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      tech_stack TEXT[] NOT NULL DEFAULT '{}',
      github_url TEXT,
      live_url TEXT,
      featured BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title TEXT`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description TEXT`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS view_count INT NOT NULL DEFAULT 0`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS like_count INT NOT NULL DEFAULT 0`,
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[] NOT NULL DEFAULT '{}'`,
    `ALTER TABLE videos ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT true`,
    `ALTER TABLE videos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`,
    `ALTER TABLE projects ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
  ];

  for (const statement of statements) {
    await pool.query(statement);
  }

  await pool.query(`
    INSERT INTO projects (title, slug, description, tech_stack, github_url, live_url, featured)
    VALUES
      ('ChessPlay', 'chessplay', 'Production-focused chess platform with React, Node.js, Socket.IO, MongoDB, authenticated profiles, multiplayer rooms, and Stockfish AI integration.', ARRAY['React', 'Node.js', 'Socket.IO', 'MongoDB'], 'https://github.com/SunilKumarKV', 'https://chessplay1.vercel.app/', true),
      ('SunilCraft Portfolio', 'sunilcraft-portfolio', 'Personal developer portfolio showcasing frontend projects, React UI work, and full-stack learning journey.', ARRAY['React', 'Vite', 'Tailwind CSS', 'UI/UX'], 'https://github.com/SunilKumarKV', 'https://sunilcraft.vercel.app/', true),
      ('DevWithSunil', 'devwithsunil', 'Learning, YouTube, tutorials, blogs, newsletter, and contact platform powered by React, Express, and PostgreSQL.', ARRAY['React', 'Express', 'PostgreSQL', 'JWT'], 'https://github.com/SunilKumarKV/devwithsunil', 'https://devwithsunil.vercel.app/', true)
    ON CONFLICT (slug)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      tech_stack = EXCLUDED.tech_stack,
      github_url = EXCLUDED.github_url,
      live_url = EXCLUDED.live_url,
      featured = EXCLUDED.featured,
      updated_at = now()
  `);

  await pool.query(`
    INSERT INTO blog_posts (
      slug, title, tag, tags, date, excerpt, content, read_time, status,
      cover_image, seo_title, seo_description, scheduled_at, featured
    )
    SELECT
      'building-production-full-stack-apps-react-nodejs',
      'Building Production-Level Full Stack Applications with React & Node.js',
      'Full Stack Development',
      ARRAY['React', 'Node.js', 'Production Apps', 'DevWithSunil'],
      CURRENT_DATE,
      'Learn how production-level full stack applications are built using React, Node.js, PostgreSQL, Tailwind CSS, real database APIs, admin dashboards, SEO, and deployment workflows.',
      '# Building Production-Level Full Stack Applications with React & Node.js

Modern web development is no longer only about creating simple pages. A production-ready project needs clean UI, real APIs, a secure backend, database-driven content, SEO, analytics, deployment, and admin tools.

## What production-ready means

A production app should have reusable frontend components, backend validation, database persistence, authentication, loading states, error states, responsive UI, SEO metadata, and deployment configuration.

## DevWithSunil stack

I use React, Vite, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, JWT auth, and Vercel/Render deployment.

## Real projects

DevWithSunil includes blogs, tutorials, YouTube videos, projects, newsletter, contact messages, and an admin dashboard.

## Final thought

The best way to grow as a developer is to build, publish, debug, and improve real projects consistently.',
      8,
      'published',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
      'Building Production-Level Full Stack Apps with React & Node.js',
      'Learn how to build production-level full stack applications with React, Node.js, PostgreSQL, admin dashboards, SEO, and deployment workflows.',
      NULL,
      true
    WHERE NOT EXISTS (SELECT 1 FROM blog_posts)
  `);

  await pool.query(`
    INSERT INTO videos (youtube_id, title, description, thumbnail_url, video_url, published_at, featured)
    SELECT
      'channel-intro-devwithsunil',
      'Welcome to DevWithSunil - Full Stack, AI, Coding & Real Projects',
      'Starter featured video placeholder. Replace the YouTube ID from the admin panel after uploading your first channel video.',
      'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      'https://www.youtube.com/@DevWithSunilTech',
      now(),
      true
    WHERE NOT EXISTS (SELECT 1 FROM videos)
  `);

  logger.info('Database tables verified and starter content ensured');
};

module.exports = setupDatabase;
