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

export interface SocialLinksProps {
    links: SocialLink[];
    containerMargin?: string;
    iconMargin?: string;
    iconSize?: string;
    textColor?: string;
    hoverColor?: string;
    className?: string;
}