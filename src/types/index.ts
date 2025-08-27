import React, { ReactElement } from "react";
import { Variants } from "framer-motion";
import { Portfolio } from "@/data/data";

/**
 * Base animation variants type for Framer Motion
 */
export interface AnimationVariantsType {
    hidden: { opacity: number; y?: number };
    visible: {
        opacity: number;
        y?: number;
        transition: {
            delayChildren?: number;
            staggerChildren?: number;
            duration?: number;
            type?: string;
            stiffness?: number;
            damping?: number;
            when?: string;
        };
    };
    [key: string]: any; // Index signature for string
}

/**
 * Complete animation variants compatible with Framer Motion
 */
export type AnimationVariants = Variants & AnimationVariantsType;

/**
 * Animation easing presets as cubic-bezier arrays
 */
export interface EasingConfig {
    /** Default easing: cubic-bezier(0.25, 0.1, 0.25, 1.0) */
    DEFAULT: [number, number, number, number];
    /** Bounce easing: cubic-bezier(0.2, 0.65, 0.3, 0.9) */
    BOUNCE: [number, number, number, number];
}

// -----------------------------------------------------------------------------
// Component Props Types
// -----------------------------------------------------------------------------

/**
 * Props for the AnimatedTextCharacter component
 */
export interface AnimatedTextCharacterProps {
    /** Text content to be animated character by character */
    text: string;
    /** Optional base delay in milliseconds before animation starts */
    baseDelay?: number;
    /** Optional CSS class name for each character span */
    className?: string;
    /** Optional CSS class name for the container span */
    containerClassName?: string;
}

/**
 * Props for the VLineBlock component
 */
export interface VLineBlockProps {
    /** CSS top position value */
    top?: string;
    /** CSS right position value */
    right?: string;
    /** CSS bottom position value */
    bottom?: string;
    /** CSS left position value */
    left?: string;
    /** CSS width value */
    width?: string;
    /** Tailwind shadow classes */
    shadow?: string;
    /** Whether to show the pattern or not */
    showPattern?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for the BackgroundText component
 */
export interface BackgroundTextProps {
    /** Text content to display in the background */
    text: string;
    /** CSS top position value */
    top?: string;
    /** CSS right position value */
    right?: string;
    /** CSS bottom position value */
    bottom?: string;
    /** CSS left position value */
    left?: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for the StatCard component
 */
export interface StatCardProps {
    /** Main value displayed in the stat card */
    value: string;
    /** Label describing what the value represents */
    label: string;
    /** Optional highlight text shown after the value */
    highlight?: string;
    /** Additional CSS classes */
    className?: string;
    /** CSS width of the card */
    width?: string;
    /** CSS height of the card */
    height?: string;
    /** CSS margin value */
    margin?: string;
}

/**
 * Props for the DownloadCVButton component
 */
export interface DownloadCVButtonProps {
    // Empty interface for future prop extensions
}

/**
 * Props for the HeroIntro component
 */
export interface HeroIntroProps {
    // Component has no props but using interface for consistency
}

/**
 * Props for the HeroDescription component
 */
export interface HeroDescriptionProps {
    // Component has no props but using interface for consistency
}

// -----------------------------------------------------------------------------
// Social Media Types
// -----------------------------------------------------------------------------

/**
 * Represents a social media platform
 */
export type SocialPlatform = 'github' | 'facebook' | 'linkedin' | string;

/**
 * Type for social link data from the data.json file
 */
export interface RawSocialLink {
    platform: SocialPlatform;
    url: string;
}

/**
 * Props for a social link component
 */
export interface SocialLink {
    href: string;
    icon: (props: { className?: string }) => ReactElement;
    ariaLabel?: string;
}

/**
 * Props for the SocialLinks component
 */
export interface SocialLinksProps {
    links: SocialLink[];
    containerMargin?: string;
    iconMargin?: string;
    iconSize?: string;
    textColor?: string;
    hoverColor?: string;
    className?: string;
}

// -----------------------------------------------------------------------------
// Hero Profile Block Types
// -----------------------------------------------------------------------------

/**
 * Props for the HeroLayer component
 */
export interface HeroLayerProps {
    /** CSS width value */
    width?: string;
    /** CSS height value */
    height?: string;
    /** CSS top position value */
    top?: string;
    /** CSS right position value */
    right?: string;
    /** CSS bottom position value */
    bottom?: string;
    /** CSS left position value */
    left?: string;
}

/**
 * Structure for stat information displayed in the hero section
 */
export interface StatInfo {
    /** Main numerical value of the stat */
    value: string;
    /** Label describing what the stat represents */
    label: string;
    /** Optional text to highlight (e.g., "+" or "k") */
    highlight?: string;
    /** CSS margin value */
    margin: string;
}

/**
 * Props for the HeroProfileBlock component
 */
export interface HeroProfileBlockProps {
    /** Additional CSS classes */
    className?: string;
    /** Path to profile image */
    profileImage?: string;
    /** Configuration for pattern layers */
    patternLayers?: HeroLayerProps[];
    /** Stats to display */
    stats?: StatInfo[];
    /** Animation variants */
    variants?: any;
    /** Initial animation state */
    initial?: boolean | string | Record<string, any>;
    /** Target animation state */
    animate?: boolean | string | Record<string, any>;
    /** Animation transition properties */
    transition?: any;
}

export interface Service {
    category: string;
    title: string;
    description: string;
}

export interface ServicesProps {
    cards: Service[];
}

export interface ServiceCardProps {
    service: {
        category: string;
        title: string;
        description: string;
    };
    index: number;
}

export interface PortfolioFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export interface PortfolioGridProps {
    portfolios: Portfolio[];
}

export interface PortfolioCardProps {
    portfolio: {
        name: string;
        category: string;
        description: string;
        image: string;
        link: string;
    };
    index: number;
}

export interface SectionWrapperProps {
    title: string;
    subtitle: string;
    background?: "gradientUp" | "gradientDown" | "none";
    vlinePosition?: "left" | "right";
    children: React.ReactNode;
}

export interface AccordionContentProps {
    isOpen: boolean;
    subheading: string;
    meta: string;
    content: string;
}

export interface AccordionItemProps {
    heading: string;
    subheading: string;
    meta: string;
    content: string;
    index: number;
    isFirstItem?: boolean;
}

export interface AccordionProps {
    items: Array<{
        heading: string;
        subheading: string;
        meta: string;
        content: string;
    }>;
    label: string;
}