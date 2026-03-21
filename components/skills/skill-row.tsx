import React from "react"

import { cn } from "@/lib/utils"
import LineProgress from "./line-progress"
import { proficiencyConfig, type Skill } from "./types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function SkillRow({ skill }: { skill: Skill }) {
  const SkillIcon = skill.icon
  const prof = proficiencyConfig[skill.level]

  return (
    <li className="py-2.5 px-2 rounded-md hover:bg-muted/50 transition-colors duration-150 group">
      <div className="flex items-center gap-2.5 mb-1.5">
        <SkillIcon className="h-4 w-4 shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors duration-150" />
        <span className="text-sm font-medium">{skill.name}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={cn("ml-auto text-[10px] font-medium cursor-default", proficiencyConfig[skill.level].labelClass)}>
              {skill.level}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[200px] text-center text-xs leading-snug">
            <span className="font-semibold">{skill.level}</span>{" — "}{prof.tooltip}
          </TooltipContent>
        </Tooltip>
      </div>
      <LineProgress percent={skill.percent} />
    </li>
  )
}

export default React.memo(SkillRow)