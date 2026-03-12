import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = formData.get("password") as string;
    const file     = formData.get("file") as File | null;

    // ── Password check (server-side only — never exposed to the client) ──
    if (!password || password !== process.env.CV_UPLOAD_PASSWORD) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    }

    // ── File validation ───────────────────────────────────────────────────
    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 },
      );
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are accepted." },
        { status: 400 },
      );
    }

    const assetsDir = path.join(process.cwd(), "public", "assets");

    // ── Replace the existing resume ───────────────────────────────────────
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(assetsDir, "resume.pdf"), buffer);

    // ── Write upload metadata (date used by the download tooltip) ─────────
    const updatedAt = new Date().toISOString();
    await writeFile(
      path.join(assetsDir, "resume-meta.json"),
      JSON.stringify({ updatedAt }, null, 2),
    );

    return NextResponse.json({ success: true, updatedAt });
  } catch (err) {
    console.error("[upload-cv]", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 },
    );
  }
}
