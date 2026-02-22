"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Code2, Server, Terminal, Users, Zap, Target, HeartHandshake, Layers, Key, Database, PenLine, FileSearch, GitMerge, ChevronDown } from "lucide-react"
import {
  SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiMui, SiAntdesign,
  SiNodedotjs, SiNestjs, SiPrisma, SiPostgresql, SiGraphql, SiApachekafka,
  SiPython, SiFirebase,
  SiGit, SiDocker, SiLinux, SiJira,
} from "react-icons/si"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type Proficiency = "Advanced" | "Proficient" | "Intermediate" | "Beginner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SkillIcon = React.ComponentType<any>

interface Skill {
  name: string
  icon: SkillIcon
  level: Proficiency
  percent: number  // mock — update these to your own values
}

interface SoftSkill {
  name: string
  icon: SkillIcon
}

interface SkillCategory {
  title: string
  icon: SkillIcon
  skills: Skill[]
}

// ─── Proficiency config ───────────────────────────────────────────────────────

const proficiencyConfig: Record<
  Proficiency,
  { dot: string; labelClass: string; tooltip: string }
> = {
  Advanced: {
    dot: "bg-emerald-400 dark:bg-emerald-500",
    labelClass: "text-emerald-700 dark:text-emerald-400",
    tooltip: "Used regularly in production — 2–3+ years of hands-on experience.",
  },
  Proficient: {
    dot: "bg-blue-400 dark:bg-blue-500",
    labelClass: "text-blue-700 dark:text-blue-400",
    tooltip: "Comfortable across most use cases — 1–2 years of real-world usage.",
  },
  Intermediate: {
    dot: "bg-amber-400 dark:bg-amber-500",
    labelClass: "text-amber-700 dark:text-amber-400",
    tooltip: "Working knowledge — able to build real features independently.",
  },
  Beginner: {
    dot: "bg-slate-400 dark:bg-slate-500",
    labelClass: "text-slate-500 dark:text-slate-400",
    tooltip: "Familiar with fundamentals — actively building deeper proficiency.",
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React.js",     icon: SiReact,      level: "Advanced",     percent: 85 },
      { name: "Next.js",      icon: SiNextdotjs,  level: "Advanced",     percent: 82 },
      { name: "JavaScript",   icon: SiJavascript, level: "Advanced",     percent: 88 },
      { name: "Tailwind CSS", icon: SiTailwindcss,level: "Proficient",   percent: 75 },
      { name: "MUI",          icon: SiMui,        level: "Proficient",   percent: 72 },
      { name: "Shadcn/ui",    icon: Layers,       level: "Proficient",   percent: 70 },
      { name: "Ant Design",   icon: SiAntdesign,  level: "Intermediate", percent: 58 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js",     icon: SiNodedotjs,   level: "Advanced",     percent: 83 },
      { name: "NestJS",      icon: SiNestjs,      level: "Proficient",   percent: 74 },
      { name: "Prisma",      icon: SiPrisma,      level: "Proficient",   percent: 73 },
      { name: "PostgreSQL",  icon: SiPostgresql,  level: "Proficient",   percent: 73 },
      { name: "GraphQL",     icon: SiGraphql,     level: "Intermediate", percent: 62 },
      { name: "Kafka",       icon: SiApachekafka, level: "Intermediate", percent: 58 },
      { name: "Python",      icon: SiPython,      level: "Intermediate", percent: 60 },
      { name: "TypeORM",     icon: Database,      level: "Intermediate", percent: 63 },
      { name: "Keystone.js", icon: Key,           level: "Intermediate", percent: 55 },
      { name: "Firebase",    icon: SiFirebase,    level: "Intermediate", percent: 60 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    skills: [
      { name: "Git",             icon: SiGit,     level: "Advanced",     percent: 85 },
      { name: "Linux CLI",       icon: SiLinux,   level: "Proficient",   percent: 73 },
      { name: "Jira",            icon: SiJira,    level: "Proficient",   percent: 75 },
      { name: "Draw.io",         icon: PenLine,   level: "Proficient",   percent: 70 },
      { name: "Docker",          icon: SiDocker,  level: "Intermediate", percent: 60 },
      { name: "CI/CD Pipelines", icon: GitMerge,  level: "Beginner",     percent: 35 },
      { name: "LlamaExtract",    icon: FileSearch,level: "Beginner",     percent: 30 },
    ],
  },
]

const softSkills: SoftSkill[] = [
  { name: "Quick Learner",               icon: Zap            },
  { name: "Effective Team Collaborator", icon: HeartHandshake },
  { name: "High Achievement Drive",      icon: Target         },
]

// ─── Circle progress indicator ────────────────────────────────────────────────

function CircleProgress({ percent }: { percent: number }) {
  const size = 52
  const strokeWidth = 3.5
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  const arcClass =
    percent >= 80 ? "stroke-emerald-500 dark:stroke-emerald-400" :
    percent >= 60 ? "stroke-blue-500 dark:stroke-blue-400" :
    percent >= 40 ? "stroke-amber-500 dark:stroke-amber-400" :
                   "stroke-slate-400 dark:stroke-slate-500"

  const textClass =
    percent >= 80 ? "text-emerald-700 dark:text-emerald-400" :
    percent >= 60 ? "text-blue-700 dark:text-blue-400" :
    percent >= 40 ? "text-amber-700 dark:text-amber-400" :
                   "text-slate-500 dark:text-slate-400"

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" strokeWidth={strokeWidth}
          className="stroke-border"
        />
        {/* Arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-700", arcClass)}
        />
      </svg>
      <span className={cn("absolute inset-0 flex items-center justify-center text-[10px] font-bold", textClass)}>
        {percent}%
      </span>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const COLLAPSED_COUNT = 5

export default function Skills({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggle = (title: string) =>
    setExpanded(prev => ({ ...prev, [title]: !prev[title] }))

  return (
    <TooltipProvider delayDuration={300}>
      <section id="skills" className={cn("py-20", className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Section Header */}
            <div className="text-center mb-12 fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Technical <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A curated toolkit built through years of hands-on production experience
                and continuous learning.
              </p>
            </div>

            {/* Tech Skill Cards — 1 col → 2 col → 3 col, equal height per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category) => {
                const CategoryIcon = category.icon
                const isExpanded = expanded[category.title] ?? false
                const hiddenCount = category.skills.length - COLLAPSED_COUNT
                const hasMore = hiddenCount > 0

                return (
                  <Card
                    key={category.title}
                    className="scale-in border-border/50 hover:border-primary/30 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 flex flex-col"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2.5 text-lg font-bold">
                        <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 shrink-0">
                          <CategoryIcon className="h-4 w-4 text-primary" />
                        </span>
                        {category.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0 flex flex-col flex-1">

                      {/* ── Always-visible first items ── */}
                      <ul className="divide-y divide-border/40">
                        {category.skills.slice(0, COLLAPSED_COUNT).map((skill) => {
                          const SkillIcon = skill.icon
                          const prof = proficiencyConfig[skill.level]
                          return (
                            <li
                              key={skill.name}
                              className="flex items-center justify-between py-2.5 px-2 rounded-md hover:bg-muted/50 transition-colors duration-150 group"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <SkillIcon className="h-4 w-4 shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors duration-150" />
                                <span className="text-sm font-medium truncate">{skill.name}</span>
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="shrink-0 ml-2 cursor-default">
                                    <CircleProgress percent={skill.percent} />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-[200px] text-center text-xs leading-snug">
                                  <span className="font-semibold">{skill.level}</span>{" — "}{prof.tooltip}
                                </TooltipContent>
                              </Tooltip>
                            </li>
                          )
                        })}
                      </ul>

                      {/* ── Animated collapsible extra items ── */}
                      {hasMore && (
                        <div
                          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                          style={{ maxHeight: isExpanded ? `${hiddenCount * 80}px` : "0px" }}
                        >
                          <ul className="divide-y divide-border/40 border-t border-border/40">
                            {category.skills.slice(COLLAPSED_COUNT).map((skill, idx) => {
                              const SkillIcon = skill.icon
                              const prof = proficiencyConfig[skill.level]
                              return (
                                <li
                                  key={skill.name}
                                  className={cn(
                                    "flex items-center justify-between py-2.5 px-2 rounded-md hover:bg-muted/50 transition-colors duration-150 group",
                                    isExpanded && "animate-in fade-in slide-in-from-top-2 duration-300"
                                  )}
                                  style={isExpanded ? { animationDelay: `${150 + idx * 60}ms`, animationFillMode: "both" } : undefined}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <SkillIcon className="h-4 w-4 shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors duration-150" />
                                    <span className="text-sm font-medium truncate">{skill.name}</span>
                                  </div>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="shrink-0 ml-2 cursor-default">
                                        <CircleProgress percent={skill.percent} />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-[200px] text-center text-xs leading-snug">
                                      <span className="font-semibold">{skill.level}</span>{" — "}{prof.tooltip}
                                    </TooltipContent>
                                  </Tooltip>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}

                      {/* ── Toggle button — pinned to bottom ── */}
                      {hasMore && (
                        <button
                          onClick={() => toggle(category.title)}
                          className="mt-auto pt-3 w-full border-t border-border/40 flex items-center justify-center group/btn"
                        >
                          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover/btn:text-primary px-3 py-1.5 rounded-lg group-hover/btn:bg-primary/5 transition-all duration-200">
                            {isExpanded ? "Show less" : `See ${hiddenCount} more`}
                            <ChevronDown
                              className={cn(
                                "h-3.5 w-3.5 transition-transform duration-300",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </span>
                        </button>
                      )}

                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Soft Skills — pill tags */}
            <div className="mt-6 fade-in">
              <Card className="border-border/50 hover:border-primary/30 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2.5 text-lg font-bold">
                    <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 shrink-0">
                      <Users className="h-4 w-4 text-primary" />
                    </span>
                    Soft Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-3">
                    {softSkills.map((skill) => {
                      const SkillIcon = skill.icon
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 text-sm font-medium hover:bg-primary/10 hover:border-primary/30 hover:scale-105 transition-all duration-200 cursor-default"
                        >
                          <SkillIcon className="h-4 w-4 text-primary shrink-0" />
                          {skill.name}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Footer note */}
            <div className="fade-in mt-12 text-center">
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Always learning. Currently exploring{" "}
                <span className="text-primary font-medium">AI/ML integration</span>,{" "}
                <span className="text-primary font-medium">microservice architecture</span>, and{" "}
                <span className="text-primary font-medium">advanced cloud deployments</span>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}
