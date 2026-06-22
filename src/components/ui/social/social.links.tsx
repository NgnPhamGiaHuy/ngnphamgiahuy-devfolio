import React from "react";
import Image from "next/image";
import {
    CodeBracketIcon,
    GlobeAltIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import type { RawSocialLink, SocialLink, SocialPlatform } from "@/shared";

import { getImageAlt, resolveImageUrl } from "@/shared";
import { resolveIconFn } from "@/shared/utils/icons";

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
            // New format: { library, name } — use icon resolver
            if (typeof link.icon === "object" && link.icon.library !== "legacy") {
                return {
                    href: link.url,
                    icon: resolveIconFn(link.icon),
                    ariaLabel: `${link.platform} Profile`,
                };
            }
            // Legacy format: { library: "legacy", name: "/icons/..." } — render as Image
            return createCustomIconLink(link, iconDimensions);
        }

        return createPlatformIconLink(link, iconDimensions);
    });
};

const createCustomIconLink = (
    link: RawSocialLink,
    dimensions: { width: number; height: number }
): SocialLink => {
    // link.icon here is always { library: "legacy", name: "/path/to/icon.svg" }
    const iconPath = link.icon?.name;
    try {
        const alt = getImageAlt(iconPath, `${link.platform} icon`);

        const url = resolveImageUrl(iconPath, {
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
    return {
        href: link?.url || "#",
        icon: (props: IconProps) => <DEFAULT_ICON {...props} />,
        ariaLabel: "Social Profile",
    };
};
