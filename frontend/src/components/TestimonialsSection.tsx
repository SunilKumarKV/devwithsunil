import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
          Community <span className="text-gradient">Proof</span>
        </h2>
        <p className="text-muted-foreground">This section is ready for real learner feedback only</p>
      </motion.div>

      <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border/70 bg-card/60 p-8 text-center">
        <Quote className="mx-auto mb-4 h-10 w-10 text-primary" />
        <h3 className="font-mono text-base font-semibold">No testimonials added yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Fake reviews were removed. Add testimonials only after you collect real feedback from learners or clients.
        </p>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
