# DevWithSunil - AI & Coding Tutorials Website

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ShadCN/UI](https://img.shields.io/badge/ShadCN%2FUI-000000?style=for-the-badge&logo=shadcn&logoColor=white)](https://ui.shadcn.com/)

A modern, responsive personal website and portfolio for DevWithSunil, featuring AI and coding tutorials, project showcases, blog posts, and community resources.

## 🌟 About

DevWithSunil is an educational platform dedicated to simplifying AI tools, coding, and technology for everyone. From beginner-friendly tutorials to real-world projects, we help developers of all levels master modern tech stacks and AI tools.

### ✨ Key Features

- **🎥 YouTube Integration**: Direct links to video tutorials and content
- **📚 Tutorials Section**: Comprehensive coding and AI guides
- **🚀 Projects Showcase**: Real-world project examples and demos
- **📝 Blog**: In-depth articles on AI tools and development
- **💬 Testimonials**: Community feedback and success stories
- **📧 Newsletter**: Stay updated with latest content
- **📱 Responsive Design**: Optimized for all devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast loading
- **🎨 Modern UI**: Beautiful design with Tailwind CSS and ShadCN/UI

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: ShadCN/UI (Radix UI primitives)
- **Routing**: React Router
- **State Management**: React Query for server state
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + Playwright
- **Package Manager**: Bun

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SunilKumarKV/devwithsunil-ai-hub.git
   cd devwithsunil-ai-hub
   ```

2. **Install dependencies**

   ```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Environment setup (optional)**

   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env to customize settings (optional)
   # The app will work with default settings if no .env file is present
   ```

4. **Start the development server**

   ```bash
   # Using Bun
   bun run dev

   # Or using npm
   npm run dev

   # Or using yarn
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to see the website.

### Build for Production

```bash
# Using Bun
bun run build

# Or using npm
npm run build

# Or using yarn
yarn build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN/UI components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Landing hero section
│   ├── AboutSection.tsx # About DevWithSunil
│   ├── YoutubeSection.tsx # YouTube content
│   ├── TutorialsSection.tsx # Coding tutorials
│   ├── ProjectsSection.tsx # Project showcases
│   ├── BlogSection.tsx # Blog posts
│   ├── ContactSection.tsx # Contact form
│   └── Footer.tsx      # Site footer
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   ├── BlogPost.tsx    # Individual blog post
│   └── NotFound.tsx    # 404 page
├── data/               # Static data
│   └── blogPosts.ts    # Blog content
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   ├── api.ts          # API functions
│   └── utils.ts        # Helper functions
└── test/               # Test files
```

## 🧪 Testing

### Unit Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

### E2E Tests

```bash
# Run Playwright tests
npx playwright test

# Run tests with UI
npx playwright test --ui
```

## ✨ Recent Improvements

### 🚀 Performance & PWA

- **PWA Support**: Added web app manifest for installable experience
- **Performance Optimization**: Preconnect tags for YouTube and backend APIs
- **Error Boundary**: Graceful error handling with user-friendly error pages

### 🔒 Security & Quality

- **TypeScript Strict Mode**: Enhanced type safety and code quality
- **Security Headers**: Basic security headers in development
- **Environment Validation**: Runtime checks for required environment variables
- **Improved Error Handling**: Better API error feedback instead of silent failures

### ♿ Accessibility

- **ARIA Labels**: Added proper accessibility labels for interactive elements
- **Form Validation**: Client-side validation with error messages and ARIA attributes
- **Keyboard Navigation**: Improved focus management and screen reader support

### 🧪 Testing & Development

- **Unit Tests**: Basic test coverage for form validation and API functions
- **Environment Configuration**: `.env.example` for easy setup
- **SEO Enhancements**: Sitemap.xml and improved robots.txt

## 🎨 Customization

### Styling

The project uses Tailwind CSS with custom CSS variables for theming. Key files:

- `tailwind.config.ts` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables
- `src/App.css` - Component-specific styles

### Content Management

- **Blog Posts**: Edit `src/data/blogPosts.ts`
- **Projects**: Modify `src/components/ProjectsSection.tsx`
- **Tutorials**: Update `src/components/TutorialsSection.tsx`
- **Testimonials**: Edit `src/components/TestimonialsSection.tsx`

## 📱 Features Overview

### Hero Section

- Animated introduction with call-to-action buttons
- Links to YouTube channel and tutorials

### About Section

- Personal introduction and mission statement
- Key highlights: AI Tools, Full-Stack Dev, Project-Based Learning, Community

### Content Sections

- **YouTube**: Featured videos and channel links
- **Tutorials**: Step-by-step coding guides
- **Projects**: Portfolio of completed work
- **Blog**: Technical articles and insights
- **Testimonials**: Community feedback

### Contact & Community

- Contact form for inquiries
- Newsletter signup
- Social media links

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- UI components from [ShadCN/UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Contact

**DevWithSunil**

- Website: [devwithsunil.com](https://devwithsunil.vercel.app)
- YouTube: [@DevWithSunil](https://www.youtube.com/@DevWithSunilTech)
- Email: devwithsunilyt@gmail.com

---

_Made with ❤️ for the developer community_
