import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Community Spotlight",
    role: "Feedback coming soon",
    text: "Real learner reviews and community success stories are being prepared for this section.",
    stars: 5,
  },
  {
    name: "Course Highlights",
    role: "More details soon",
    text: "This section will showcase honest feedback from developers who are building with DevWithSunil.",
    stars: 5,
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-mono text-3xl font-bold sm:text-4xl">
          Community <span className="text-gradient">Love</span>
        </h2>
        <p className="text-muted-foreground">What learners say about DevWithSunil</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30"
          >
            <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/10" />
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
            <div>
              <p className="font-mono text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
