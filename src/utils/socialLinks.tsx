// ============================================================
// Utility: Social Links Generation
// Purpose: Social media link generation with icon mapping and accessibility
// ============================================================

import React from "react";
import Image from "next/image";
import {
    CodeBracketIcon,
    GlobeAltIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import type {
    SocialLink,
    SocialPlatform,
    RawSocialLink,
    SanityImage,
} from "@/types";

import { resolveImageUrl, getImageAlt } from "@/utils";

// ============================================================
// Constants
// ============================================================

/** Default icon dimensions for custom icons */
const ICON_DIMENSIONS = {
    WIDTH: 24,
    HEIGHT: 24,
    SANITY_WIDTH: 48,
    SANITY_HEIGHT: 48,
} as const;

/** Icon CSS classes for styling */
const ICON_CLASSES = {
    CUSTOM_ICON: "filter brightness-0 dark:invert",
} as const;

/** Platform icon mapping */
const PLATFORM_ICONS: Record<
    string,
    React.ComponentType<React.ComponentProps<"svg">>
> = {
    github: CodeBracketIcon,
    facebook: GlobeAltIcon,
    linkedin: UserIcon,
    twitter: GlobeAltIcon,
    instagram: GlobeAltIcon,
    youtube: GlobeAltIcon,
    discord: GlobeAltIcon,
    telegram: GlobeAltIcon,
    whatsapp: GlobeAltIcon,
} as const;

/** Default fallback icon */
const DEFAULT_ICON = GlobeAltIcon;

// ============================================================
// Types
// ============================================================

/** Icon component props */
interface IconProps {
    className?: string;
}

/** Social link generation options */
interface SocialLinkOptions {
    /** Whether to include custom icons */
    includeCustomIcons?: boolean;
    /** Custom icon dimensions */
    iconDimensions?: {
        width: number;
        height: number;
    };
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Gets the appropriate icon component for a social platform.
 * Maps platform names to Heroicons components with fallback support.
 *
 * @param platform - Social platform name
 * @returns Icon component for the platform
 *
 * @example
 * ```typescript
 * const GitHubIcon = getIconForPlatform("github"); // CodeBracketIcon
 * const LinkedInIcon = getIconForPlatform("linkedin"); // UserIcon
 * const UnknownIcon = getIconForPlatform("unknown"); // GlobeAltIcon (fallback)
 * ```
 */
export const getIconForPlatform = (
    platform: SocialPlatform
): React.ComponentType<React.ComponentProps<"svg">> => {
    // Normalize platform name for case-insensitive matching
    const normalizedPlatform = platform.toLowerCase().trim();

    // Return mapped icon or default fallback
    return PLATFORM_ICONS[normalizedPlatform] || DEFAULT_ICON;
};

/**
 * Generates social links with icons and accessibility attributes.
 * Handles both custom icons and platform-specific icons with proper ARIA labels.
 *
 * @param socialLinks - Array of raw social link data
 * @param options - Generation options
 * @returns Array of processed social links
 *
 * @example
 * ```typescript
 * const links = generateSocialLinks([
 *   { platform: "github", url: "https://github.com/user" },
 *   { platform: "linkedin", url: "https://linkedin.com/in/user", icon: customIcon }
 * ]);
 *
 * // Returns array with proper icons and accessibility attributes
 * ```
 */
export const generateSocialLinks = (
    socialLinks: RawSocialLink[],
    options: SocialLinkOptions = {}
): SocialLink[] => {
    const {
        includeCustomIcons = true,
        iconDimensions = {
            width: ICON_DIMENSIONS.WIDTH,
            height: ICON_DIMENSIONS.HEIGHT,
        },
    } = options;

    // Validate input
    if (!Array.isArray(socialLinks)) {
        console.warn("generateSocialLinks: Expected array of social links");
        return [];
    }

    return socialLinks.map((link, index) => {
        // Validate link structure
        if (!link || !link.platform || !link.url) {
            console.warn(`Invalid social link at index ${index}:`, link);
            return createFallbackLink(link, iconDimensions);
        }

        // Handle custom icons
        if (includeCustomIcons && link.icon) {
            return createCustomIconLink(link, iconDimensions);
        }

        // Handle platform-specific icons
        return createPlatformIconLink(link, iconDimensions);
    });
};

/**
 * Creates a social link with custom icon from Sanity or URL.
 *
 * @param link - Raw social link data
 * @param dimensions - Icon dimensions
 * @returns Social link with custom icon
 */
const createCustomIconLink = (
    link: RawSocialLink,
    dimensions: { width: number; height: number }
): SocialLink => {
    try {
        // Generate alt text for custom icon
        const alt = getImageAlt(
            link.icon as SanityImage | string,
            `${link.platform} icon`
        );

        // Resolve icon URL with proper dimensions
        const url = resolveImageUrl(link.icon as SanityImage | string, {
            width: ICON_DIMENSIONS.SANITY_WIDTH,
            height: ICON_DIMENSIONS.SANITY_HEIGHT,
            fallbackImage: "",
        });

        return {
            href: link.url,
            icon: ({ className }: IconProps) => (
                <Image
                    src={url}
                    alt={alt}
                    width={dimensions.width}
                    height={dimensions.height}
                    className={`${className || ""} ${ICON_CLASSES.CUSTOM_ICON}`}
                    loading="lazy"
                />
            ),
            ariaLabel: `${link.platform} Profile`,
        };
    } catch (error) {
        console.error(
            `Error processing custom icon for ${link.platform}:`,
            error
        );
        return createPlatformIconLink(link, dimensions);
    }
};

/**
 * Creates a social link with platform-specific icon.
 *
 * @param link - Raw social link data
 * @param dimensions - Icon dimensions
 * @returns Social link with platform icon
 */
const createPlatformIconLink = (
    link: RawSocialLink,
    dimensions: { width: number; height: number }
): SocialLink => {
    const IconComponent = getIconForPlatform(link.platform);

    return {
        href: link.url,
        icon: (props: IconProps) => <IconComponent {...props} />,
        ariaLabel: `${link.platform} Profile`,
    };
};

/**
 * Creates a fallback social link for invalid data.
 *
 * @param link - Raw social link data (may be invalid)
 * @param dimensions - Icon dimensions
 * @returns Fallback social link
 */
const createFallbackLink = (
    link: RawSocialLink,
    dimensions: { width: number; height: number }
): SocialLink => {
    return {
        href: link?.url || "#",
        icon: (props: IconProps) => <DEFAULT_ICON {...props} />,
        ariaLabel: "Social Profile",
    };
};

/**
 * Validates social link data structure.
 *
 * @param link - Social link to validate
 * @returns True if valid, false otherwise
 *
 * @example
 * ```typescript
 * const isValid = validateSocialLink({ platform: "github", url: "https://github.com/user" });
 * console.log(isValid); // true
 * ```
 */
export const validateSocialLink = (link: unknown): link is RawSocialLink => {
    return (
        typeof link === "object" &&
        link !== null &&
        "platform" in link &&
        "url" in link &&
        typeof (link as any).platform === "string" &&
        typeof (link as any).url === "string"
    );
};

/**
 * Filters social links by platform.
 *
 * @param socialLinks - Array of social links
 * @param platforms - Platforms to include
 * @returns Filtered social links
 *
 * @example
 * ```typescript
 * const githubLinks = filterSocialLinksByPlatform(links, ["github"]);
 * const socialLinks = filterSocialLinksByPlatform(links, ["github", "linkedin"]);
 * ```
 */
export const filterSocialLinksByPlatform = (
    socialLinks: RawSocialLink[],
    platforms: SocialPlatform[]
): RawSocialLink[] => {
    const normalizedPlatforms = platforms.map((p) => p.toLowerCase());

    return socialLinks.filter((link) =>
        normalizedPlatforms.includes(link.platform.toLowerCase())
    );
};
