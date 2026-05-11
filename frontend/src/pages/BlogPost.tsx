import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => api.getBlogPost(slug ?? ""),
    enabled: Boolean(slug),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const post = data?.post;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-24">
          <div className="h-6 w-48 rounded-full bg-muted animate-pulse" />
          <div className="h-5 w-64 rounded-full bg-muted animate-pulse" />
          <div className="h-48 w-full max-w-2xl rounded-3xl bg-muted animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container flex min-h-[60vh] flex-col items-center justify-center pt-24">
          <h1 className="mb-4 font-mono text-3xl font-bold">Post Not Found</h1>
          <p className="mb-6 text-muted-foreground">This article is not available yet.</p>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <article className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/#blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Articles
            </Link>

            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
                <Tag className="h-3 w-3" /> {post.tag}
              </span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
            </div>

            <h1 className="mb-8 font-mono text-3xl font-bold leading-tight sm:text-4xl">
              {post.title}
            </h1>

            <div className="prose prose-invert prose-sm max-w-none prose-headings:font-mono prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-primary">
              {post.content.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("## "))
                  return <h2 key={i} className="mt-8 mb-4 text-xl font-bold">{trimmed.slice(3)}</h2>;
                if (trimmed.startsWith("- **"))
                  return (
                    <li key={i} className="mb-2 list-disc ml-5">
                      <strong>{trimmed.match(/\*\*(.*?)\*\*/)?.[1]}</strong>
                      {trimmed.replace(/- \*\*.*?\*\*:?/, "")}
                    </li>
                  );
                if (trimmed.startsWith("- "))
                  return <li key={i} className="mb-2 list-disc ml-5">{trimmed.slice(2)}</li>;
                return <p key={i} className="mb-4 leading-relaxed">{trimmed}</p>;
              })}
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BlogPost;
