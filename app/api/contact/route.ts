import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "veangkroh@gmail.com"

export async function POST(req: Request) {
  try {
    const { username, email, subject, message } = await req.json()

    if (!username || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
          <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;width:90px;">From</td>
              <td style="padding:8px 0;font-size:14px;font-weight:600;color:#111827;">${username}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td>
              <td style="padding:8px 0;font-size:14px;color:#111827;">
                <a href="mailto:${email}" style="color:#f97316;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;">Subject</td>
              <td style="padding:8px 0;font-size:14px;color:#111827;">${subject}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">Message</p>
          <p style="margin:0;font-size:14px;color:#111827;white-space:pre-wrap;line-height:1.6;">${message}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 16px;" />
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            Sent from <strong>veangkroh.dev</strong> portfolio contact form · Reply directly to respond to ${username}.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
