"use client"

import { Code2, Rocket, Users, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getYearsOfExperience } from "@/lib/utils"

export default function About() {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for speed and exceptional user experience",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with teams to deliver outstanding results",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Staying ahead with the latest technologies and best practices",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm a motivated Full-Stack Developer with {getYearsOfExperience()} years of hands-on experience building scalable web
              applications and writing clean, efficient code.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                I started my journey at Passerelles Numériques Cambodia, earning an Associate Degree in Web Development
                and completing an intensive internship where I built full-stack projects — including a SAAS starter kit —
                using JavaScript, React.js, Node.js, and Python. Since February 2023 I've been working as a Full Stack
                Developer, delivering production systems across real-time GPS tracking, automated data pipelines,
                Stripe-integrated payments, Shopify legacy refactors, and multilingual web apps.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in writing code that is not only functional but also maintainable, performant, and scalable.
                I'm currently pursuing a Bachelor's Degree in Computer Science at Asia Euro University while continuing
                to grow as an engineer and team contributor.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Problem Solver
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Team Player
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Continuous Learner
                </span>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-6">
                {highlights.map((item, index) => (
                  <Card
                    key={index}
                    className="border-border/50 hover:border-primary/50 transition-colors duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="grid sm:grid-cols-2 gap-4">

            {/* Freelance */}
            <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-primary/5 px-5 py-4 hover:border-primary/40 transition-colors duration-200">
              <div className="mt-0.5 shrink-0 rounded-lg bg-primary/15 p-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
                  Up to <span className="font-medium text-foreground">4 hours / day</span> for freelance projects —
                  web apps, full-stack features, API integrations, and more.
                </p>
              </div>
            </div>

            {/* Remote Job */}
            <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-primary/5 px-5 py-4 hover:border-primary/40 transition-colors duration-200">
              <div className="mt-0.5 shrink-0 rounded-lg bg-primary/15 p-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
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
                  Actively looking for <span className="font-medium text-foreground">full-time or part-time remote</span> Full-Stack
                  Developer roles with collaborative, product-focused teams.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
