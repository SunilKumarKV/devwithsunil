import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    name: "ChessPlay",
    desc: "Production-focused chess platform with React, Node.js, Socket.IO, MongoDB, authenticated profiles, multiplayer rooms, and Stockfish AI integration.",
    tech: ["React", "Node.js", "Socket.IO", "MongoDB"],
    github: "https://github.com/SunilKumarKV",
    live: "https://chessplay1.vercel.app/",
  },
  {
    name: "SunilCraft Portfolio",
    desc: "Personal developer portfolio showcasing frontend projects, React UI work, and full-stack learning journey.",
    tech: ["React", "Vite", "Tailwind", "UI/UX"],
    github: "https://github.com/SunilKumarKV",
    live: "https://sunilcraft.vercel.app/",
  },
  {
    name: "DevWithSunil",
    desc: "Learning, YouTube, tutorials, blogs, newsletter, and contact platform powered by a React frontend and Express/PostgreSQL backend.",
    tech: ["React", "Express", "PostgreSQL", "JWT"],
    github: "https://github.com/SunilKumarKV/devwithsunil",
    live: "https://devwithsunil.vercel.app/",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 bg-card/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-mono text-3xl font-bold sm:text-4xl">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground">Projects I’ve designed and developed, focused on performance, usability, and modern web experiences.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:-translate-y-1"
          >
            <h3 className="mb-2 font-mono text-base font-semibold">{p.name}</h3>
            <p className="mb-4 flex-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-4 w-4" /> Code
              </a>
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" /> Live
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
