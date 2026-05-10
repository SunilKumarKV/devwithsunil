import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await api.sendContactMessage(form);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 429) {
          toast.error("Too many requests. Please try again in an hour.");
        } else {
          toast.error(
            "Unable to send your message right now. Please try again later.",
          );
        }
      } else {
        toast.error(
          "Unable to connect. Please check your internet connection and try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-primary/30 bg-card p-8 text-center"
      >
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 font-mono text-lg font-semibold">Message Sent!</h3>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", message: "" });
          }}
          className="mt-4 text-xs text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-xs font-mono text-muted-foreground"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          maxLength={100}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-border focus:border-primary focus:ring-primary"
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <span
            id="name-error"
            className="mt-1 block text-xs text-red-500"
            role="alert"
          >
            {errors.name}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-mono text-muted-foreground"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          maxLength={255}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-border focus:border-primary focus:ring-primary"
          }`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <span
            id="email-error"
            className="mt-1 block text-xs text-red-500"
            role="alert"
          >
            {errors.email}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-mono text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          maxLength={1000}
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors resize-none ${
            errors.message
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-border focus:border-primary focus:ring-primary"
          }`}
          placeholder="How can I help you?"
        />
        {errors.message && (
          <span
            id="message-error"
            className="mt-1 block text-xs text-red-500"
            role="alert"
          >
            {errors.message}
          </span>
        )}
      </div>
      <Button
        variant="neon"
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Sending...
          </span>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
