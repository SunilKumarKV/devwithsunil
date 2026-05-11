import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const ProjectsSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: api.getProjects,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const projects = data?.projects ?? [];

  return (
    <section id="projects" className="py-24 bg-card/50">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold sm:text-4xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground">
            {isError ? "Unable to load projects right now. Please check your API/database connection." : "Projects loaded from your production database."}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => <div key={item} className="h-56 rounded-xl border border-border/50 bg-card p-6 animate-pulse" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border/70 bg-card/60 p-8 text-center">
            <h3 className="font-mono text-base font-semibold">No projects added yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Add your real projects from the admin dashboard and they will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group flex flex-col rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:-translate-y-1">
                <h3 className="mb-2 font-mono text-base font-semibold">{p.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.techStack.map((t) => <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">{t}</span>)}
                </div>
                <div className="flex gap-3">
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"><Github className="h-4 w-4" /> Code</a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"><ExternalLink className="h-4 w-4" /> Live</a>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
