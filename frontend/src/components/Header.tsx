import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Videos", href: "#youtube" },
  { label: "Tutorials", href: "#tutorials" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-lg font-bold"
        >
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-gradient">DevWithSunil</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <Button variant="neon" size="sm" className="ml-3" asChild>
            <a
              href="https://www.youtube.com/@DevWithSunilTech"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe
            </a>
          </Button>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <Button variant="neon" size="sm" className="mt-2" asChild>
              <a
                href="https://www.youtube.com/@DevWithSunilTech"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
