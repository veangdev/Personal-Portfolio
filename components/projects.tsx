"use client"

import { useEffect, useRef, useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import {
  ExternalLink,
  CheckCircle2,
  ArrowUpRight,
  Layers,
} from "lucide-react"

function GitHubSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────────────────

interface Project {
  title: string
  tagline: string
  bullets: string[]
  tech: string[]
  liveUrl?: string
  repoUrl?: string
  image?: string
  featured?: boolean
}

// ─── Data ──────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: "Student Bus Management System",
    tagline: "Real-time tracking & admin platform for student transportation",
    bullets: [
      "Delivered pixel-perfect, customer-defined UI with reusable components",
      "Engineered GPS tracking microservice using Node.js, Zonar API & PostgreSQL",
      "Implemented real-time CDC with Debezium + Kafka for live data sync",
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Kafka", "Tailwind"],
    featured: true,
  },
  {
    title: "Mental Health Web Application",
    tagline: "Supportive platform with seamless content creation",
    bullets: [
      "Built auto-saving rich text editor to prevent data loss and enhance UX",
      "Focused on empathetic, performant UI with accessibility in mind",
    ],
    tech: ["React", "Next.js", "Tailwind", "shadcn/ui"],
  },
  {
    title: "Request Proposal Product",
    tagline: "Cross-store price comparison & secure proposal tool",
    bullets: [
      "Developed normalized pricing aggregation APIs across multiple stores",
      "Integrated Stripe for safe, streamlined payments",
      "Enabled smart comparisons to drive informed purchase decisions",
    ],
    tech: ["Node.js", "Prisma", "PostgreSQL", "Stripe", "React"],
  },
  {
    title: "Legacy E-commerce Platform",
    tagline: "Modernized & stabilized in-house Shopify system",
    bullets: [
      "Refactored legacy codebase for improved maintainability & scalability",
      "Fixed critical production bugs with zero downtime",
      "Ensured fully backward-compatible updates",
    ],
    tech: ["Node.js", "Shopify API", "React"],
  },
  {
    title: "Aircraft Operations Dashboard",
    tagline: "Data visualization & management for aviation ops",
    bullets: [
      "Designed clean ERD from scratch based on business requirements",
      "Built interactive real-time and historical charts & graphs",
      "Full-stack implementation from API to polished UI",
    ],
    tech: ["React", "Next.js", "PostgreSQL", "Recharts"],
  },
  {
    title: "Automated Data Pipeline",
    tagline: "PDF to structured ML-ready data extraction",
    bullets: [
      "Created end-to-end pipeline: extract → clean → transform → store in DB",
      "Prepared structured datasets ready for machine learning workflows",
    ],
    tech: ["Python", "PostgreSQL", "LlamaExtract"],
  },
  {
    title: "Multilingual Support Tool",
    tagline: "Scalable i18n for global accessibility",
    bullets: [
      "Architected extendable multi-language system for future-proof growth",
      "Seamless language switching across the entire frontend",
      "Easy plug-in additions for new locales with minimal effort",
    ],
    tech: ["Next.js", "React", "i18n"],
  },
]

// ─── Tech badge tooltip hints ───────────────────────────────────────────────

const TECH_HINTS: Record<string, string> = {
  Kafka: "Real-time event streaming",
  Debezium: "Change Data Capture (CDC)",
  Stripe: "Payment processing",
  PostgreSQL: "Relational database",
  Prisma: "Type-safe ORM",
  LlamaExtract: "AI-powered PDF extraction",
  "shadcn/ui": "Component library",
  Python: "Data pipeline & ML prep",
}

// ─── Scroll-reveal hook ─────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

// ─── TechBadge ──────────────────────────────────────────────────────────────

function TechBadge({ name }: { name: string }) {
  const hint = TECH_HINTS[name]
  const badge = (
    <Badge
      variant="secondary"
      className="text-[11px] font-medium px-2 py-0.5 rounded-md hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
    >
      {name}
    </Badge>
  )
  if (!hint) return badge
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {hint}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// ─── ProjectCard ────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <Card
        className={cn(
          "group relative flex flex-col h-full overflow-hidden",
          "border-border/50 bg-card",
          "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
          "hover:-translate-y-1.5 transition-all duration-300",
          project.featured && "ring-1 ring-primary/20",
        )}
      >
        {/* Featured pill */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="text-[10px] px-2 py-0.5 font-semibold tracking-wide uppercase">
              Featured
            </Badge>
          </div>
        )}

        {/* Optional screenshot */}
        {project.image && (
          <div className="aspect-video overflow-hidden border-b border-border/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <CardContent className="flex flex-col flex-1 p-5 gap-4">
          {/* Title + tagline */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Layers className="h-3.5 w-3.5 text-primary" />
              </span>
              <h3 className="text-[15px] font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-[38px]">
              {project.tagline}
            </p>
          </div>

          <Separator className="opacity-40" />

          {/* Impact bullets */}
          <ul className="space-y-2 flex-1">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary/60 shrink-0 mt-[1px]" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          {/* Tech row */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </CardContent>

        {/* CTA buttons */}
        {(project.liveUrl || project.repoUrl) && (
          <CardFooter className="px-5 pb-5 pt-0 gap-2">
            {project.liveUrl && (
              <Button size="sm" className="flex-1 gap-1.5 text-xs h-8" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 gap-1.5 text-xs h-8 hover:border-primary/40 hover:text-primary"
                asChild
              >
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <GitHubSvg className="h-3 w-3" />
                  Source
                </a>
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

// ─── Section header ─────────────────────────────────────────────────────────

function SectionHeader() {
  const { ref, visible } = useScrollReveal(0.2)
  return (
    <div
      ref={ref}
      className={cn(
        "text-center space-y-3 transition-all duration-600",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
        <Layers className="h-3 w-3" />
        Selected Work
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Featured{" "}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Projects
        </span>
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
        Real-world systems built at production scale — from real-time data pipelines
        to AI integrations and polished user experiences.
      </p>
    </div>
  )
}

// ─── GitHub CTA ─────────────────────────────────────────────────────────────

function GitHubCTA() {
  const { ref, visible } = useScrollReveal(0.3)
  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-center pt-4 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <Button
        variant="outline"
        size="sm"
        className="gap-2 border-border/60 hover:border-primary/40 hover:text-primary text-muted-foreground"
        asChild
      >
        <a
          href="https://github.com/veangdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubSvg className="h-3.5 w-3.5" />
          More on GitHub
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </Button>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function Projects({ className }: { className?: string }) {
  return (
    <section
      id="projects"
      className={cn("py-20 sm:py-24 bg-background", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        <SectionHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <GitHubCTA />
      </div>
    </section>
  )
}
