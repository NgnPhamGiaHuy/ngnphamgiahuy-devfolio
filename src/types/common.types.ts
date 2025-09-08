import * as React from "react";

export interface AnimatedTextCharacterProps {
    text: string;
    baseDelay?: number;
    className?: string;
    containerClassName?: string;
    staggerDelay?: number;
    ease?: string;
    duration?: number;
}

export interface BackgroundTextProps {
    text: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    className?: string;
}

export interface StatCardProps {
    value: string;
    label: string;
    highlight?: string;
    className?: string;
    width?: string;
    height?: string;
    margin?: string;
}

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

export interface WrapperHeaderProps {
    title: string;
    subtitle: string;
    isInView?: boolean;
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
