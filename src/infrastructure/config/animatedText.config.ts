// ============================================================
// Config: AnimatedText motion factories
// The only surviving piece of the old hero animation system — consumed by
// components/ui/AnimatedText.tsx (live via WrapperHeader on /portfolios + /export).
// ============================================================

import { ANIMATION_CONFIG } from "./animation.config";

/** Word-level stagger container (used when text > 50 chars). */
export const createAnimatedTextWordContainerVariants = (baseDelay: number) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: ANIMATION_CONFIG.STAGGER.NORMAL,
            delayChildren: baseDelay / 1000,
        },
    },
});

/** Character-level stagger container (used for short text). */
export const createAnimatedTextCharContainerVariants = (baseDelay: number) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: ANIMATION_CONFIG.STAGGER.TEXT,
            delayChildren: baseDelay / 1000,
        },
    },
});

const animatedTextWordItemAnimation = (
    baseDelay: number,
    index: number,
    staggerDelay: number,
    duration: number
) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
        delay: (baseDelay + index * staggerDelay * 2) / 1000,
        duration,
        ease: ANIMATION_CONFIG.EASING.easeOut,
    },
});

const animatedTextCharItemAnimation = (
    baseDelay: number,
    index: number,
    staggerDelay: number,
    duration: number
) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: {
        delay: (baseDelay + index * staggerDelay) / 1000,
        duration,
        ease: ANIMATION_CONFIG.EASING.easeOut,
    },
});

export const AnimatedTextConfig = {
    createWordContainer: createAnimatedTextWordContainerVariants,
    createCharContainer: createAnimatedTextCharContainerVariants,
    wordItem: animatedTextWordItemAnimation,
    charItem: animatedTextCharItemAnimation,
} as const;
