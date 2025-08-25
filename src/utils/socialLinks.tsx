import React from "react";
import { SocialLink, SocialPlatform, RawSocialLink } from "@/types";
import { CodeBracketIcon, GlobeAltIcon, UserIcon } from "@heroicons/react/24/outline";

export const getIconForPlatform = (platform: SocialPlatform): React.ComponentType<React.ComponentProps<"svg">> => {
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

export const generateSocialLinks = (socialLinks: RawSocialLink[]) : SocialLink[] => {
    return socialLinks.map((link) => ({
        href: link.url,
        icon: (props) => {
            const Icon = getIconForPlatform(link.platform);
            return <Icon {...props} />;
        },
        ariaLabel: `${link.platform} Profile`,
    }));
};
