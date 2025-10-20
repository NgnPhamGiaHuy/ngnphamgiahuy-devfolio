import Link from "next/link";
import React, { useMemo } from "react";

import type { SocialLinksProps } from "@/types";

const SocialLinks: React.FC<SocialLinksProps> = ({
    links,
    containerMargin = "m-0",
    iconSize = "size-5",
    iconMargin = "m-0",
    textColor = "text-inverse",
    hoverColor = "hover:text-primary",
    className = "",
}) => {
    const safeLinks = useMemo(
        () => (Array.isArray(links) ? links.filter(Boolean) : []),
        [links]
    );

    const containerClass = useMemo(
        () => `${containerMargin} relative z-3 ${className}`,
        [containerMargin, className]
    );

    const iconWrapperClass = useMemo(
        () =>
            `${iconMargin} ${textColor} ${hoverColor} align-top leading-none transition-all duration-300 inline-block relative`,
        [iconMargin, textColor, hoverColor]
    );

    if (!safeLinks.length) {
        return null;
    }

    return (
        <div
            className={containerClass}
            role={"group"}
            aria-label={"Social links"}
        >
            {safeLinks.map((link) => {
                const key = `${link.href}`;
                const ariaLabel =
                    link.ariaLabel || `Open ${link.href} in a new tab`;

                return (
                    <Link
                        key={key}
                        href={link.href}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                        aria-label={ariaLabel}
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
