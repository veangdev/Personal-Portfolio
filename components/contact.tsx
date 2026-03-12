"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Phone, Send, Loader2, Clock, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { PROFILE_DATA } from "@/constants/informatin"
import { cn } from "@/lib/utils"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
      ;(e.target as HTMLFormElement).reset()
    } catch {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "veangkroh@gmail.com",
      href: "mailto:veangkroh@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+855 97 614 9359",
      href: "tel:+85597614359",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Phnom Penh, Cambodia",
      href: null,
    },
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          {/* ── Section header ────────────────────────────────────────────── */}
          <div className="text-center mb-14 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have a project in mind or want to explore opportunities? I'd love to hear from you.
            </p>
          </div>

          {/* ── 2-col grid (2 + 3 columns) ────────────────────────────────── */}
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* ── Left — info (2/5) ────────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-7 slide-in-left">

              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-semibold text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to new opportunities
              </div>

              {/* Headline */}
              <div>
                <h3 className="text-2xl font-bold leading-snug mb-3">
                  Let's build something{" "}
                  <span className="gradient-text">great together</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I'm open to remote roles, freelance work, and meaningful
                  collaborations. Whether it's a quick question or a full
                  project — reach out, I read everything.
                </p>
              </div>

              {/* Contact info cards */}
              <div className="flex flex-col gap-2.5">
                {contactInfo.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "group flex items-center gap-3.5 px-4 py-3 rounded-xl",
                      "border border-border/50 hover:border-primary/30",
                      "bg-muted/30 hover:bg-primary/5",
                      "transition-all duration-200",
                    )}
                  >
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors duration-200">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>

                    {/* Label + value */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-150 truncate block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.value}
                        </p>
                      )}
                    </div>

                    {/* Arrow indicator for links */}
                    {item.href && (
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary shrink-0 transition-colors duration-150" />
                    )}
                  </div>
                ))}
              </div>

              {/* Response time */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                Typically responds within{" "}
                <span className="text-foreground font-medium">24 hours</span>
              </div>

              {/* Social links */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-2.5">
                  Find me on
                </p>
                <div className="flex gap-2">
                  {Object.values(PROFILE_DATA.socialLinks).map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center",
                        "bg-muted border border-border/50",
                        "text-muted-foreground hover:text-primary",
                        "hover:bg-primary/10 hover:border-primary/30",
                        "transition-all duration-200",
                      )}
                    >
                      <link.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right — form (3/5) ────────────────────────────────────────── */}
            <div className="lg:col-span-3 slide-in-right">
              <Card className="border-border/50 shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg font-semibold mb-6">Send me a message</h3>

                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Username */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="username"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Username
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Your name or username"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Email Address
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

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="subject"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Project collaboration / Job opportunity / etc."
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-xs font-medium text-muted-foreground"
                      >
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
                      className="w-full gap-2 btn-masculine"
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
  )
}
