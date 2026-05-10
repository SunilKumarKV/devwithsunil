import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  {
    id: "YOUR_VIDEO_ID_1",
    title: "AI tutorial details coming soon",
    views: "Coming soon",
  },
  {
    id: "YOUR_VIDEO_ID_2",
    title: "AI tools walkthrough coming soon",
    views: "Coming soon",
  },
  {
    id: "YOUR_VIDEO_ID_3",
    title: "Full stack tutorial coming soon",
    views: "Coming soon",
  },
];

const YoutubeSection = () => (
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
          Tutorials, AI tools, and coding walkthroughs
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {videos.map((v, i) => {
          const videoHref = v.id.startsWith("YOUR_VIDEO_ID")
            ? "https://youtube.com/@DevWithSunil"
            : `https://www.youtube.com/watch?v=${v.id}`;

          return (
            <motion.a
              key={i}
              href={videoHref}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/30"
            >
              <div className="relative aspect-video bg-muted">
                <img
                  src={
                    v.id.startsWith("YOUR_VIDEO_ID")
                      ? "/placeholder.svg"
                      : `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`
                  }
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary glow-blue">
                    <Play className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-mono text-sm font-semibold line-clamp-2">
                  {v.title}
                </h3>
                <p className="text-xs text-muted-foreground">{v.views}</p>
              </div>
            </motion.a>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Button variant="neon-outline" asChild>
          <a
            href="https://youtube.com/@DevWithSunil"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Videos <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default YoutubeSection;
