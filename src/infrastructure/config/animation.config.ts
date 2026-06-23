import type { Variants } from "framer-motion";

// ============================================================
// Module: Animation variants (Framer Motion)
// Only the two variant sets the app actually uses live here. Durations/easings
// are inlined (explicit > a config indirection that was 85% unused). The signature
// reveal easing lives in components/motion/easing.ts (EASE_STANDARD); these two
// cover the scroll-to-top button and form-status transitions.
// ============================================================

export const BUTTON_VARIANTS = {
    scrollToTop: (): Variants => ({
        hidden: { opacity: 0, scale: 0, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
                type: "spring",
                stiffness: 200,
            },
        },
        exit: {
            opacity: 0,
            scale: 0,
            y: 20,
            transition: { duration: 0.4, ease: "easeOut" },
        },
        hover: { y: -2, transition: { duration: 0.25 } },
        tap: { transition: { duration: 0.15 } },
    }),
} as const;

export const FORM_VARIANTS = {
    status: (): Variants => ({
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: { duration: 0.25, ease: "easeInOut" },
        },
    }),
} as const;
