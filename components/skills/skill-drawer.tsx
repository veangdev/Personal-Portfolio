import { X } from "lucide-react"

import React from "react"
import SkillRow  from "./skill-row"
import type { SkillCategory } from "./types"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

interface SkillDrawerProps {
  category: SkillCategory | null
  onClose: () => void
}

function SkillDrawer({ category, onClose }: SkillDrawerProps) {
  return (
    <Drawer direction="right" open={!!category} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="!left-auto !top-0 !bottom-0 !mt-0 !h-full right-0 w-full max-w-sm rounded-l-2xl rounded-r-none flex flex-col">
        <DrawerHeader className="flex items-center gap-3 border-b border-border/50 px-5 py-4">
          {category && (
            <React.Fragment>
              <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 shrink-0">
                <category.icon className="h-4 w-4 text-primary" />
              </span>
              <div className="flex-1 min-w-0">
                <DrawerTitle className="text-base font-bold leading-none">{category.title}</DrawerTitle>
                <p className="text-xs text-muted-foreground mt-1">{category.skills.length} skills</p>
              </div>
              <DrawerClose className="rounded-md p-1.5 hover:bg-muted transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </DrawerClose>
            </React.Fragment>
          )}
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          {category && (
            <ul className="divide-y divide-border/40">
              {category.skills.map((skill) => (
                <SkillRow key={skill.name} skill={skill} />
              ))}
            </ul>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default React.memo(SkillDrawer)