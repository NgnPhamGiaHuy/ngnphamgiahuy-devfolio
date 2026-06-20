// ============================================================
// Component: NavItem
// Purpose: Navigation menu item with staggered animations and accessibility
// ============================================================

"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import type { NavItemProps } from "@/shared/types";

import { SIDEBAR_CONFIG } from "@/infrastructure/config";

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
    sectionId: sectionIdProp,
    active,
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
    const derivedId =
        base.replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "") || base || "";
    // Pure hash on home (same-page scroll); root-relative elsewhere so the nav
    // navigates home then scrolls (e.g. /portfolios -> /#projects).
    const onHome = usePathname() === "/";
    const sectionId = sectionIdProp || derivedId;
    const href = sectionId ? `${onHome ? "" : "/"}#${sectionId}` : "/";

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
                className={`focus:outline-none ${active ? "nav-item-active" : ""}`}
                aria-label={`Navigate to ${text} section`}
                aria-current={active ? "true" : undefined}
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
