// ============================================================
// Module: Analytics events (client)
// Purpose: One typed, safe entry point for GA4 events. Guards on the env flag so
//          nothing fires (and nothing errors) when analytics is disabled, and
//          never lets an analytics failure break the app.
// ============================================================
import { sendGAEvent } from "@next/third-parties/google";

export const AnalyticsEvent = {
    CaseStudyOpen: "case_study_open",
    ContactSubmit: "contact_submit",
    ContactSubmitError: "contact_submit_error",
} as const;

export type AnalyticsEventName =
    (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

export const trackEvent = (
    name: AnalyticsEventName,
    params: Record<string, string | number | boolean> = {}
): void => {
    if (typeof window === "undefined") return;
    if (!process.env.NEXT_PUBLIC_GA_ID) return;
    try {
        sendGAEvent("event", name, params);
    } catch {
        // Analytics must never break the experience.
    }
};
