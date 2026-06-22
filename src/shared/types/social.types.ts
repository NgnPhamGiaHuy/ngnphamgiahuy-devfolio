import { ReactElement } from "react";

export type SocialPlatform = "github" | "facebook" | "linkedin" | string;

export interface SocialIconRef {
    library: string;
    name: string;
}

export interface RawSocialLink {
    platform: SocialPlatform;
    url: string;
    icon?: SocialIconRef;
}

export interface SocialLink {
    href: string;
    icon: (props: { className?: string }) => ReactElement;
    ariaLabel?: string;
}
