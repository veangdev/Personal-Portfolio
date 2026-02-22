"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Calendar, ArrowRight } from "lucide-react";

const experienceData = [
  {
    role: "Full Stack Developer",
    company: "Realwat INC",
    duration: "Feb 2023 – Present",
    current: true,
    bullets: [
      "Built a Student Bus Management System with pixel-perfect reusable UI components, real-time CDC using Debezium + Kafka, and a GPS tracking microservice with Node.js, Zonar API, and PostgreSQL.",
      "Developed an auto-saving text editor for a Mental Health Web App to enhance UX and prevent data loss.",
      "Engineered a price comparison system across stores with normalized pricing APIs and secure Stripe payment integration for a Request Proposal product.",
      "Maintained and refactored a legacy Shopify e-commerce platform — fixed bugs, improved stability, and added new features with full backward compatibility.",
      "Designed and built an Aircraft Operations Dashboard: created ERD from requirements, implemented interactive charts and graphs for real-time and historical data visualization.",
      "Built an automated PDF data pipeline to extract, transform, and store structured data in a relational DB for downstream ML workflows.",
      "Implemented a scalable i18n multilingual system supporting multiple languages with consistent UI switching and easy future extensibility.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Realwat INC",
    duration: "Oct 2022 – Feb 2023",
    current: false,
    bullets: [
      "Completed intensive training in JavaScript, Node.js, React.js, React Native, Angular.js, Next.js, PostgreSQL, Python, and Django.",
      "Built a full-stack to-do list application as a practical learning project.",
      "Developed a SAAS Starter Kit boilerplate covering authentication, routing, and database integration for full-stack development.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A track record of delivering full-stack solutions — from real-time systems and data
              pipelines to payment integrations and legacy refactors.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />

            <div className="space-y-10">
              {experienceData.map((exp, index) => (
                <div key={index} className="relative flex gap-8">

                  {/* Timeline dot */}
                  <div className="relative z-10 mt-1.5 flex shrink-0 items-start">
                    {exp.current && (
                      <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-primary opacity-50" />
                    )}
                    <span
                      className={`relative inline-flex h-4 w-4 rounded-full border-2 border-primary ${
                        exp.current ? "bg-primary" : "bg-background"
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <Card className="flex-1 border-border/50 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">

                      {/* Role + Badge */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <h3 className="text-xl font-bold leading-tight">{exp.role}</h3>
                        {exp.current && (
                          <Badge className="shrink-0 bg-primary/10 text-primary border border-primary/25 hover:bg-primary/15">
                            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                            Current
                          </Badge>
                        )}
                      </div>

                      {/* Company & Duration */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground mb-5">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-primary/70" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-primary/70" />
                          {exp.duration}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="mb-5 border-t border-border/50" />

                      {/* Bullet points */}
                      <ul className="space-y-3">
                        {exp.bullets.map((point, i) => (
                          <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>

                    </CardContent>
                  </Card>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
