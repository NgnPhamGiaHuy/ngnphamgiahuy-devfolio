import type { Variants } from "framer-motion";

import { ANIMATION_CONFIG, StandardAnimations } from "./animation.config";

/**
 * Centralized animation definitions for the Hero section and its child components.
 * All Hero-related animations are grouped here for better maintainability and consistency.
 */

// ============================================================================
// HERO MAIN CONTAINER ANIMATIONS
// ============================================================================

/**
 * Main hero container animation with staggered children
 */
export const heroContainerVariants: Variants = StandardAnimations.staggerChildren(0.3, 0.1);

/**
 * Profile block animation with spring effect
 */
export const heroProfileBlockVariants: Variants = StandardAnimations.springUp(50);

// ============================================================================
// PERSONAL INTRO ANIMATIONS
// ============================================================================

/**
 * Personal intro container with staggered children
 */
export const personalIntroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            duration: 0.3
        }
    }
};

/**
 * Personal intro item animation (fade in up)
 */
export const personalIntroItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: ANIMATION_CONFIG.EASING.easeInOut
        }
    }
};

/**
 * Name container animation
 */
export const personalIntroNameVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delayChildren: 0.2
        }
    }
};

/**
 * Individual name word animation
 */
export const personalIntroNameWordVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: ANIMATION_CONFIG.EASING.easeOut
        }
    }
};

/**
 * Job title animation
 */
export const personalIntroJobTitleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: ANIMATION_CONFIG.EASING.easeOut
        }
    }
};

// ============================================================================
// BIO SECTION ANIMATIONS
// ============================================================================

/**
 * Bio section container with dynamic stagger based on description length
 */
export const createBioSectionContainerVariants = (dynamicStagger: number): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: dynamicStagger,
            duration: 0.3
        }
    }
});

/**
 * Bio section item animation (fade in up with longer duration)
 */
export const bioSectionItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.75,
            ease: ANIMATION_CONFIG.EASING.easeInOut
        }
    }
};

/**
 * Social links animation with spring effect
 */
export const bioSectionSocialLinksVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.6
        }
    }
};

// ============================================================================
// DOWNLOAD RESUME BUTTON ANIMATIONS
// ============================================================================

/**
 * Download resume button container animation
 */
export const downloadResumeContainerVariants: Variants = StandardAnimations.springUp(30);

/**
 * Download resume button item animation
 */
export const downloadResumeButtonVariants: Variants = StandardAnimations.fadeInUp(15);

/**
 * Download resume button hover animation
 */
export const downloadResumeButtonHoverVariants: Variants = StandardAnimations.buttonHover();

// ============================================================================
// PROFILE VISUAL ANIMATIONS
// ============================================================================

/**
 * Profile visual default animation (enhanced entrance with depth)
 */
export const profileVisualDefaultVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 60,
        scale: 0.95,
        rotateX: -8,
        filter: "blur(4px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth motion
            filter: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }
};

/**
 * Profile image animation (refined scale with subtle rotation)
 */
export const profileVisualImageVariants: Variants = {
    hidden: { 
        opacity: 0, 
        scale: 0.85,
        rotateY: -5,
        filter: "blur(6px)"
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        filter: "blur(0px)",
        transition: {
            delay: 0.3, // Slightly delayed after container
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            filter: {
                delay: 0.3,
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }
};

/**
 * Profile visual stats container animation (enhanced timing)
 */
export const profileVisualStatsVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.7, // Delayed after image animation
            staggerChildren: 0.15, // Slightly longer stagger for smoother flow
            duration: 0.4
        }
    }
};

/**
 * Individual stat item animation (enhanced with scale and bounce)
 */
export const profileVisualStatItemVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 30,
        scale: 0.8,
        rotateX: -15
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
                ease: [0.34, 1.56, 0.64, 1] // Subtle bounce effect
            }
        }
    }
};

// ============================================================================
// ANIMATED TEXT ANIMATIONS
// ============================================================================

/**
 * Animated text container for words (long text)
 */
export const createAnimatedTextWordContainerVariants = (baseDelay: number) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: ANIMATION_CONFIG.STAGGER.NORMAL,
            delayChildren: baseDelay / 1000
        }
    }
});

/**
 * Animated text container for characters (short text)
 */
export const createAnimatedTextCharContainerVariants = (baseDelay: number) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: ANIMATION_CONFIG.STAGGER.TEXT,
            delayChildren: baseDelay / 1000
        }
    }
});

/**
 * Animated text word item animation
 */
export const animatedTextWordItemAnimation = (baseDelay: number, index: number, staggerDelay: number, duration: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0
    },
    transition: {
        delay: (baseDelay + (index * staggerDelay * 2)) / 1000,
        duration,
        ease: ANIMATION_CONFIG.EASING.easeOut
    }
});

/**
 * Animated text character item animation
 */
export const animatedTextCharItemAnimation = (baseDelay: number, index: number, staggerDelay: number, duration: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: {
        opacity: 1,
        y: 0
    },
    transition: {
        delay: (baseDelay + (index * staggerDelay)) / 1000,
        duration,
        ease: ANIMATION_CONFIG.EASING.easeOut
    }
});

// ============================================================================
// ANIMATION GROUPS FOR EASY IMPORT
// ============================================================================

/**
 * All Hero section animations grouped by component
 */
export const HeroAnimationsConfig = {
    // Main Hero
    container: heroContainerVariants,
    profileBlock: heroProfileBlockVariants,
    
    // Personal Intro
    personalIntro: {
        container: personalIntroContainerVariants,
        item: personalIntroItemVariants,
        name: personalIntroNameVariants,
        nameWord: personalIntroNameWordVariants,
        jobTitle: personalIntroJobTitleVariants,
    },
    
    // Bio Section
    bioSection: {
        createContainer: createBioSectionContainerVariants,
        item: bioSectionItemVariants,
        socialLinks: bioSectionSocialLinksVariants,
    },
    
    // Download Resume Button
    downloadResume: {
        container: downloadResumeContainerVariants,
        button: downloadResumeButtonVariants,
        hover: downloadResumeButtonHoverVariants,
    },
    
    // Profile Visual
    profileVisual: {
        default: profileVisualDefaultVariants,
        image: profileVisualImageVariants,
        stats: profileVisualStatsVariants,
        statItem: profileVisualStatItemVariants,
    },
    
    // Animated Text
    animatedText: {
        createWordContainer: createAnimatedTextWordContainerVariants,
        createCharContainer: createAnimatedTextCharContainerVariants,
        wordItem: animatedTextWordItemAnimation,
        charItem: animatedTextCharItemAnimation,
    },
} as const;
