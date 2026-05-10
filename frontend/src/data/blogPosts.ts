export interface BlogPost {
  slug: string;
  title: string;
  tag: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "chatgpt-for-coding",
    title: "How to Use ChatGPT for Coding Like a Pro",
    tag: "AI Tools",
    date: "Mar 2026",
    excerpt: "Master the art of prompt engineering to write, debug, and optimize code with ChatGPT.",
    readTime: "8 min read",
    content: `
ChatGPT has revolutionized how developers write code. But most people are only scratching the surface. In this guide, I'll show you advanced techniques to get the most out of AI-assisted coding.

## 1. Be Specific with Your Prompts

Instead of asking "write me a function," try: "Write a TypeScript function that takes an array of user objects with name and email properties, filters out users with invalid emails using a regex pattern, and returns the valid users sorted alphabetically by name."

The more context you provide, the better the output.

## 2. Use ChatGPT for Debugging

Paste your error message along with the relevant code snippet. Ask it to:
- Identify the root cause
- Suggest a fix
- Explain why the error occurred

## 3. Code Review Partner

Ask ChatGPT to review your code for:
- Performance issues
- Security vulnerabilities
- Best practices and design patterns
- Edge cases you might have missed

## 4. Learning New Frameworks

When learning a new framework, ask ChatGPT to:
- Explain concepts with analogies
- Provide minimal working examples
- Compare approaches (e.g., "useState vs useReducer")

## 5. Generate Tests

Describe your function and ask for comprehensive test cases including edge cases, error scenarios, and boundary conditions.

## Conclusion

AI won't replace developers, but developers who use AI effectively will outperform those who don't. Start integrating ChatGPT into your workflow today!
    `,
  },
  {
    slug: "fullstack-nextjs-15",
    title: "Building a Full-Stack App with Next.js 15",
    tag: "Web Dev",
    date: "Feb 2026",
    excerpt: "A complete walkthrough of building a production-ready app with Next.js 15, from setup to deployment.",
    readTime: "12 min read",
    content: `
Next.js 15 brings exciting new features like the App Router improvements, Server Actions, and partial prerendering. Let's build a real application step by step.

## Setting Up the Project

Start with create-next-app and configure TypeScript, Tailwind CSS, and ESLint. We'll use the App Router for file-based routing.

## Database Layer

We'll use Prisma as our ORM with PostgreSQL. Define your schema, run migrations, and seed your database with initial data.

## Authentication

Implement authentication with NextAuth.js v5. Set up providers for Google and GitHub, and create protected routes with middleware.

## Building the UI

Use Server Components by default for better performance. Only use Client Components when you need interactivity (forms, modals, etc.).

## Server Actions

Replace traditional API routes with Server Actions for mutations. They're simpler, type-safe, and progressively enhanced.

## Deployment

Deploy to Vercel with automatic CI/CD. Configure environment variables, set up a production database, and monitor performance.

## Key Takeaways

- Server Components reduce client-side JavaScript
- Server Actions simplify data mutations
- The App Router provides intuitive nested layouts
- Partial prerendering gives you the best of static and dynamic
    `,
  },
  {
    slug: "python-automation-scripts",
    title: "5 Python Automation Scripts You Need",
    tag: "Python",
    date: "Jan 2026",
    excerpt: "Save hours every week with these practical Python automation scripts for developers.",
    readTime: "6 min read",
    content: `
Automation is a superpower. Here are 5 Python scripts that will save you hours of repetitive work every week.

## 1. File Organizer

Automatically sort files in your Downloads folder by type (images, documents, videos, code) into organized subfolders.

## 2. Email Report Generator

Pull data from your database, generate a formatted HTML report, and email it to stakeholders — all on a scheduled cron job.

## 3. Git Repository Backup

Clone all your GitHub repositories locally with a single script. Great for keeping offline backups of your work.

## 4. Web Scraper for Job Listings

Scrape job boards for relevant positions, filter by keywords and location, and send yourself a daily digest.

## 5. Database Migration Helper

Compare two database schemas and generate the SQL migration scripts needed to sync them.

## Getting Started

Each script is under 50 lines of Python. Install the required packages, configure your settings, and run. It's that simple.

Save time. Automate the boring stuff. Focus on what matters.
    `,
  },
  {
    slug: "free-ai-tools-developers",
    title: "The Best Free AI Tools for Developers",
    tag: "AI Tools",
    date: "Jan 2026",
    excerpt: "A curated list of the best free AI tools that every developer should know about in 2026.",
    readTime: "5 min read",
    content: `
The AI tool landscape is expanding rapidly. Here are the best free tools every developer should have in their toolkit.

## Code Assistants

- **GitHub Copilot Free Tier**: AI pair programming right in your editor
- **Codeium**: Free alternative with support for 70+ languages
- **Cursor**: AI-first code editor with powerful autocomplete

## Design & UI

- **v0 by Vercel**: Generate UI components from text descriptions
- **Galileo AI**: Create UI designs from natural language prompts

## Productivity

- **Notion AI**: Smart writing and summarization built into Notion
- **Otter.ai**: Real-time meeting transcription and summaries
- **Perplexity**: AI-powered research assistant

## DevOps & Testing

- **Sweep AI**: Automated bug fixes and feature implementations via GitHub issues
- **Mintlify**: AI-powered documentation generation

## Learning

- **ChatGPT**: Learn any concept with personalized explanations
- **Phind**: Developer-focused AI search engine

## Conclusion

These tools are free to start and can dramatically boost your productivity. Try them out and find what works best for your workflow!
    `,
  },
];
