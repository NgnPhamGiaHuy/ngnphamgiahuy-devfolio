// ============================================================
// Component: SocialLinks
// Purpose: Social media links with customizable styling and accessibility
// ============================================================

import Link from "next/link";
import React from "react";

import type { SocialLinksProps } from "@/types";

// ============================================================
// Component Definition
// ============================================================

/**
 * SocialLinks component renders a collection of social media links.
 * Features customizable styling, accessibility, and proper link handling.
 *
 * @param props - Component props
 * @param props.links - Array of social link objects
 * @param props.containerMargin - Container margin classes
 * @param props.iconSize - Icon size classes
 * @param props.iconMargin - Icon margin classes
 * @param props.textColor - Text color classes
 * @param props.hoverColor - Hover color classes
 * @param props.className - Additional CSS classes
 * @returns Social links component
 */
const SocialLinks: React.FC<SocialLinksProps> = ({
    links,
    containerMargin = "m-0",
    iconSize = "size-5",
    iconMargin = "m-0",
    textColor = "text-inverse",
    hoverColor = "hover:text-primary",
    className = "",
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple array filtering doesn't need memoization
    const safeLinks = Array.isArray(links) ? links.filter(Boolean) : [];

    // Remove unnecessary useMemo - simple string concatenation doesn't need memoization
    const containerClass = `${containerMargin} relative z-3 ${className}`;
    const iconWrapperClass = `${iconMargin} ${textColor} ${hoverColor} align-top leading-none transition-all duration-300 inline-block relative`;

    // ============================================================
    // Render
    // ============================================================

    if (!safeLinks.length) {
        return null;
    }

    return (
        <div
            className={containerClass}
            role="group"
            aria-label="Social links"
            data-testid="social-links"
            {...props}
        >
            {safeLinks.map((link) => {
                const key = `${link.href}`;
                const ariaLabel =
                    link.ariaLabel || `Open ${link.href} in a new tab`;

                return (
                    <Link
                        key={key}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={ariaLabel}
                        prefetch={false}
                        data-testid={`social-link-${key}`}
                    >
                        <span className={iconWrapperClass}>
                            {link.icon({ className: iconSize })}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
};

SocialLinks.displayName = "SocialLinks";

export default SocialLinks;
