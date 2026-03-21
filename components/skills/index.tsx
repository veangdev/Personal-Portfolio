"use client";

import { useState } from "react";
import { Users } from "lucide-react";

import { cn } from "@/lib/utils";
import SkillCard from "./skill-card";
import SkillDrawer from "./skill-drawer";
import type { SkillCategory } from "./types";
import { skillCategories, softSkills } from "./data";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Skills({ className }: { className?: string }) {
  const [items, setItems] = useState<SkillCategory | null>(null);

  return (
    <TooltipProvider delayDuration={300}>
      <section id="skills" className={cn("py-20", className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Technical <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A curated toolkit built through years of hands-on production
                experience and continuous learning.
              </p>
            </div>

            {/* Top 3 categories — 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillCategories.slice(0, 3).map((category) => (
                <SkillCard
                  key={category.title}
                  category={category}
                  onSeeMore={setItems}
                />
              ))}
            </div>

            {/* Row 2 — AI & Automation (1/3) + Soft Skills (2/3) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* AI & Automation */}
              {skillCategories.slice(3).map((category) => (
                <SkillCard
                  key={category.title}
                  category={category}
                  onSeeMore={setItems}
                />
              ))}

              {/* Soft Skills — spans remaining 2 columns */}
              <Card className="md:col-span-2 fade-in border-border/50 hover:border-primary/30 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 h-full">
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
                      const SkillIcon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 text-sm font-medium hover:bg-primary/10 hover:border-primary/30 hover:scale-105 transition-all duration-200 cursor-default"
                        >
                          <SkillIcon className="h-4 w-4 text-primary shrink-0" />
                          {skill.name}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Drawer — slides in from the right */}
            <SkillDrawer category={items} onClose={() => setItems(null)} />

            {/* Footer note */}
            <div className="fade-in mt-12 text-center">
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Always learning. Currently exploring{" "}
                <span className="text-primary font-medium">
                  AI/ML integration
                </span>
                ,{" "}
                <span className="text-primary font-medium">
                  microservice architecture
                </span>
                , and{" "}
                <span className="text-primary font-medium">
                  advanced cloud deployments
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
