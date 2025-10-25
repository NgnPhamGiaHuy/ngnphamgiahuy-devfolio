// ============================================================
// Component: NavItem
// Purpose: Navigation menu item with staggered animations and accessibility
// ============================================================

import Link from "next/link";
import React from "react";

import type { NavItemProps } from "@/types";

import { SIDEBAR_CONFIG } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * NavItem component renders a navigation menu item.
 * Features staggered animations, accessibility, and proper link handling.
 *
 * @param props - Component props
 * @param props.text - Navigation item text
 * @param props.index - Item index for animation timing
 * @param props.sidebarEntered - Whether sidebar animation has completed
 * @returns Navigation item component
 */
const NavItem: React.FC<NavItemProps> = ({
    text,
    index,
    sidebarEntered,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const itemClasses = `nav-item ${sidebarEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`;

    const itemStyle: React.CSSProperties = {
        transitionDelay: `${index * SIDEBAR_CONFIG.ANIMATION.ITEM_STAGGER_DELAY}ms`,
    };

    const base = (text || "").toString().toLowerCase().trim();
    const sectionId =
        base.replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "") || base || "";
    const href = sectionId ? `#${sectionId}` : "#";

    const letters = Array.from(text);

    // ============================================================
    // Render Functions
    // ============================================================

    const renderMenuItem = () => (
        <span className="nav-item-text group">
            {letters.map((letter, letterIndex) => (
                <span
                    key={`${sectionId}-${letterIndex}`}
                    className="nav-item-letter"
                    style={{
                        transitionDelay: `${letterIndex * SIDEBAR_CONFIG.ANIMATION.LETTER_STAGGER_DELAY}ms`,
                    }}
                >
                    {letter}
                </span>
            ))}
        </span>
    );

    // ============================================================
    // Render
    // ============================================================

    return (
        <li
            className={itemClasses}
            style={itemStyle}
            role="menuitem"
            data-testid="nav-item"
            {...props}
        >
            <Link
                href={href}
                className="focus:outline-none"
                aria-label={`Navigate to ${text} section`}
                title={`Navigate to ${text}`}
                tabIndex={sidebarEntered ? 0 : -1}
                prefetch={false}
                data-testid={`nav-item-link-${sectionId}`}
            >
                {renderMenuItem()}
            </Link>
        </li>
    );
};

NavItem.displayName = "NavItem";

export default NavItem;
