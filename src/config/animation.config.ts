// ============================================================
// File: animation.config.ts
// Purpose: Centralized animation configuration and variants for Framer Motion
// Author: Frontend Team
// Dependencies: Framer Motion, AnimationConfig types
// ============================================================

import type { Variants } from "framer-motion";

import { AnimationConfig } from "@/types";

// ============================================================
// Animation Configuration Constants
// ============================================================

/**
 * Core animation configuration object containing timing, easing, and behavior constants
 * Provides consistent animation values across the entire application
 */
export const ANIMATION_CONFIG = {
    /**
     * Easing functions for smooth animation transitions
     * Maps to Framer Motion's built-in easing curves
     */
    EASING: {
        easeInOut: "easeInOut",
        easeOut: "easeOut",
        easeIn: "easeIn",
        circOut: "circOut",
        circInOut: "circInOut",
        backOut: "backOut",
        backInOut: "backInOut",
    },

    /**
     * Duration values for different animation speeds
     * Optimized for perceived performance and user experience
     */
    DURATION: {
        FASTEST: 0.15,
        FAST: 0.25,
        NORMAL: 0.4,
        SLOW: 0.6,
        SLOWEST: 0.8,
    },

    /**
     * Delay values for staggered animations and timing coordination
     * Used to create sequential animation effects
     */
    DELAY: {
        NONE: 0,
        SHORT: 0.1,
        MEDIUM: 0.2,
        LONG: 0.3,
        LONGEST: 0.5,
    },

    /**
     * Stagger timing for child element animations
     * Controls the delay between animated children
     */
    STAGGER: {
        TIGHT: 0.02,
        NORMAL: 0.05,
        LOOSE: 0.1,
        TEXT: 0.015,
    },

    /**
     * Reduced motion configuration for accessibility compliance
     * Ensures animations respect user's motion preferences
     */
    REDUCED_MOTION: {
        duration: 0.15,
        ease: "linear",
        stagger: 0,
        delay: 0,
        type: "tween",
        distance: 0,
    },
} as const;

// ============================================================
// Configuration Exports
// ============================================================

export const Duration = ANIMATION_CONFIG.DURATION;
export const Delay = ANIMATION_CONFIG.DELAY;
export const Stagger = ANIMATION_CONFIG.STAGGER;

// ============================================================
// Standard Animation Variants
// ============================================================

/**
 * Collection of reusable animation variants for common UI patterns
 * Provides consistent animation behavior across different components
 */
export const STANDARD_ANIMATIONS: AnimationConfig = {
    /**
     * Simple fade-in animation for elements appearing on screen
     * @returns {Variants} Fade-in animation variants
     */
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

    /**
     * Fade-in with upward motion for elements entering from below
     * @param {number} distance - Vertical distance to animate from
     * @returns {Variants} Fade-in-up animation variants
     */
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

    /**
     * Fade-in with downward motion for elements entering from above
     * @param {number} distance - Vertical distance to animate from
     * @returns {Variants} Fade-in-down animation variants
     */
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

    /**
     * Scale-in animation for elements growing into view
     * @param {number} startScale - Initial scale value (0-1)
     * @returns {Variants} Scale-in animation variants
     */
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

    /**
     * Spring-based upward motion for bouncy entrance effects
     * @param {number} distance - Vertical distance to animate from
     * @returns {Variants} Spring-up animation variants
     */
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

    /**
     * Staggered children animation for sequential element reveals
     * @param {number} staggerTime - Delay between child animations
     * @param {number} delayTime - Initial delay before animation starts
     * @returns {Variants} Staggered children animation variants
     */
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

    /**
     * Button hover and tap animations for interactive elements
     * @returns {Variants} Button interaction animation variants
     */
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

// ============================================================
// ProjectCard Specific Variants
// ============================================================

/**
 * ProjectCard animation variants for consistent card animations
 * Used across all project card components for unified behavior
 */
export const PROJECT_CARD_VARIANTS = {
    /**
     * Card item container animation with staggered entrance
     * @param {number} index - Index position for staggered timing
     * @returns {Variants} Card item animation variants
     */
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

    /**
     * Card hover animation with lift effect and shadow
     * @returns {Variants} Card hover animation variants
     */
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

    /**
     * Decorative pattern fade-in animation
     * @returns {Variants} Pattern animation variants
     */
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

// ============================================================
// Component-Specific Animation Variants
// ============================================================

/**
 * ServiceCard animation variants for service card components
 * Features scale-in entrance and pattern animations
 */
export const SERVICE_CARD_VARIANTS = {
    /**
     * Main card container with scale-in animation
     * @param {number} startScale - Initial scale value for entrance
     * @returns {Variants} Service card animation variants
     */
    card: (startScale = 0.95): Variants => ({
        hidden: {
            opacity: 0,
            scale: startScale,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),

    /**
     * Content elements with fade-in-up animation
     * @param {number} distance - Vertical distance for fade-in motion
     * @returns {Variants} Service card content animation variants
     */
    content: (distance = 10): Variants => ({
        hidden: {
            opacity: 0,
            y: distance,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),

    /**
     * Decorative pattern with scale and rotation
     * @returns {Variants} Service card pattern animation variants
     */
    pattern: (): Variants => ({
        hidden: {
            opacity: 0,
            scale: 0.8,
            rotate: -5,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                delay: ANIMATION_CONFIG.DELAY.LONG,
                duration: ANIMATION_CONFIG.DURATION.SLOW,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),
} as const;

/**
 * CertificateCard animation variants for certificate components
 * Similar to ServiceCard but optimized for certificate layout
 */
export const CERTIFICATE_CARD_VARIANTS = {
    /**
     * Certificate card container animation
     * @param {number} startScale - Initial scale value for entrance
     * @returns {Variants} Certificate card animation variants
     */
    card: (startScale = 0.95): Variants => ({
        hidden: {
            opacity: 0,
            scale: startScale,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),
} as const;

/**
 * SkillCard animation variants for skill components
 * Simple fade-in animation for skill items
 */
export const SKILL_CARD_VARIANTS = {
    /**
     * Skill card item animation
     * @returns {Variants} Skill card animation variants
     */
    item: (): Variants => ({
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),
} as const;

/**
 * Button animation variants for interactive elements
 * Includes hover, tap, and entrance animations
 */
export const BUTTON_VARIANTS = {
    /**
     * Scroll to top button with scale and fade animation
     * @returns {Variants} Scroll-to-top button animation variants
     */
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

    /**
     * Download resume button animation
     * @returns {Variants} Download resume button animation variants
     */
    downloadResume: (): Variants => ({
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
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
} as const;

/**
 * Form animation variants for form components
 * Includes input focus and status animations
 */
export const FORM_VARIANTS = {
    /**
     * Form input animation with focus states
     * @returns {Variants} Form input animation variants
     */
    input: (): Variants => ({
        hidden: {
            opacity: 0,
            y: 10,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
        focus: {
            scale: 1.02,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FAST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            },
        },
    }),

    /**
     * Form status message animation
     * @returns {Variants} Form status animation variants
     */
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

/**
 * Accordion animation variants for accordion components
 * Includes content expansion and collapse animations
 */
export const ACCORDION_VARIANTS = {
    /**
     * Accordion content animation with height and opacity
     * @returns {Variants} Accordion content animation variants
     */
    content: (): Variants => ({
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FAST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            },
        },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FAST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            },
        },
    }),
} as const;

/**
 * Carousel animation variants for carousel components
 * Includes slide transitions and pagination animations
 */
export const CAROUSEL_VARIANTS = {
    /**
     * Carousel container animation
     * @returns {Variants} Carousel container animation variants
     */
    container: (): Variants => ({
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),

    /**
     * Carousel slide animation
     * @param {'left' | 'right'} direction - Slide direction for entrance/exit
     * @returns {Variants} Carousel slide animation variants
     */
    slide: (direction: "left" | "right" = "left"): Variants => ({
        hidden: {
            opacity: 0,
            x: direction === "left" ? -50 : 50,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
        exit: {
            opacity: 0,
            x: direction === "left" ? 50 : -50,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.FAST,
                ease: ANIMATION_CONFIG.EASING.easeInOut,
            },
        },
    }),

    /**
     * Carousel pagination animation
     * @returns {Variants} Carousel pagination animation variants
     */
    pagination: (): Variants => ({
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: ANIMATION_CONFIG.DURATION.NORMAL,
                ease: ANIMATION_CONFIG.EASING.easeOut,
            },
        },
    }),
} as const;

// ============================================================
// Module Exports
// ============================================================

export const StandardAnimations = STANDARD_ANIMATIONS;

export const COMMON_ANIMATIONS = {
    fadeInUp15: STANDARD_ANIMATIONS.fadeInUp(15),
    fadeInUp20: STANDARD_ANIMATIONS.fadeInUp(20),
    fadeInUp30: STANDARD_ANIMATIONS.fadeInUp(30),

    scaleIn95: STANDARD_ANIMATIONS.scaleIn(0.95),
    scaleIn90: STANDARD_ANIMATIONS.scaleIn(0.9),

    springUp16: STANDARD_ANIMATIONS.springUp(16),
    springUp30: STANDARD_ANIMATIONS.springUp(30),
    springUp50: STANDARD_ANIMATIONS.springUp(50),

    staggerNormal: STANDARD_ANIMATIONS.staggerChildren(Stagger.NORMAL),
    staggerTight: STANDARD_ANIMATIONS.staggerChildren(Stagger.TIGHT),
    staggerLoose: STANDARD_ANIMATIONS.staggerChildren(Stagger.LOOSE),

    buttonHover: STANDARD_ANIMATIONS.buttonHover(),

    fadeIn: STANDARD_ANIMATIONS.fadeIn(),
} as const;
