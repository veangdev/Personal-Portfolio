"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { getYearsOfExperience } from "@/lib/utils";
import TypewriterTextAnimation from "./text-animation";
import { SOCIAL_LINKS } from "@/constants/informatin";


export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-image",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.8"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-20 pb-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="hero-title text-5xl md:text-7xl font-bold leading-tight">
                Hi, I'm <span className="gradient-text">Veang Kroh</span>
              </h1>

              <h2 className="hero-subtitle text-2xl md:text-3xl text-muted-foreground font-medium">
                <TypewriterTextAnimation />
              </h2>

              <p className="hero-description text-lg text-muted-foreground max-w-6xl leading-relaxed">
                Full-Stack Developer with {getYearsOfExperience()} years of experience building
                scalable web platforms and intelligent automation solutions. I
                help organizations solve complex operational challenges —
                including implementing AI chatbot systems that improve
                efficiency and customer engagement.
              </p>
              <p className="hero-description text-lg text-muted-foreground max-w-6xl leading-relaxed">
                Focused on performance, clean architecture, and long-term
                scalability, I build future-ready systems aligned with evolving
                technology trends.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="btn-masculine text-lg px-8 py-6"
                onClick={scrollToProjects}
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="btn-masculine text-lg px-8 py-6 bg-transparent"
                onClick={scrollToContact}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-5">
              {Object.values(SOCIAL_LINKS).map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Profile Image */}
          <div className="hero-image flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl">
                <Image
                  src="assets/handsome.jpg"
                  alt="Kroh Veang - Full Stack Developer"
                  width={400}
                  height={400}
                  // className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-chart-1/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
