import Link from "next/link";
import React, { memo } from "react";

import type { NavItemProps } from "@/types";

import { SIDEBAR_CONFIG } from "@/config";

const NavItem: React.FC<NavItemProps> = memo(({ text, index, sidebarEntered }) => {
    const itemClasses = `nav-item ${sidebarEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`;

    const itemStyle = {
        transitionDelay: `${index * SIDEBAR_CONFIG.ANIMATION.ITEM_STAGGER_DELAY}ms`,
    } as React.CSSProperties;

    const href = `#${text.toLowerCase()}`;

    const renderMenuItem = () => (
        <span className={"nav-item-text group"}>
            {text.split("").map((letter, letterIndex) => (
                <span
                    key={letterIndex}
                    className={"nav-item-letter"}
                    style={{ transitionDelay: `${letterIndex * SIDEBAR_CONFIG.ANIMATION.LETTER_STAGGER_DELAY}ms` }}
                >
                    {letter}
                </span>
            ))}
        </span>
    );

    return (
        <li className={itemClasses} style={itemStyle} role={"menuitem"}>
            <Link
                href={href}
                className={"focus:outline-none"}
                aria-label={`Navigate to ${text} section`}
                tabIndex={sidebarEntered ? 0 : -1}
            >
                {renderMenuItem()}
            </Link>
        </li>
    );
});

NavItem.displayName = "NavItem";

export default NavItem;
