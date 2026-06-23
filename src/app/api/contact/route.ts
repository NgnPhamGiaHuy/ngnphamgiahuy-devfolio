// ============================================================
// Route: POST /api/contact
// Purpose: The contact form's real backend (replaces the old simulated submit).
//          1. Validate the submission server-side (the authority).
//          2. Persist to `contacts/` via the Admin SDK — Firestore stays
//             client-unwritable; the lead is the primary, must-not-fail action.
//          3. Send a best-effort email notification (failure never loses a lead).
//          A honeypot field rejects basic bots until App Check lands (Sprint C).
// ============================================================
import { NextResponse } from "next/server";

import {
    ContactSubmissionSchema,
    type ContactRecord,
} from "@/schemas/content/contact.schema";
import {
    adminConfigured,
    getAdminDb,
} from "@/infrastructure/persistence/firebase/admin";
import { sendContactNotification } from "@/infrastructure/notifications";

// firebase-admin needs the Node runtime (not edge); the form is always dynamic.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { ok: false, error: "Invalid request." },
            { status: 400 }
        );
    }

    // Honeypot: a filled hidden `company` field means a bot. Feign success so we
    // don't teach the bot, but persist nothing.
    const company = (body as { company?: unknown })?.company;
    if (typeof company === "string" && company.trim() !== "") {
        return NextResponse.json({ ok: true }, { status: 200 });
    }

    const parsed = ContactSubmissionSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { ok: false, error: "Please check the form and try again." },
            { status: 400 }
        );
    }

    if (!adminConfigured()) {
        // eslint-disable-next-line no-console -- intentional server diagnostic
        console.error(
            "[api/contact] Admin SDK not configured — cannot persist submission. " +
                "Set FIREBASE_SERVICE_ACCOUNT."
        );
        return NextResponse.json(
            {
                ok: false,
                error: "Contact is temporarily unavailable. Please email directly.",
            },
            { status: 503 }
        );
    }

    // Build meta without undefined values (Firestore rejects undefined fields).
    const ua = request.headers.get("user-agent") ?? undefined;
    const ref = request.headers.get("referer") ?? undefined;
    const meta =
        ua || ref
            ? {
                  ...(ua ? { userAgent: ua } : {}),
                  ...(ref ? { referer: ref } : {}),
              }
            : undefined;

    const record: ContactRecord = {
        ...parsed.data,
        status: "new",
        source: "website",
        createdAt: new Date().toISOString(),
        ...(meta ? { meta } : {}),
    };

    try {
        await getAdminDb().collection("contacts").add(record);
    } catch (error) {
        // eslint-disable-next-line no-console -- intentional server diagnostic
        console.error("[api/contact] Firestore write failed", error);
        return NextResponse.json(
            { ok: false, error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }

    // Best-effort — the lead is already saved, so don't await or fail on email.
    void sendContactNotification(record);

    return NextResponse.json({ ok: true }, { status: 200 });
}
