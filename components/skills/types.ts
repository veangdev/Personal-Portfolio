export type SkillIcon = React.ComponentType<any>

export type Proficiency = "Advanced" | "Proficient" | "Intermediate" | "Beginner"

export interface Skill {
  name: string
  icon: SkillIcon
  level: Proficiency
  percent: number
}

export interface SoftSkill {
  name: string
  icon: SkillIcon
}

export interface SkillCategory {
  title: string
  icon: SkillIcon
  skills: Skill[]
}

export const COLLAPSED_COUNT = 4

export const proficiencyConfig: Record<
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
