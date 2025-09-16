import { ReactElement } from "react";

export type SocialPlatform = "github" | "facebook" | "linkedin" | string;

export interface RawSocialLink {
    platform: SocialPlatform;
    url: string;
}

export interface SocialLink {
    href: string;
    icon: (props: { className?: string }) => ReactElement;
    ariaLabel?: string;
}

