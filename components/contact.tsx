"use client";

import React, { useState } from "react";
import {
  Send,
  Loader2,
  Briefcase,
  Globe,
  Handshake,
  Building2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// ── Work-type cards ────────────────────────────────────────────────────────────
const WORK_TYPES = [
  {
    icon: Globe,
    title: "Remote Full-time",
    desc: "Looking for my next long-term role in a great team",
    subject: "Remote Full-time Opportunity",
  },
  {
    icon: Building2,
    title: "Onsite Full-time",
    desc: "Open to in-office roles in Phnom Penh or relocation",
    subject: "Onsite Full-time Opportunity",
  },
  {
    icon: Briefcase,
    title: "Freelance Project",
    desc: "Short or long-term contracts — happy to discuss",
    subject: "Freelance Project Inquiry",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    desc: "Side projects, open source, hackathons — let's build",
    subject: "Collaboration Proposal",
  },
] as const;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subject, setSubject] = useState("");
  const [activeType, setActiveType] = useState<string | null>(null);
  const { toast } = useToast();

  const handleWorkTypeClick = (type: typeof WORK_TYPES[number]) => {
    setActiveType(type.title);
    setSubject(type.subject);
    // Smoothly scroll to form on mobile
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send_failed");
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      setSubject("");
      setActiveType(null);
    } catch {
      toast({
        title: "Failed to send",
        description: "Please try again or email me directly at veangkroh@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-14 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have a project in mind or want to explore opportunities? Pick a
              category below and I'll make sure to reply fast.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* ── Left column (2/5) ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-6 slide-in-left">

              {/* Availability */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-semibold text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to new opportunities
              </div>

              {/* Headline */}
              <div>
                <h3 className="text-2xl font-bold leading-snug mb-2">
                  Let's work{" "}
                  <span className="gradient-text">together</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Select what fits your needs — it will pre-fill the subject for you.
                </p>
              </div>

              {/* Work-type selector */}
              <div className="flex flex-col gap-2.5">
                {WORK_TYPES.map((type) => {
                  const isActive = activeType === type.title;
                  return (
                    <button
                      key={type.title}
                      type="button"
                      onClick={() => handleWorkTypeClick(type)}
                      className={cn(
                        "group w-full text-left flex items-start gap-3.5 px-4 py-3.5 rounded-xl",
                        "border transition-all duration-200",
                        isActive
                          ? "border-primary/50 bg-primary/8 shadow-sm"
                          : "border-border/50 bg-muted/20 hover:border-primary/30 hover:bg-primary/5",
                      )}
                    >
                      {/* Icon */}
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200",
                        isActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10",
                      )}>
                        <type.icon className={cn(
                          "w-4 h-4 transition-colors duration-200",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                        )} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm font-semibold leading-tight mb-0.5 transition-colors duration-200",
                          isActive ? "text-primary" : "text-foreground",
                        )}>
                          {type.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {type.desc}
                        </p>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* ── Right column — form (3/5) ─────────────────────────────────── */}
            <div className="lg:col-span-3 slide-in-right" id="contact-form">
              <Card className="border-border/50 shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">Send me a message</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activeType
                        ? `You selected: ${activeType} — subject is pre-filled.`
                        : "Fill in the form or select a category on the left."}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name + Email row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="username" className="text-xs font-medium text-muted-foreground">
                          Name
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          placeholder="Your name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Subject — controlled, pre-filled by work-type cards */}
                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-xs font-medium text-muted-foreground">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        required
                        disabled={isSubmitting}
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          setActiveType(null);
                        }}
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        disabled={isSubmitting}
                        placeholder="Tell me about your project, role, or what's on your mind…"
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
