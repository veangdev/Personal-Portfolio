"use client";

import { Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">

          {/* Copyright */}
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            © {currentYear} Kroh Veang — Built with
            <Heart className="h-3 w-3 text-red-400 fill-current shrink-0" />
            &amp; lots of coffee
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors duration-200"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>

        </div>
      </div>
    </footer>
  );
}
