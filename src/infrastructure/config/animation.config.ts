import type { Variants } from "framer-motion";

import { AnimationConfig } from "@/shared";

export const ANIMATION_CONFIG = {
    EASING: {
        easeInOut: "easeInOut",
        easeOut: "easeOut",
        /** The signature cubic-bezier shared by every reveal/morph (single
         *  source of truth; CSS mirror is --ease-standard in career.css). */
        standard: [0.22, 1, 0.36, 1],
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
            },
        },
    }),

    fadeInUp: (distance = 20): Variants => ({
        hidden: { opacity: 0, y: distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),

    fadeInDown: (distance = 20): Variants => ({
        hidden: { opacity: 0, y: -distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),

    scaleIn: (startScale = 0.9): Variants => ({
        hidden: { opacity: 0, scale: startScale },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
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
            },
        },
    }),

    staggerChildren: (
        staggerTime = ANIMATION_CONFIG.STAGGER.NORMAL,
        delayTime = ANIMATION_CONFIG.DELAY.NONE
    ): Variants => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerTime,
                delayChildren: delayTime,
                duration: ANIMATION_CONFIG.DURATION.FAST,
            },
        },
    }),

    buttonHover: (): Variants => ({
        initial: {},
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FAST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            },
        },
        tap: {
            scale: 0.98,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FASTEST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            },
        },
    }),
};

export const PROJECT_CARD_VARIANTS = {
    cardItem: (index: number): Variants => ({
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                delay: index * ANIMATION_CONFIG.STAGGER.NORMAL,
                layout: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                },
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: -20,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
            },
        },
    }),

    cardHover: (): Variants => ({
        initial: {},
        hover: {
            y: -5,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: {
                type: "spring",
                stiffness: 300,
            },
        },
    }),

    cardPattern: (): Variants => ({
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: ANIMATION_CONFIG.DELAY.MEDIUM,
            },
        },
    }),
} as const;

export const BUTTON_VARIANTS = {
    scrollToTop: (): Variants => ({
        hidden: {
            opacity: 0,
            scale: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
                type: "spring",
                stiffness: 200,
            },
        },
        exit: {
            opacity: 0,
            scale: 0,
            y: 20,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
        hover: {
            y: -2,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FAST,
            },
        },
        tap: {
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FASTEST,
            },
        },
    }),
} as const;

export const FORM_VARIANTS = {
    status: (): Variants => ({
        hidden: {
            opacity: 0,
            y: -10,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FAST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            },
        },
    }),
} as const;

export const COMMON_ANIMATIONS = {
    fadeInUp15: STANDARD_ANIMATIONS.fadeInUp(15),

    scaleIn95: STANDARD_ANIMATIONS.scaleIn(0.95),

    springUp16: STANDARD_ANIMATIONS.springUp(16),
    springUp30: STANDARD_ANIMATIONS.springUp(30),
    springUp50: STANDARD_ANIMATIONS.springUp(50),

    staggerNormal: STANDARD_ANIMATIONS.staggerChildren(Stagger.NORMAL),
    staggerLoose: STANDARD_ANIMATIONS.staggerChildren(Stagger.LOOSE),

    buttonHover: STANDARD_ANIMATIONS.buttonHover(),

    fadeIn: STANDARD_ANIMATIONS.fadeIn(),
} as const;
