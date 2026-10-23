import nodemailer from "nodemailer";
import { getSiteSettings } from "./db";

export interface InquiryEmailPayload {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  phone?: string;
  project: string;
  budget: string;
  message: string;
  createdAt?: string;
}

/**
 * Sends a real-time instant email notification to the studio's Gmail
 * whenever a prospective client submits an inquiry on the contact form.
 */
export async function sendInquiryNotification(inquiry: InquiryEmailPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const settings = await getSiteSettings();

    // Destination email (where the user wants to receive reminders)
    const destinationEmail =
      process.env.NOTIFICATION_EMAIL ||
      settings.notificationEmail ||
      settings.studioEmail ||
      "helplooksbay@gmail.com";

    // Gmail SMTP credentials
    const gmailUser =
      process.env.GMAIL_USER ||
      process.env.EMAIL_USER ||
      settings.gmailSender ||
      settings.studioEmail ||
      "helplooksbay@gmail.com";

    const gmailPass =
      process.env.GMAIL_APP_PASS ||
      process.env.GMAIL_APP_PASSWORD ||
      process.env.EMAIL_PASS ||
      settings.gmailAppPassword;

    // Resend API key fallback
    const resendApiKey = process.env.RESEND_API_KEY || settings.resendApiKey;

    const cleanPhone = (inquiry.whatsapp || inquiry.phone || "").replace(/[^0-9]/g, "");
    const waLink = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
          `Hi ${inquiry.name}! Looksbay Studio reaching out regarding your ${inquiry.project} inquiry.`
        )}`
      : "";

    // 1. Executive HTML Email Template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Client Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #18181b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600px" style="max-width: 600px; background-color: #ffffff; border-radius: 14px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          
          <!-- Top Header Strip -->
          <tr>
            <td style="background-color: #09090b; padding: 24px 32px; text-align: left;">
              <table width="100%">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #27272a; color: #a1a1aa; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 3px 8px; rounded: 4px; border-radius: 4px;">
                      Looksbay Studio Alert
                    </span>
                    <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 8px 0 0 0; letter-spacing: -0.02em;">
                      New Client Inquiry Received 🔥
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Client Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 10px; border: 1px solid #f4f4f5; padding: 18px 20px; margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600; display: block; margin-bottom: 3px;">Client Name</span>
                    <strong style="font-size: 16px; color: #09090b;">${inquiry.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; border-top: 1px solid #f4f4f5; padding-top: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600; display: block; margin-bottom: 3px;">Email Address</span>
                    <a href="mailto:${inquiry.email}" style="color: #0077ED; font-size: 14px; text-decoration: none; font-weight: 500;">${inquiry.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; border-top: 1px solid #f4f4f5; padding-top: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600; display: block; margin-bottom: 3px;">WhatsApp / Phone</span>
                    <span style="font-size: 14px; color: #09090b; font-weight: 600;">${inquiry.whatsapp || inquiry.phone || "Not provided"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; border-top: 1px solid #f4f4f5; padding-top: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600; display: block; margin-bottom: 3px;">Project Scope</span>
                    <span style="font-size: 14px; color: #09090b; font-weight: 600;">${inquiry.project}</span>
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #f4f4f5; padding-top: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600; display: block; margin-bottom: 3px;">Budget Range</span>
                    <span style="font-size: 13px; font-weight: 700; color: #059669; font-family: monospace;">${inquiry.budget}</span>
                  </td>
                </tr>
              </table>

              <!-- Project Description / Message -->
              <div style="margin-bottom: 28px;">
                <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">
                  Project Brief &amp; Requirements:
                </span>
                <div style="background-color: #ffffff; border: 1px solid #e4e4e7; border-left: 3px solid #0077ED; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.6; color: #27272a; white-space: pre-wrap;">${inquiry.message}</div>
              </div>

              <!-- Quick Action Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        ${
                          waLink
                            ? `<td style="padding-right: 10px;">
                                <a href="${waLink}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 20px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                                  Chat on WhatsApp →
                                </a>
                              </td>`
                            : ""
                        }
                        <td>
                          <a href="mailto:${inquiry.email}?subject=${encodeURIComponent(`Looksbay Studio — ${inquiry.project}`)}" style="display: inline-block; background-color: #09090b; color: #ffffff; padding: 12px 20px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                            Reply via Email →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; border-top: 1px solid #f4f4f5; padding: 16px 32px; text-align: center;">
              <span style="font-size: 11px; color: #a1a1aa;">
                Looksbay Studio Automated Lead Dispatcher · Submission ID: ${inquiry.id}
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 2. Try sending via Resend API if API Key is configured
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Looksbay Inquiries <onboarding@resend.dev>",
            to: [destinationEmail],
            reply_to: inquiry.email,
            subject: `🔥 New Client Lead: ${inquiry.name} (${inquiry.project})`,
            html: htmlContent,
          }),
        });

        if (res.ok) {
          console.log(`[Email] Notification sent via Resend to ${destinationEmail}`);
          return { success: true };
        }
      } catch (resendErr) {
        console.error("[Email] Resend API error:", resendErr);
      }
    }

    // 3. Try sending via Gmail / SMTP with App Password
    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ""), // clean spaces in app password
        },
      });

      await transporter.sendMail({
        from: `"Looksbay Studio" <${gmailUser}>`,
        to: destinationEmail,
        replyTo: inquiry.email,
        subject: `🔥 New Client Lead: ${inquiry.name} — ${inquiry.project}`,
        html: htmlContent,
      });

      console.log(`[Email] Notification sent via Gmail SMTP to ${destinationEmail}`);
      return { success: true };
    }

    console.warn(
      `[Email] Email reminder configured for ${destinationEmail}, but Gmail App Password (GMAIL_APP_PASS) is not set yet. Please set GMAIL_APP_PASS in Website Control or environment variables.`
    );
    return {
      success: false,
      error: "Gmail App Password not configured yet",
    };
  } catch (error: any) {
    console.error("[Email] Failed to send inquiry notification:", error);
    return { success: false, error: error?.message || "Unknown email error" };
  }
}

/**
 * Sends a real-time email reminder to the studio when a visitor initiates a live chat
 * with a developer or sends an unread message.
 */
export async function sendLiveChatAlert(params: {
  sessionId: string;
  clientName: string;
  clientContact?: string;
  developerName: string;
  messageText: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const settings = await getSiteSettings();
    const destinationEmail =
      process.env.NOTIFICATION_EMAIL ||
      settings.notificationEmail ||
      settings.studioEmail ||
      "helplooksbay@gmail.com";

    const gmailUser =
      process.env.GMAIL_USER ||
      process.env.EMAIL_USER ||
      settings.gmailSender ||
      settings.studioEmail ||
      "helplooksbay@gmail.com";

    const gmailPass =
      process.env.GMAIL_APP_PASS ||
      process.env.GMAIL_APP_PASSWORD ||
      process.env.EMAIL_PASS ||
      settings.gmailAppPassword;

    const resendApiKey = process.env.RESEND_API_KEY || settings.resendApiKey;

    const cleanContact = (params.clientContact || "").replace(/[^0-9]/g, "");
    const waLink = cleanContact ? `https://wa.me/${cleanContact}` : "";

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 24px; background-color: #f4f4f5; font-family: -apple-system, sans-serif; color: #18181b;">
  <table width="100%" max-width="560px" style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e4e4e7; overflow: hidden;">
    <tr>
      <td style="background: #5046E5; padding: 20px 24px; color: #ffffff;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.85;">Looksbay Live Chat Alert</span>
        <h2 style="margin: 6px 0 0 0; font-size: 18px;">💬 Client wants to talk with ${params.developerName}</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px;">
        <p style="margin-top: 0; font-size: 14px; color: #52525b;">A visitor has requested a live developer chat on Looksbay:</p>
        <div style="background: #fafafa; border: 1px solid #f4f4f5; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
          <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Client:</strong> ${params.clientName}</p>
          ${params.clientContact ? `<p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Contact:</strong> ${params.clientContact}</p>` : ""}
          <p style="margin: 0; font-size: 13px;"><strong>Target Developer:</strong> ${params.developerName}</p>
        </div>
        <div style="background: #EEF2FF; border-left: 3px solid #5046E5; padding: 12px 14px; border-radius: 4px; font-size: 13px; color: #1e1b4b; margin-bottom: 20px;">
          "${params.messageText}"
        </div>
        <div style="text-align: center;">
          <a href="https://looksbay.com/admin" style="display: inline-block; background: #5046E5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 13px;">
            Open Live Chat in Admin Dashboard →
          </a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Looksbay Live Chat <onboarding@resend.dev>",
          to: [destinationEmail],
          subject: `💬 Live Client Chat: ${params.clientName} (${params.developerName})`,
          html: htmlContent,
        }),
      });
      return { success: true };
    }

    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ""),
        },
      });

      await transporter.sendMail({
        from: `"Looksbay Live Chat" <${gmailUser}>`,
        to: destinationEmail,
        subject: `💬 Live Client Chat: ${params.clientName} (${params.developerName})`,
        html: htmlContent,
      });
      return { success: true };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Email] Live chat alert error:", err);
    return { success: false, error: err?.message };
  }
}

