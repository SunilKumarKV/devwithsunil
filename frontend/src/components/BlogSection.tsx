import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const BlogSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => api.getBlogPosts(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const posts = data?.posts ?? [];
  const fallbackMessage = isError
    ? "Unable to load articles right now. Please check the API/database connection."
    : "Real tutorials and articles loaded from your production database";

  return (
  <section id="blog" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-mono text-3xl font-bold sm:text-4xl">
          Latest <span className="text-gradient">Articles</span>
        </h2>
        <p className="text-muted-foreground">{fallbackMessage}</p>
      </motion.div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((index) => (
            <div key={index} className="rounded-xl border border-border/50 bg-card p-6 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border/70 bg-card/60 p-8 text-center">
          <h3 className="font-mono text-base font-semibold">No articles published yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">Published posts are loading from the backend. If this appears after adding a blog, check VITE_API_URL and redeploy the latest frontend build.</p>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl space-y-4">
          {posts.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${p.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">{p.tag}</span>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                  <h3 className="font-mono text-sm font-semibold truncate group-hover:text-primary transition-colors">{p.title}</h3>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </section>
  );
};

export default BlogSection;
