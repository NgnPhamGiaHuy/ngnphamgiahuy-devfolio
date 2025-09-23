import * as React from "react";

import { UseFormRegisterReturn } from "react-hook-form";

import type { Profile } from "../sanity.types";
import type { SocialLink } from "../social.types";

export type { BrandLinkProps, MenuToggleProps, NavItemProps, ThemeToggleProps } from "./navigation.types";
export type { AccordionItemProps, AccordionContentProps, AccordionProps, AccordionFieldMapping, AccordionItemData } from "./accordion.types";

export interface ArrowLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export interface AnimatedTextProps {
    text: string;
    baseDelay?: number;
    className?: string;
    containerClassName?: string;
    staggerDelay?: number;
    ease?: string;
    duration?: number;
}

export interface BackdropTextProps {
    text: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    className?: string;
}
export interface ContentCarouselProps<T> {
    items: T[];
    spaceBetween?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
}

export interface DownloadResumeButtonProps {
    cvLink?: string;
}
export interface FormInputProps {
    id: string;
    label: string;
    placeholder?: string;
    type?: string;
    isTextArea?: boolean;
    cols?: number;
    rows?: number;
    error?: string;
    registration: UseFormRegisterReturn;
    className?: string;
}

export interface FormStatusProps {
    submitStatus: {
        type: "success" | "error";
        message: string;
    } | null;
}

export interface SidebarProps {
    profile: Profile;
    isMenuOpen: boolean;
}
export interface SiteHeaderProps {
    profile: Profile;
    logo?: string;
    className?: string;
}
export interface SocialLinksProps {
    links: SocialLink[];
    containerMargin?: string;
    iconMargin?: string;
    iconSize?: string;
    textColor?: string;
    hoverColor?: string;
    className?: string;
}
export interface SubmitButtonProps {
    isSubmitting: boolean;
}

export interface VerticalRuleProps {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    width?: string;
    shadow?: string;
    showPattern?: boolean;
    className?: string;
}