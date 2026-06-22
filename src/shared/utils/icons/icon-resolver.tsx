// ============================================================
// Icon resolver — converts a SocialIconRef to a React component.
// ============================================================
import React from "react";
import {
    Github, Linkedin, Twitter, Instagram, Facebook, Youtube,
    Twitch, Gitlab, Codepen, Figma, Terminal, Code2,
    Globe, Mail, Phone, Rss, BookOpen, ExternalLink, AtSign,
    GlobeIcon,
} from "lucide-react";

import type { SocialIconRef } from "@/shared/types";

import { CUSTOM_ICON_PATHS } from "./social-icon-catalog";

// Static lookup map — fully tree-shakeable
const LUCIDE_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    Github, Linkedin, Twitter, Instagram, Facebook, Youtube,
    Twitch, Gitlab, Codepen, Figma, Terminal, Code2,
    Globe, Mail, Phone, Rss, BookOpen, ExternalLink, AtSign,
};

interface IconProps {
    className?: string;
}

const CustomSvgIcon: React.FC<{ path: string } & IconProps> = ({ path, className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        <path d={path} />
    </svg>
);

/**
 * Resolve a SocialIconRef to a React element.
 * Falls back to Globe when the reference is unknown.
 */
export const resolveIcon = (
    ref: SocialIconRef | undefined,
    props: IconProps = {}
): React.ReactElement => {
    if (!ref) return <GlobeIcon {...props} />;

    if (ref.library === "lucide") {
        const Component = LUCIDE_MAP[ref.name];
        return Component ? <Component {...props} /> : <GlobeIcon {...props} />;
    }

    if (ref.library === "custom") {
        const path = CUSTOM_ICON_PATHS[ref.name];
        return path ? (
            <CustomSvgIcon path={path} {...props} />
        ) : (
            <GlobeIcon {...props} />
        );
    }

    // library === "legacy": old SVG file paths are handled by the caller (Image tag)
    return <GlobeIcon {...props} />;
};

/**
 * Returns a render function `(props: { className? }) => ReactElement`
 * compatible with the SocialLink.icon signature.
 */
export const resolveIconFn = (
    ref: SocialIconRef | undefined
): ((props: IconProps) => React.ReactElement) =>
    (props) => resolveIcon(ref, props);
