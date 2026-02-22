"use client";

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
  /** shadcn Button variant */
  variant?: "default" | "outline" | "ghost" | "secondary";
  /** Path to the resume PDF inside /public */
  resumeUrl?: string;
  /** Extra Tailwind classes forwarded to the Button */
  className?: string;
  /** Show the tooltip with file metadata */
  showTooltip?: boolean;
  /** Button label text */
  label?: string;
}

export default function DownloadResume({
  variant = "outline",
  resumeUrl = "/assets/Introduction_to_Cybersecurity_certificate.pdf",
  className,
  showTooltip = true,
  label = "Download Resume",
}: DownloadResumeProps) {
  const button = (
    <Button
      variant={variant}
      size="lg"
      className={cn(
        "btn-masculine text-lg px-4 py-6 bg-transparent group border-primary/50 hover:bg-primary/10 transition-all duration-200",
        className,
      )}
      asChild
    >
      <a
        href={resumeUrl}
        download="Kroh-Veang-Resume.pdf"
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
        <TooltipContent side="right" className="text-xs font-medium">
          Updated Feb 2026 · PDF · ATS-friendly
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
