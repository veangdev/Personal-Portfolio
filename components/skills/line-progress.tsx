import React from "react"
import { cn } from "@/lib/utils"

function LineProgress({ percent }: { percent: number }) {
  const barClass =
    percent >= 80 ? "bg-emerald-500 dark:bg-emerald-400" :
    percent >= 60 ? "bg-blue-500 dark:bg-blue-400" :
    percent >= 40 ? "bg-amber-500 dark:bg-amber-400" :
                   "bg-slate-400 dark:bg-slate-500"

  const textClass =
    percent >= 80 ? "text-emerald-700 dark:text-emerald-400" :
    percent >= 60 ? "text-blue-700 dark:text-blue-400" :
    percent >= 40 ? "text-amber-700 dark:text-amber-400" :
                   "text-slate-500 dark:text-slate-400"

  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", barClass)}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className={cn("text-[11px] font-bold tabular-nums w-8 text-right shrink-0", textClass)}>
        {percent}%
      </span>
    </div>
  )
}

export default React.memo(LineProgress)