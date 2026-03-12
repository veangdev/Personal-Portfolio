"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileUp,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

/** Format ISO date string → "Mar 2026" */
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

export default function UploadCVPage() {
  const router = useRouter();

  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [file, setFile]             = useState<File | null>(null);
  const [status, setStatus]         = useState<Status>("idle");
  const [message, setMessage]       = useState("");
  const [updatedAt, setUpdatedAt]   = useState("");
  const [dragging, setDragging]     = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File selection helpers ──────────────────────────────────────────────
  const handleFile = (f: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setStatus("error");
      setMessage("Only PDF files are accepted.");
      return;
    }
    setFile(f);
    setStatus("idle");
    setMessage("");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0] ?? null);
  };

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !password) return;

    setStatus("loading");
    setMessage("");

    const form = new FormData();
    form.append("password", password);
    form.append("file", file);

    try {
      const res  = await fetch("/api/upload-cv", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Upload failed.");
      } else {
        setStatus("success");
        setUpdatedAt(data.updatedAt);
        setPassword("");
        setFile(null);
      }
    } catch {
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Back link */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </button>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/5 dark:shadow-black/30">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground leading-tight">
                Update Resume
              </h1>
              <p className="text-xs text-muted-foreground">
                Replaces the current resume.pdf
              </p>
            </div>
          </div>

          {/* Success state */}
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Resume updated!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tooltip will now read:{" "}
                  <span className="font-medium text-foreground">
                    Updated {fmtDate(updatedAt)} · PDF · ATS-friendly
                  </span>
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => { setStatus("idle"); setMessage(""); }}
              >
                Upload another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Password field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  Owner password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className={cn(
                      "w-full h-10 px-3 pr-10 rounded-lg text-sm",
                      "bg-background border border-input",
                      "text-foreground placeholder:text-muted-foreground",
                      "outline-none focus:ring-2 focus:ring-ring/50",
                      "transition-shadow duration-150",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye    className="w-4 h-4" />
                    }
                  </button>
                </div>
              </div>

              {/* File drop zone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  PDF file
                </label>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2",
                    "h-32 rounded-xl border-2 border-dashed cursor-pointer",
                    "transition-all duration-150",
                    dragging
                      ? "border-primary bg-primary/5 scale-[1.01]"
                      : file
                        ? "border-green-500/50 bg-green-500/5"
                        : "border-border hover:border-primary/40 hover:bg-muted/40",
                  )}
                  aria-label="Upload PDF file"
                >
                  {file ? (
                    <>
                      <FileText className="w-6 h-6 text-green-500" />
                      <p className="text-sm font-medium text-foreground truncate max-w-[85%]">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(0)} KB · Click to change
                      </p>
                    </>
                  ) : (
                    <>
                      <FileUp className="w-6 h-6 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary font-medium">
                          Click to browse
                        </span>{" "}
                        or drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground">PDF only</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {message}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={!file || !password || status === "loading"}
                className="w-full h-10 mt-1"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <FileUp className="w-4 h-4 mr-2" />
                    Upload & Replace
                  </>
                )}
              </Button>

            </form>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          This page is not linked publicly — share only with yourself.
        </p>
      </div>
    </main>
  );
}
