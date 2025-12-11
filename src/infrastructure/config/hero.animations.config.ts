import type { Variants } from "framer-motion";

import { ANIMATION_CONFIG, COMMON_ANIMATIONS } from "./animation.config";

export const heroContainerVariants: Variants = COMMON_ANIMATIONS.staggerLoose;

export const heroProfileBlockVariants: Variants = COMMON_ANIMATIONS.springUp50;

export const personalIntroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            duration: 0.3,
        },
    },
};

export const personalIntroItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: ANIMATION_CONFIG.EASING.easeInOut,
        },
    },
};

export const personalIntroNameVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delayChildren: 0.2,
        },
    },
};

export const personalIntroNameWordVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: ANIMATION_CONFIG.EASING.easeOut,
        },
    },
};

export const personalIntroJobTitleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: ANIMATION_CONFIG.EASING.easeOut,
        },
    },
};

export const createBioSectionContainerVariants = (
    dynamicStagger: number
): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: dynamicStagger,
            duration: 0.3,
        },
    },
});

export const bioSectionItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.75,
            ease: ANIMATION_CONFIG.EASING.easeInOut,
        },
    },
};

export const bioSectionSocialLinksVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.6,
        },
    },
};

export const downloadResumeContainerVariants: Variants =
    COMMON_ANIMATIONS.springUp30;

export const downloadResumeButtonVariants: Variants =
    COMMON_ANIMATIONS.fadeInUp15;

export const downloadResumeButtonHoverVariants: Variants =
    COMMON_ANIMATIONS.buttonHover;

export const profileVisualDefaultVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.95,
        rotateX: -8,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94],
            filter: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    },
};

export const profileVisualImageVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.85,
        rotateY: -5,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        filter: "blur(0px)",
        transition: {
            delay: 0.3,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            filter: {
                delay: 0.3,
                duration: 0.6,
                ease: "easeOut",
            },
        },
    },
};

export const profileVisualStatsVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.7,
            staggerChildren: 0.15,
            duration: 0.4,
        },
    },
};

/**
 * Individual stat item animation (enhanced with scale and bounce)
 */
export const profileVisualStatItemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.8,
        rotateX: -15,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: {
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
    },
};

export const createAnimatedTextWordContainerVariants = (baseDelay: number) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: ANIMATION_CONFIG.STAGGER.NORMAL,
            delayChildren: baseDelay / 1000,
        },
    },
});

export const createAnimatedTextCharContainerVariants = (baseDelay: number) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: ANIMATION_CONFIG.STAGGER.TEXT,
            delayChildren: baseDelay / 1000,
        },
    },
});

export const animatedTextWordItemAnimation = (
    baseDelay: number,
    index: number,
    staggerDelay: number,
    duration: number
) => ({
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        delay: (baseDelay + index * staggerDelay * 2) / 1000,
        duration,
        ease: ANIMATION_CONFIG.EASING.easeOut,
    },
});

export const animatedTextCharItemAnimation = (
    baseDelay: number,
    index: number,
    staggerDelay: number,
    duration: number
) => ({
    initial: { opacity: 0, y: 8 },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        delay: (baseDelay + index * staggerDelay) / 1000,
        duration,
        ease: ANIMATION_CONFIG.EASING.easeOut,
    },
});

export const HeroAnimationsConfig = {
    container: heroContainerVariants,
    profileBlock: heroProfileBlockVariants,

    personalIntro: {
        container: personalIntroContainerVariants,
        item: personalIntroItemVariants,
        name: personalIntroNameVariants,
        nameWord: personalIntroNameWordVariants,
        jobTitle: personalIntroJobTitleVariants,
    },

    bioSection: {
        createContainer: createBioSectionContainerVariants,
        item: bioSectionItemVariants,
        socialLinks: bioSectionSocialLinksVariants,
    },

    downloadResume: {
        container: downloadResumeContainerVariants,
        button: downloadResumeButtonVariants,
        hover: downloadResumeButtonHoverVariants,
    },

    profileVisual: {
        default: profileVisualDefaultVariants,
        image: profileVisualImageVariants,
        stats: profileVisualStatsVariants,
        statItem: profileVisualStatItemVariants,
    },

    animatedText: {
        createWordContainer: createAnimatedTextWordContainerVariants,
        createCharContainer: createAnimatedTextCharContainerVariants,
        wordItem: animatedTextWordItemAnimation,
        charItem: animatedTextCharItemAnimation,
    },
} as const;
