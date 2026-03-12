"use client";

import { useEffect, useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DownloadResumeProps {
  variant?: "default" | "outline" | "ghost" | "secondary";
  resumeUrl?: string;
  className?: string;
  showTooltip?: boolean;
  label?: string;
}

/** Format ISO string → "Mar 2026" */
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

export default function DownloadResume({
  variant = "outline",
  resumeUrl = "/assets/resume.pdf",
  className,
  showTooltip = true,
  label = "Download CV",
}: DownloadResumeProps) {
  // Fetch upload date from the metadata file written by the upload API
  const [updatedLabel, setUpdatedLabel] = useState("Updated Feb 2026");

  useEffect(() => {
    fetch("/assets/resume-meta.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data?.updatedAt) {
          setUpdatedLabel(`Updated ${fmtDate(data.updatedAt)}`);
        }
      })
      .catch(() => {
        // No metadata yet — keep the default label
      });
  }, []);

  const button = (
    <Button
      variant={variant}
      size="lg"
      className={cn(
        "btn-masculine text-lg px-6 py-6 bg-transparent group border-primary/50 hover:bg-primary/10 transition-all duration-200",
        className,
      )}
      asChild
    >
      <a
        href={resumeUrl}
        download="Full-Stack-Developer.pdf"
        aria-label="Download Kroh Veang resume as PDF"
      >
        <FileDown className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-primary" />
        {label}
      </a>
    </Button>
  );

  if (!showTooltip) return button;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs font-medium py-2">
          {updatedLabel} · PDF · ATS-friendly
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
