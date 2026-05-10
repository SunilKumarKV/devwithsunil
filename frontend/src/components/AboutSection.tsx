import { motion } from "framer-motion";
import { Code2, Brain, Rocket, Users } from "lucide-react";

const highlights = [
  { icon: Brain, label: "AI Tools Expert", desc: "Breaking down complex AI tools into simple tutorials" },
  { icon: Code2, label: "Full-Stack Dev", desc: "Building real projects with modern tech stacks" },
  { icon: Rocket, label: "Project-Based", desc: "Learn by building, not just watching" },
  { icon: Users, label: "Community", desc: "Growing community of developers worldwide" },
];

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 font-mono text-3xl font-bold sm:text-4xl"
        >
          About <span className="text-gradient">DevWithSunil</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-16 text-lg text-muted-foreground"
        >
          Hey! I'm Sunil — a developer, educator, and AI enthusiast. I create content that helps
          beginners and intermediate developers understand AI tools, build real-world projects,
          and level up their coding skills. My goal is to make tech accessible to everyone.
        </motion.p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:glow-blue"
          >
            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
              <h.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-mono text-sm font-semibold">{h.label}</h3>
            <p className="text-sm text-muted-foreground">{h.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
