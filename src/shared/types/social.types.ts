import { ReactElement } from "react";

import type { SanityImageType } from "@/schemas";

export type SocialPlatform = "github" | "facebook" | "linkedin" | string;

export interface RawSocialLink {
    platform: SocialPlatform;
    url: string;
    icon: SanityImageType | string;
}

export interface SocialLink {
    href: string;
    icon: (props: { className?: string }) => ReactElement;
    ariaLabel?: string;
}
