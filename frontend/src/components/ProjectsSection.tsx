import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    name: "AI Resume Builder",
    desc: "Demo project concept. Full details and live preview are coming soon.",
    tech: ["React", "OpenAI", "Tailwind"],
    github: "https://github.com/SunilKumarKV",
    live: "https://devwithsunil.vercel.app",
  },
  {
    name: "Code Snippet Manager",
    desc: "Planning a productivity tool for developers. More project details will be added soon.",
    tech: ["Next.js", "Prisma", "TypeScript"],
    github: "https://github.com/SunilKumarKV",
    live: "https://devwithsunil.vercel.app",
  },
  {
    name: "Dev Portfolio Generator",
    desc: "A portfolio generator concept for makers. Real links will be published shortly.",
    tech: ["Python", "FastAPI", "React"],
    github: "https://github.com/SunilKumarKV",
    live: "https://devwithsunil.vercel.app",
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
        <p className="text-muted-foreground">Open-source projects you can learn from and contribute to</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30"
          >
            <h3 className="mb-2 font-mono text-base font-semibold">{p.name}</h3>
            <p className="mb-4 flex-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
                <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" /> Code
              </a>
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" /> Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
