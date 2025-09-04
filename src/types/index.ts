import { Variants } from "framer-motion";
import React, { ReactElement } from "react";

import { Portfolio } from "@/data/data";

// -----------------------------------------------------------------------------
// Animation-related Types
// -----------------------------------------------------------------------------

/**
 * Complete animation variants compatible with Framer Motion
 */
export type AnimationVariants = Variants;

/**
 * Standard animation configuration with reusable animation variants
 */
export interface AnimationConfig {
    fadeIn: (prefersReducedMotion?: boolean) => AnimationVariants;
    fadeInUp: (prefersReducedMotion?: boolean, distance?: number) => AnimationVariants;
    fadeInDown: (prefersReducedMotion?: boolean, distance?: number) => AnimationVariants;
    scaleIn: (prefersReducedMotion?: boolean, startScale?: number) => AnimationVariants;
    springUp: (prefersReducedMotion?: boolean, distance?: number) => AnimationVariants;
    staggerChildren: (prefersReducedMotion?: boolean, staggerTime?: number, delayTime?: number) => AnimationVariants;
    buttonHover: (prefersReducedMotion?: boolean) => AnimationVariants;
    [key: string]: (...args: any[]) => AnimationVariants;
}

// -----------------------------------------------------------------------------
// Shared/Common Component Props
// -----------------------------------------------------------------------------

/**
 * Props for the AnimatedTextCharacter component
 */
export interface AnimatedTextCharacterProps {
    text: string;
    baseDelay?: number;
    className?: string;
    containerClassName?: string;
    staggerDelay?: number;
    ease?: string;
    duration?: number;
}

/**
 * Props for the BackgroundText component
 */
export interface BackgroundTextProps {
    text: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    className?: string;
}

/**
 * Props for the DownloadCVButton component
 */
export interface DownloadCVButtonProps {
    // Empty interface for future prop extensions
}

/**
 * Props for the StatCard component
 */
export interface StatCardProps {
    value: string;
    label: string;
    highlight?: string;
    className?: string;
    width?: string;
    height?: string;
    margin?: string;
}

/**
 * Props for the VLineBlock component
 */
export interface VLineBlockProps {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    width?: string;
    shadow?: string;
    showPattern?: boolean;
    className?: string;
}

// -----------------------------------------------------------------------------
// Hero Section Props
// -----------------------------------------------------------------------------

/**
 * Props for the HeroDescription component
 */
export interface HeroDescriptionProps {
    // Component has no props but using interface for consistency
}

/**
 * Props for the HeroIntro component
 */
export interface HeroIntroProps {
    // Component has no props but using interface for consistency
}

/**
 * Props for the HeroLayer component
 */
export interface HeroLayerProps {
    width?: string;
    height?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

/**
 * Props for the HeroProfileBlock component
 */
export interface HeroProfileBlockProps {
    className?: string;
    profileImage?: string;
    patternLayers?: HeroLayerProps[];
    stats?: StatInfo[];
    variants?: any;
    initial?: boolean | string | Record<string, any>;
    animate?: boolean | string | Record<string, any>;
    transition?: any;
}

/**
 * Structure for stat information displayed in the hero section
 */
export interface StatInfo {
    value: string;
    label: string;
    highlight?: string;
    margin: string;
}

// -----------------------------------------------------------------------------
// Portfolio-related Props
// -----------------------------------------------------------------------------

export interface ContentCardProps {
    item: {
        category: string;
        title: string;
        description: string;
    };
    index: number;
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

export interface PortfolioFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export interface PortfolioGridProps {
    portfolios: Portfolio[];
}

export interface SectionWrapperProps {
    title: string;
    subtitle: string;
    sectionContentMaxWidth?: string;
    background?: "gradientUp" | "gradientDown" | "none";
    vlinePosition?: "left" | "right";
    hasSectionBodyPadding?: boolean;
    children: React.ReactNode;
}

// -----------------------------------------------------------------------------
// Accordion-related Props
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// Quote/testimonial Props
// -----------------------------------------------------------------------------

export interface QuoteCardProps {
    item: {
        name: string;
        position: string;
        quote: string;
        image: string;
    };
}

// -----------------------------------------------------------------------------
// Social-related Types
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
// Header-related Types
// -----------------------------------------------------------------------------

/**
 * Props for the Header component
 */
export interface HeaderProps {
    className?: string;
}

/**
 * Props for the HeaderLogo component
 */
export interface HeaderLogoProps {
    logo: string;
    className?: string;
}

/**
 * Props for the HeaderMenuToggle component
 */
export interface HeaderMenuToggleProps {
    isMenuOpen: boolean;
    onToggle: () => void;
    className?: string;
}

/**
 * Props for the HeaderThemeToggle component
 */
export interface HeaderThemeToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
    className?: string;
}

/**
 * Theme mode for dark/light theme switching
 */
export type ThemeMode = 'light' | 'dark';

// -----------------------------------------------------------------------------
// Sidebar-related Props
// -----------------------------------------------------------------------------

export interface SidebarMenuItemProps {
    text: string;
    index: number;
    sidebarEntered: boolean;
    prefersReducedMotion: boolean;
    href?: string;
    onClick?: () => void;
}

export interface SidebarProps {
    isMenuOpen: boolean;
    onMenuItemClick?: () => void;
}

export interface WrapperHeaderProps {
    title: string;
    subtitle: string;
}

export interface GenericSwiperProps<T> {
    items: T[];
    spaceBetween?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
}

export interface SkillCardProps {
    item: { name: string; description: string; experience_years: number };
    variants?: any;
    prefersReducedMotion?: boolean;
}