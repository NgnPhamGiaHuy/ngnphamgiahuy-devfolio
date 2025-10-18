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

export const getIconForPlatform = (
    platform: SocialPlatform
): React.ComponentType<React.ComponentProps<"svg">> => {
    switch (platform.toLowerCase()) {
        case "github":
            return CodeBracketIcon;
        case "facebook":
            return GlobeAltIcon;
        case "linkedin":
            return UserIcon;
        default:
            return GlobeAltIcon;
    }
};

export const generateSocialLinks = (
    socialLinks: RawSocialLink[]
): SocialLink[] => {
    return socialLinks.map((link) => {
        if (link.icon) {
            const alt = getImageAlt(
                link.icon as SanityImage | string,
                `${link.platform} icon`
            );
            const url = resolveImageUrl(link.icon as SanityImage | string, {
                width: 48,
                height: 48,
                fallbackImage: "",
            });

            return {
                href: link.url,
                icon: ({ className }) => (
                    <Image
                        src={url}
                        alt={alt}
                        width={24}
                        height={24}
                        className={`${className} filter brightness-0 dark:invert`}
                    />
                ),
                ariaLabel: `${link.platform} Profile`,
            };
        }

        return {
            href: link.url,
            icon: (props) => {
                const Icon = getIconForPlatform(link.platform);
                return <Icon {...props} />;
            },
            ariaLabel: `${link.platform} Profile`,
        };
    });
};
