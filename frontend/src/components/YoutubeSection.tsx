import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const YoutubeSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["youtubeVideos"],
    queryFn: api.getYoutubeVideos,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const videos = data?.videos ?? [];

  return (
    <section id="youtube" className="py-24 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-mono text-3xl font-bold sm:text-4xl">
            Latest <span className="text-gradient">Videos</span>
          </h2>
          <p className="text-muted-foreground">
            Real YouTube videos loaded from your backend
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-64 rounded-xl border border-border/50 bg-card animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border/70 bg-card/60 p-8 text-center">
            <h3 className="font-mono text-base font-semibold">Unable to load videos</h3>
            <p className="mt-2 text-sm text-muted-foreground">Check the backend API and database connection.</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border/70 bg-card/60 p-8 text-center">
            <Play className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h3 className="font-mono text-base font-semibold">No videos published yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add real YouTube video records in your database. Placeholder cards were removed.
            </p>
            <Button asChild variant="neon" className="mt-5">
              <a href="https://www.youtube.com/@DevWithSunilTech" target="_blank" rel="noopener noreferrer">
                Open Channel <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {videos.map((video, i) => (
              <motion.a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/30"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-full bg-primary p-4 text-primary-foreground">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-mono text-sm font-semibold group-hover:text-primary transition-colors">{video.title}</h3>
                  {video.publishedAt && <p className="text-xs text-muted-foreground">{new Date(video.publishedAt).toLocaleDateString("en-IN")}</p>}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default YoutubeSection;
