import { ReactElement } from "react";

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