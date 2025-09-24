import type { Variants } from "framer-motion";

import { AnimationConfig } from "@/types";

export const ANIMATION_CONFIG = {
    EASING: {
        easeInOut: "easeInOut",
        easeOut: "easeOut",
        easeIn: "easeIn",
        circOut: "circOut",
        circInOut: "circInOut",
        backOut: "backOut",
        backInOut: "backInOut"
    },

    DURATION: {
        FASTEST: 0.15,
        FAST: 0.25,
        NORMAL: 0.4,
        SLOW: 0.6,
        SLOWEST: 0.8,
    },

    DELAY: {
        NONE: 0,
        SHORT: 0.1,
        MEDIUM: 0.2,
        LONG: 0.3,
        LONGEST: 0.5,
    },

    STAGGER: {
        TIGHT: 0.02,
        NORMAL: 0.05,
        LOOSE: 0.1,
        TEXT: 0.015,
    },

    REDUCED_MOTION: {
        duration: 0.15,
        ease: "linear",
        stagger: 0,
        delay: 0,
        type: "tween",
        distance: 0,
    }
} as const;

export const Duration = ANIMATION_CONFIG.DURATION;
export const Delay = ANIMATION_CONFIG.DELAY;
export const Stagger = ANIMATION_CONFIG.STAGGER;

export const STANDARD_ANIMATIONS: AnimationConfig = {
    fadeIn: (): Variants => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            }
        }
    }),

    fadeInUp: (distance = 20): Variants => ({
        hidden: { opacity: 0, y: distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            }
        }
    }),

    fadeInDown: (distance = 20): Variants => ({
        hidden: { opacity: 0, y: -distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            }
        }
    }),

    scaleIn: (startScale = 0.9): Variants => ({
        hidden: { opacity: 0, scale: startScale },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            }
        }
    }),

    springUp: (distance = 30): Variants => ({
        hidden: { opacity: 0, y: distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
            }
        }
    }),

    staggerChildren: (staggerTime = ANIMATION_CONFIG.STAGGER.NORMAL, delayTime = ANIMATION_CONFIG.DELAY.NONE): Variants => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerTime,
                delayChildren: delayTime,
                duration: ANIMATION_CONFIG.DURATION.FAST,
            }
        }
    }),

    buttonHover: (): Variants => ({
        initial: {},
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FAST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FASTEST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            }
        }
    }),
};

export const StandardAnimations = STANDARD_ANIMATIONS;
