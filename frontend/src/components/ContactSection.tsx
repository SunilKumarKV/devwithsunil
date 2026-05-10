import { motion } from "framer-motion";
import { Youtube, Github, Linkedin, Twitter } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const socials = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@DevWithSunil", color: "hover:text-red-400" },
  { icon: Github, label: "GitHub", href: "https://github.com/SunilKumarKV", color: "hover:text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sunilkumarkv44", color: "hover:text-blue-400" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/Sunil_KVB", color: "hover:text-sky-400" },
];

const ContactSection = () => (
  <section id="contact" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-mono text-3xl font-bold sm:text-4xl">
          Let's <span className="text-gradient">Connect</span>
        </h2>
        <p className="text-muted-foreground">
          Follow along on social media or send me a message
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <h3 className="mb-4 font-mono text-lg font-semibold">Find me online</h3>
          <div className="grid grid-cols-2 gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 text-muted-foreground transition-all hover:border-primary/30 ${s.color}`}
                aria-label={s.label}
              >
                <s.icon className="h-5 w-5" />
                <span className="text-sm font-mono">{s.label}</span>
              </a>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-border/50 bg-card p-4">
            <p className="text-sm text-muted-foreground">
              📧 For business inquiries:{" "}
              <a
                href="mailto:hello@devwithsunil.com"
                className="text-primary font-mono hover:underline"
              >
                hello@devwithsunil.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactSection;
