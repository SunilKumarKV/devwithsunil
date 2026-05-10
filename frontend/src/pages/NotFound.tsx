import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-1/3 bottom-1/3 h-96 w-96 rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center px-6"
      >
        <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4">
          <Terminal className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-2 font-mono text-7xl font-bold text-gradient">404</h1>
        <p className="mb-2 font-mono text-xl font-semibold">Page Not Found</p>
        <p className="mb-8 text-muted-foreground max-w-md mx-auto">
          The page{" "}
          <code className="text-primary font-mono text-sm">
            {location.pathname}
          </code>{" "}
          doesn't exist.
        </p>

        <div className="code-bg rounded-lg p-4 mb-8 max-w-xs mx-auto text-left text-sm">
          <code className="text-muted-foreground">
            <span className="text-destructive">Error</span>: route{" "}
            <span className="text-primary">"{location.pathname}"</span>
            <br />
            &nbsp;&nbsp;<span className="text-secondary">not found</span>
          </code>
        </div>

        <Button variant="neon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
