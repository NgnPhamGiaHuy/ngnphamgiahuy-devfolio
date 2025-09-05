// src/config/sectionWrapper.config.ts
import { Variants } from "framer-motion";

/**
 * Configuration for section wrapper components
 */
export const SECTION_WRAPPER_CONFIG = {
    /**
     * Animation variants for section container
     */
    CONTAINER_VARIANTS: {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.2 }
        }
    } as Variants,

    /**
     * Background style options by name
     */
    BACKGROUNDS: {
        gradientUp: "bg-[linear-gradient(0deg,#fff_0%,#f0ebe3_100%)]",
        gradientDown: "bg-[linear-gradient(rgb(255,255,255)_0%_0%,rgb(240,235,227)_100%)]",
        none: "bg-none",
    } as const,

    /**
     * VLine position configurations
     */
    VLINE_POSITIONS: {
        right: {
            top: "-70px",
            right: "-100px",
            bottom: "-30px",
            left: "auto",
            shadow: "before:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)] after:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)]",
            className: "rotate-180 transform",
        },
        left: {
            top: "-70px",
            right: "auto",
            bottom: "-70px",
            left: "-100px",
            shadow: "before:shadow-[5px_-5px_0_rgb(0_0_0/0.2)] after:shadow-[5px_-5px_0_rgb(0_0_0/0.2)]",
            className: "rotate-180 transform -scale-x-100",
        },
    } as const,
} as const;

// For backward compatibility
export const containerVariants = SECTION_WRAPPER_CONFIG.CONTAINER_VARIANTS;
export const backgroundByName = SECTION_WRAPPER_CONFIG.BACKGROUNDS;
export const vlinePositions = SECTION_WRAPPER_CONFIG.VLINE_POSITIONS;