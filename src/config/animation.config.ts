import { AnimationConfig, AnimationVariants } from "@/types";
import { easeInOut, easeOut, easeIn, circOut, circInOut, backOut, backInOut } from "framer-motion";

/**
 * Framer Motion easing functions
 */
export const MotionEasing = {
    easeInOut,
    easeOut,
    easeIn,
    circOut,
    circInOut,
    backOut,
    backInOut
};

/**
 * Standard animation durations in seconds
 */
export const Duration = {
    FASTEST: 0.15,
    FAST: 0.25,
    NORMAL: 0.4,
    SLOW: 0.6,
    SLOWEST: 0.8,
};

/**
 * Standard animation delays in seconds
 */
export const Delay = {
    NONE: 0,
    SHORT: 0.1,
    MEDIUM: 0.2,
    LONG: 0.3,
    LONGEST: 0.5,
};

/**
 * Standard stagger values for sequential animations
 */
export const Stagger = {
    TIGHT: 0.02,
    NORMAL: 0.05,
    LOOSE: 0.1,
    TEXT: 0.015,
};

/**
 * Animation configuration for reduced motion preferences
 */
export const reducedMotionConfig = {
    duration: Duration.FASTEST,
    ease: "linear",
    stagger: 0,
    delay: 0,
    type: "tween",
    distance: 0,
};

/**
 * Standard animation variants for common UI elements
 */
export const StandardAnimations: AnimationConfig = {
    fadeIn: (prefersReducedMotion = false): AnimationVariants => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: prefersReducedMotion ? reducedMotionConfig.duration : Duration.NORMAL,
                ease: prefersReducedMotion ? "linear" : MotionEasing.easeOut,
            }
        }
    }),

    fadeInUp: (prefersReducedMotion = false, distance = 20): AnimationVariants => ({
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? reducedMotionConfig.duration : Duration.NORMAL,
                ease: prefersReducedMotion ? "linear" : MotionEasing.easeOut,
            }
        }
    }),

    fadeInDown: (prefersReducedMotion = false, distance = 20): AnimationVariants => ({
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? reducedMotionConfig.duration : Duration.NORMAL,
                ease: prefersReducedMotion ? "linear" : MotionEasing.easeOut,
            }
        }
    }),

    scaleIn: (prefersReducedMotion = false, startScale = 0.9): AnimationVariants => ({
        hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : startScale },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: prefersReducedMotion ? reducedMotionConfig.duration : Duration.NORMAL,
                ease: prefersReducedMotion ? "linear" : MotionEasing.easeOut,
            }
        }
    }),

    springUp: (prefersReducedMotion = false, distance = 30): AnimationVariants => ({
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: prefersReducedMotion ? "tween" : "spring",
                stiffness: 400,
                damping: 25,
                duration: prefersReducedMotion ? reducedMotionConfig.duration : undefined,
            }
        }
    }),

    staggerChildren: (prefersReducedMotion = false, staggerTime = Stagger.NORMAL, delayTime = Delay.NONE): AnimationVariants => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : staggerTime,
                delayChildren: prefersReducedMotion ? 0 : delayTime,
                duration: prefersReducedMotion ? reducedMotionConfig.duration : Duration.FAST,
            }
        }
    }),

    buttonHover: (prefersReducedMotion = false): AnimationVariants => ({
        initial: {},
        hover: {
            scale: prefersReducedMotion ? 1 : 1.05,
            y: prefersReducedMotion ? 0 : -2,
            transition: {
                duration: prefersReducedMotion ? 0 : Duration.FAST,
                ease: MotionEasing.easeInOut,
            }
        },
        tap: {
            scale: prefersReducedMotion ? 1 : 0.98,
            transition: {
                duration: prefersReducedMotion ? 0 : Duration.FASTEST,
                ease: MotionEasing.easeInOut,
            }
        }
    }),
};
