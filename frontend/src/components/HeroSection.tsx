import { motion } from "framer-motion";
import { Play, BookOpen, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
    {/* Background effects */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] animate-glow" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[120px] animate-glow" style={{ animationDelay: "1.5s" }} />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(210_100%_60%/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(210_100%_60%/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>

    <div className="container relative z-10">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary"
        >
          <Terminal className="h-4 w-4" />
          <span className="font-mono">AI & Code tutorials every week</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Learn AI & Coding with{" "}
          <span className="text-gradient">DevWithSunil</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground"
        >
          Simplifying AI tools, coding, and tech for everyone. From beginner-friendly tutorials to real-world projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="neon" size="lg" asChild>
            <a href="https://youtube.com/@DevWithSunil" target="_blank" rel="noopener noreferrer">
              <Play className="h-5 w-5" /> Watch on YouTube
            </a>
          </Button>
          <Button variant="neon-outline" size="lg" asChild>
            <a href="#tutorials">
              <BookOpen className="h-5 w-5" /> Explore Tutorials
            </a>
          </Button>
        </motion.div>

        {/* Code snippet decoration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-16 max-w-md code-bg rounded-lg p-4 text-left text-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-accent/60" />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
          </div>
          <code className="text-muted-foreground">
            <span className="text-secondary">const</span>{" "}
            <span className="text-primary">learn</span> ={" "}
            <span className="text-secondary">async</span> () =&gt; {"{"}<br />
            &nbsp;&nbsp;<span className="text-secondary">await</span>{" "}
            <span className="text-neon-cyan">ai</span>.<span className="text-primary">master</span>(<span className="text-primary/70">"skills"</span>);<br />
            {"}"};
          </code>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row"
        >
          <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Community updates weekly</span>
          <span className="flex items-center gap-2"><Play className="h-4 w-4 text-secondary" /> Tutorials released regularly</span>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
