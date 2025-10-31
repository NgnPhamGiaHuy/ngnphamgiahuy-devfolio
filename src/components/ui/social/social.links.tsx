// ============================================================
// Utility: Social Links Generation (UI)
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

const ICON_DIMENSIONS = {
    WIDTH: 24,
    HEIGHT: 24,
    SANITY_WIDTH: 48,
    SANITY_HEIGHT: 48,
} as const;

const ICON_CLASSES = {
    CUSTOM_ICON: "filter brightness-0 dark:invert",
} as const;

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

const DEFAULT_ICON = GlobeAltIcon;

// ============================================================
// Types
// ============================================================

interface IconProps {
    className?: string;
}

interface SocialLinkOptions {
    includeCustomIcons?: boolean;
    iconDimensions?: {
        width: number;
        height: number;
    };
}

// ============================================================
// Utility Functions
// ============================================================
/**
 * getIconForPlatform returns a heroicon component matching the provided platform.
 * Falls back to a generic globe icon for unknown platforms.
 */
export const getIconForPlatform = (
    platform: SocialPlatform
): React.ComponentType<React.ComponentProps<"svg">> => {
    const normalizedPlatform = platform.toLowerCase().trim();
    return PLATFORM_ICONS[normalizedPlatform] || DEFAULT_ICON;
};

export const generateSocialLinks = (
    socialLinks: RawSocialLink[],
    options: SocialLinkOptions = {}
): SocialLink[] => {
    /**
     * generateSocialLinks maps raw social link records to render-ready link configs.
     * Optionally uses custom images for icons if provided.
     */
    const {
        includeCustomIcons = true,
        iconDimensions = {
            width: ICON_DIMENSIONS.WIDTH,
            height: ICON_DIMENSIONS.HEIGHT,
        },
    } = options;

    if (!Array.isArray(socialLinks)) {
        console.warn("generateSocialLinks: Expected array of social links");
        return [];
    }

    return socialLinks.map((link, index) => {
        if (!link || !link.platform || !link.url) {
            console.warn(`Invalid social link at index ${index}:`, link);
            return createFallbackLink(link, iconDimensions);
        }

        if (includeCustomIcons && link.icon) {
            return createCustomIconLink(link, iconDimensions);
        }

        return createPlatformIconLink(link, iconDimensions);
    });
};

const createCustomIconLink = (
    link: RawSocialLink,
    dimensions: { width: number; height: number }
): SocialLink => {
    /**
     * createCustomIconLink builds a SocialLink using a custom image icon.
     * Adds light/dark compatibility and lazy loading to the image.
     */
    try {
        const alt = getImageAlt(
            link.icon as SanityImage | string,
            `${link.platform} icon`
        );

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

const createPlatformIconLink = (
    link: RawSocialLink,
    dimensions: { width: number; height: number }
): SocialLink => {
    /**
     * createPlatformIconLink builds a SocialLink using a heroicon for the platform.
     */
    const IconComponent = getIconForPlatform(link.platform);

    return {
        href: link.url,
        icon: (props: IconProps) => <IconComponent {...props} />,
        ariaLabel: `${link.platform} Profile`,
    };
};

const createFallbackLink = (
    link: RawSocialLink,
    dimensions: { width: number; height: number }
): SocialLink => {
    /**
     * createFallbackLink is a final safety for malformed link records.
     */
    return {
        href: link?.url || "#",
        icon: (props: IconProps) => <DEFAULT_ICON {...props} />,
        ariaLabel: "Social Profile",
    };
};
