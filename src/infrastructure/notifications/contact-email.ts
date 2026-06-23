// ============================================================
// Module: Contact email notification (server-only)
// Purpose: Best-effort owner notification when a visitor submits the contact
//          form. Calls the Resend HTTP API directly (no SDK dependency added).
//          NEVER throws to the caller — a failed email must not lose a lead that
//          has already been persisted.
// ============================================================
import type { ContactRecord } from "@/schemas/content/contact.schema";

const API_KEY = process.env.RESEND_API_KEY;
const TO = process.env.CONTACT_NOTIFY_TO;
const FROM =
    process.env.CONTACT_NOTIFY_FROM ?? "Portfolio <onboarding@resend.dev>";

/** Email is optional: without these the lead is still saved, just not emailed. */
export const resendConfigured = (): boolean => Boolean(API_KEY && TO);

const escapeHtml = (s: string): string =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

export const sendContactNotification = async (
    record: ContactRecord
): Promise<boolean> => {
    if (!resendConfigured()) return false;

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: FROM,
                to: [TO],
                // Lets the owner reply straight to the sender from the inbox.
                reply_to: record.email,
                subject: `New inquiry: ${record.subject}`,
                html: [
                    "<h2>New contact submission</h2>",
                    `<p><strong>From:</strong> ${escapeHtml(record.name)} &lt;${escapeHtml(record.email)}&gt;</p>`,
                    `<p><strong>Subject:</strong> ${escapeHtml(record.subject)}</p>`,
                    "<p><strong>Message:</strong></p>",
                    `<p>${escapeHtml(record.message).replace(/\n/g, "<br/>")}</p>`,
                    "<hr/>",
                    `<p style="color:#888;font-size:12px">Received ${escapeHtml(record.createdAt)} · source: ${escapeHtml(record.source)}</p>`,
                ].join(""),
            }),
        });

        if (!res.ok) {
            console.error(
                "[contact-email] Resend responded",
                res.status,
                await res.text()
            );
            return false;
        }
        return true;
    } catch (error) {
        console.error("[contact-email] send failed", error);
        return false;
    }
};
