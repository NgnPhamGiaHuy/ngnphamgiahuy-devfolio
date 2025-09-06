import { Variants } from "framer-motion";
import { easeInOut, easeOut, easeIn, circOut, circInOut, backOut, backInOut } from "framer-motion";

import { AnimationConfig } from "@/types/animation.types";

/**
 * Main animation configuration
 */
export const ANIMATION_CONFIG = {
    /**
     * Framer Motion easing functions
     */
    EASING: {
        easeInOut,
        easeOut,
        easeIn,
        circOut,
        circInOut,
        backOut,
        backInOut
    },

    /**
     * Standard animation durations in seconds
     */
    DURATION: {
        FASTEST: 0.15,
        FAST: 0.25,
        NORMAL: 0.4,
        SLOW: 0.6,
        SLOWEST: 0.8,
    },

    /**
     * Standard animation delays in seconds
     */
    DELAY: {
        NONE: 0,
        SHORT: 0.1,
        MEDIUM: 0.2,
        LONG: 0.3,
        LONGEST: 0.5,
    },

    /**
     * Standard stagger values for sequential animations
     */
    STAGGER: {
        TIGHT: 0.02,
        NORMAL: 0.05,
        LOOSE: 0.1,
        TEXT: 0.015,
    },

    /**
     * Animation configuration for reduced motion preferences
     */
    REDUCED_MOTION: {
        duration: 0.15,
        ease: "linear",
        stagger: 0,
        delay: 0,
        type: "tween",
        distance: 0,
    }
} as const;

// For backward compatibility
export const Duration = ANIMATION_CONFIG.DURATION;
export const Delay = ANIMATION_CONFIG.DELAY;
export const Stagger = ANIMATION_CONFIG.STAGGER;

/**
 * Standard animation variants for common UI elements
 */
export const STANDARD_ANIMATIONS: AnimationConfig = {
    fadeIn: (prefersReducedMotion = false): Variants => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: prefersReducedMotion ? ANIMATION_CONFIG.REDUCED_MOTION.duration : ANIMATION_CONFIG.DURATION.NORMAL,
                ease: prefersReducedMotion ? "linear" : ANIMATION_CONFIG.EASING.easeOut,
            }
        }
    }),

    fadeInUp: (prefersReducedMotion = false, distance = 20): Variants => ({
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? ANIMATION_CONFIG.REDUCED_MOTION.duration : ANIMATION_CONFIG.DURATION.NORMAL,
                ease: prefersReducedMotion ? "linear" : ANIMATION_CONFIG.EASING.easeOut,
            }
        }
    }),

    fadeInDown: (prefersReducedMotion = false, distance = 20): Variants => ({
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? ANIMATION_CONFIG.REDUCED_MOTION.duration : ANIMATION_CONFIG.DURATION.NORMAL,
                ease: prefersReducedMotion ? "linear" : ANIMATION_CONFIG.EASING.easeOut,
            }
        }
    }),

    scaleIn: (prefersReducedMotion = false, startScale = 0.9): Variants => ({
        hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : startScale },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: prefersReducedMotion ? ANIMATION_CONFIG.REDUCED_MOTION.duration : ANIMATION_CONFIG.DURATION.NORMAL,
                ease: prefersReducedMotion ? "linear" : ANIMATION_CONFIG.EASING.easeOut,
            }
        }
    }),

    springUp: (prefersReducedMotion = false, distance = 30): Variants => ({
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: prefersReducedMotion ? "tween" : "spring",
                stiffness: 400,
                damping: 25,
                duration: prefersReducedMotion ? ANIMATION_CONFIG.REDUCED_MOTION.duration : undefined,
            }
        }
    }),

    staggerChildren: (prefersReducedMotion = false, staggerTime = ANIMATION_CONFIG.STAGGER.NORMAL, delayTime = ANIMATION_CONFIG.DELAY.NONE): Variants => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : staggerTime,
                delayChildren: prefersReducedMotion ? 0 : delayTime,
                duration: prefersReducedMotion ? ANIMATION_CONFIG.REDUCED_MOTION.duration : ANIMATION_CONFIG.DURATION.FAST,
            }
        }
    }),

    buttonHover: (prefersReducedMotion = false): Variants => ({
        initial: {},
        hover: {
            scale: prefersReducedMotion ? 1 : 1.05,
            y: prefersReducedMotion ? 0 : -2,
            transition: {
                duration: prefersReducedMotion ? 0 : ANIMATION_CONFIG.DURATION.FAST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            }
        },
        tap: {
            scale: prefersReducedMotion ? 1 : 0.98,
            transition: {
                duration: prefersReducedMotion ? 0 : ANIMATION_CONFIG.DURATION.FASTEST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            }
        }
    }),
};

// For backward compatibility
export const StandardAnimations = STANDARD_ANIMATIONS;
