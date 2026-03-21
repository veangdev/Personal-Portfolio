import React from "react"
import { ChevronDown } from "lucide-react"

import SkillRow  from "./skill-row"
import { COLLAPSED_COUNT, type SkillCategory } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SkillCardProps {
  category: SkillCategory
  onSeeMore: (category: SkillCategory) => void
}

function SkillCard({ category, onSeeMore }: SkillCardProps) {
  const CategoryIcon = category.icon
  const visible = category.skills.slice(0, COLLAPSED_COUNT)
  const hidden = category.skills.slice(COLLAPSED_COUNT)

  return (
    <Card className="scale-in border-border/50 hover:border-primary/30 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2.5 text-lg font-bold">
          <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 shrink-0">
            <CategoryIcon className="h-4 w-4 text-primary" />
          </span>
          {category.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col flex-1">
        <ul className="divide-y divide-border/40 flex-1">
          {visible.map((skill) => (
            <SkillRow key={skill.name} skill={skill} />
          ))}
        </ul>

        {hidden.length > 0 ? (
          <button
            onClick={() => onSeeMore(category)}
            className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-150"
          >
            <ChevronDown className="h-4 w-4" />
            See {hidden.length} more
          </button>
        ) : (
          <div className="mt-4" />
        )}
      </CardContent>
    </Card>
  )
}

export default React.memo(SkillCard)