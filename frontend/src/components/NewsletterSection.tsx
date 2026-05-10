import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.subscribeNewsletter(email);
      setSubscribed(true);
      toast.success("You're subscribed! 🎉");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          toast.error("This email address is already subscribed.");
        } else if (err.status === 429) {
          toast.error("Too many subscriptions. Please try again in an hour.");
        } else {
          toast.error(
            "Unable to subscribe right now. Please try again later.",
          );
        }
      } else {
        toast.error(
          "Unable to connect. Please check your internet connection and try again.",
        );
      }
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg text-center"
        >
          <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4">
            {subscribed ? (
              <CheckCircle className="h-8 w-8 text-primary" />
            ) : (
              <Mail className="h-8 w-8 text-primary" />
            )}
          </div>
          <h2 className="mb-4 font-mono text-3xl font-bold sm:text-4xl">
            Stay <span className="text-gradient">Updated</span>
          </h2>

          {subscribed ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground"
            >
              You're all set! Check your inbox for the latest updates.
            </motion.p>
          ) : (
            <>
              <p className="mb-8 text-muted-foreground">
                Get the latest AI tools & coding tutorials delivered to your
                inbox. No spam, ever.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                <Button variant="neon" type="submit" disabled={loading}>
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
