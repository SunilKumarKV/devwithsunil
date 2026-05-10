import { motion } from "framer-motion";
import { Brain, Globe, Terminal as TermIcon, FolderGit2 } from "lucide-react";

const categories = [
  { icon: Brain, label: "AI Tools", count: "Curated lessons", desc: "ChatGPT, Midjourney, Claude, Cursor & more", color: "text-neon-purple" },
  { icon: Globe, label: "Web Development", count: "Practical guides", desc: "React, Next.js, Tailwind, full-stack apps", color: "text-primary" },
  { icon: TermIcon, label: "Python", count: "Build-to-learn series", desc: "Automation, scripts, data & AI libraries", color: "text-neon-cyan" },
  { icon: FolderGit2, label: "Projects", count: "Real ideas", desc: "Real-world apps from start to deploy", color: "text-secondary" },
];

const TutorialsSection = () => (
  <section id="tutorials" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-mono text-3xl font-bold sm:text-4xl">
          Tutorial <span className="text-gradient">Categories</span>
        </h2>
        <p className="text-muted-foreground">Structured learning paths for every skill level</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex gap-5 rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 cursor-pointer"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
              <c.icon className={`h-7 w-7 ${c.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-mono text-base font-semibold">{c.label}</h3>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary font-mono">{c.count}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TutorialsSection;
