import { ReactElement } from "react";
import { SanityImage } from "./sanity.types";

export type SocialPlatform = "github" | "facebook" | "linkedin" | string;

export interface RawSocialLink {
    platform: SocialPlatform;
    url: string;
    icon: SanityImage | string;
}

export interface SocialLink {
    href: string;
    icon: (props: { className?: string }) => ReactElement;
    ariaLabel?: string;
}

