import * as React from "react";

// -----------------------------------------------------------------------------
// Common/Shared Component Types
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

/**
 * Props for the WrapperHeader component
 */
export interface WrapperHeaderProps {
    title: string;
    subtitle: string;
    isInView?: boolean;
}

/**
 * Generic swiper component props
 */
export interface GenericSwiperProps<T> {
    items: T[];
    spaceBetween?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
}

/**
 * Props for the SkillCard component
 */
export interface SkillCardProps {
    item: { name: string; description: string; experience_years: number };
    variants?: any;
    prefersReducedMotion?: boolean;
}
