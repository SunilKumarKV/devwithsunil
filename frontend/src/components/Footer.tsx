import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-8">
    <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
      <Link to="/" className="flex items-center gap-2 font-mono text-sm font-semibold">
        <Code2 className="h-5 w-5 text-primary" />
        <span className="text-gradient">DevWithSunil</span>
      </Link>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} DevWithSunil. Built with passion & code.
      </p>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <a href="#tutorials" className="hover:text-primary transition-colors">Tutorials</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
