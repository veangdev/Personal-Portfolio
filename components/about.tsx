"use client"

import { Code2, Sparkles, Activity, Server, MapPin, GraduationCap, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getYearsOfExperience } from "@/lib/utils"

export default function About() {
  const stats = [
    { value: `${getYearsOfExperience()}+`, label: "Years Experience" },
    { value: "10+",                         label: "Projects Delivered" },
    { value: "2",                           label: "Degrees Earned" },
    { value: "2",                           label: "Languages" },
  ]

  // Cards reflect real work from the resume — not generic filler
  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Engineering",
      description:
        "React, Next.js, NestJS, Node.js, PostgreSQL, GraphQL — end-to-end ownership from API design to polished UI.",
    },
    {
      icon: Activity,
      title: "Real-time Systems",
      description:
        "GPS tracking pipelines, CDC with Debezium & Kafka, and Zonar API integrations built for production scale.",
    },
    {
      icon: Sparkles,
      title: "AI & Automation",
      description:
        "AI agents with Flowise, LlamaExtract, OpenClaw, and Claude — turning intelligent workflows into shipped features.",
    },
    {
      icon: Server,
      title: "Cloud & DevOps",
      description:
        "Docker, CI/CD, GCP, Firebase — reliable delivery pipelines that keep production healthy and deployments fast.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          {/* ── Section header ────────────────────────────────────────────── */}
          <div className="text-center mb-14 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Full-Stack Developer based in Phnom Penh — building real-time systems,
              AI integrations, and production-grade web apps with{" "}
              {getYearsOfExperience()} years of hands-on experience.
            </p>
          </div>

          {/* ── Stats bar ─────────────────────────────────────────────────── */}
          {/* grid-cols separated by 1 px borders using bg-border as the grid gap */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-14 border border-border">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-8 px-4 bg-background hover:bg-primary/5 transition-colors duration-200"
              >
                <span className="text-3xl font-bold text-primary">{stat.value}</span>
                <span className="text-xs text-muted-foreground mt-1 text-center tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Main two-column block ──────────────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">

            {/* Left — narrative + quick facts */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-1 h-7 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <h3 className="text-2xl font-bold">My Journey</h3>
              </div>

              <p className="text-muted-foreground leading-relaxed pl-4">
                I started at{" "}
                <span className="text-foreground font-medium">
                  Passerelles Numériques Cambodia
                </span>
                , earning an Associate Degree in Web Development and completing an
                intensive internship where I shipped full-stack projects using
                JavaScript, React.js, Node.js, and Python.
              </p>

              <p className="text-muted-foreground leading-relaxed pl-4">
                Since{" "}
                <span className="text-foreground font-medium">October 2022</span> I
                have been a Full Stack Developer at{" "}
                <span className="text-foreground font-medium">ZINation Cambodia</span>{" "}
                — leading end-to-end development across real-time GPS systems, AI
                agent integrations, automated data pipelines, Stripe payments, and
                multilingual web apps.
              </p>

              <p className="text-muted-foreground leading-relaxed pl-4">
                Currently deepening my foundation with a{" "}
                <span className="text-foreground font-medium">
                  Bachelor's in Computer Science
                </span>{" "}
                at Asia Euro University (2024 – 2026) while continuing to ship in
                production.
              </p>

              {/* Quick-fact pills */}
              <div className="pl-4 pt-1 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Phnom Penh, Cambodia</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>B.Sc Computer Science · Asia Euro University (in progress)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Full Stack Developer · ZINation Cambodia · Oct 2022 – Present</span>
                </div>
              </div>
            </div>

            {/* Right — highlight cards */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <Card
                  key={index}
                  className="group border-border/50 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-none hover:shadow-md hover:shadow-primary/5"
                >
                  <CardContent className="p-5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors duration-200">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Availability ──────────────────────────────────────────────── */}
          <div className="grid sm:grid-cols-2 gap-4">

            {/* Freelance */}
            <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-primary/5 px-5 py-4 hover:border-primary/40 transition-colors duration-200">
              <div className="mt-0.5 shrink-0 rounded-lg bg-primary/15 p-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="14" x="2" y="7" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">Available for Freelance</p>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-green-500">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Open
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Up to{" "}
                  <span className="font-medium text-foreground">4 hours / day</span>{" "}
                  for freelance projects — web apps, full-stack features, API
                  integrations, and more.
                </p>
              </div>
            </div>

            {/* Remote Job */}
            <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-primary/5 px-5 py-4 hover:border-primary/40 transition-colors duration-200">
              <div className="mt-0.5 shrink-0 rounded-lg bg-primary/15 p-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">Open to Remote Jobs</p>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-green-500">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Open
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Actively looking for{" "}
                  <span className="font-medium text-foreground">
                    full-time or part-time remote
                  </span>{" "}
                  Full-Stack Developer roles with collaborative, product-focused teams.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
