// ============================================================
// Component: SiteHeader
// Purpose: Main site header with navigation, theme toggle, and menu
// ============================================================

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { SiteHeaderProps } from "@/shared/types";

import useMenuState from "./hooks/useMenuState";
import useHeaderScroll from "./hooks/useHeaderScroll";
import { buildMenuItems, useActiveSection } from "./hooks/useNavSections";
import { getHeaderClasses } from "@/shared/utils";
import { BrandLink, MenuToggle, Sidebar, ThemeToggle } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * SiteHeader component renders the main site header.
 * Features responsive navigation, theme toggle, and mobile menu.
 *
 * @param props - Component props
 * @param props.profile - User profile data
 * @param props.className - Additional CSS classes
 * @param props.logo - Site logo text
 * @param props.enabledSections - Available navigation sections
 * @returns Site header component
 */
const SiteHeader: React.FC<SiteHeaderProps> = ({
    profile,
    className,
    logo = "Portfolio",
    enabledSections,
    ...props
}) => {
    // ============================================================
    // State & Refs
    // ============================================================

    const headerRef = useRef<HTMLElement>(null);

    // ============================================================
    // Custom Hooks
    // ============================================================

    const { isMenuOpen, toggleMenu } = useMenuState();
    const { headerState, handleAnimationEnd } = useHeaderScroll();

    // ============================================================
    // Data Processing
    // ============================================================

    const headerClassNames = `${getHeaderClasses(headerState)} ${className || ""}`;

    // Menu items + scroll-spy are shared between the desktop bar and the
    // mobile off-canvas sheet (single source of truth).
    const menuItems = buildMenuItems(enabledSections);
    const activeId = useActiveSection(menuItems.map((i) => i.id));

    // On the home page, anchors are pure hash links (same-page scroll); on other
    // routes they're root-relative so they navigate home then scroll.
    const onHome = usePathname() === "/";
    const hrefFor = (id: string) => `${onHome ? "" : "/"}#${id}`;

    // ============================================================
    // Render
    // ============================================================

    return (
        <header
            ref={headerRef}
            className={headerClassNames}
            role="banner"
            aria-label={`Site header (${logo})`}
            onAnimationEnd={handleAnimationEnd}
            data-testid="site-header"
            {...props}
        >
            {/* Brand/Logo */}
            <BrandLink logo={logo} />

            {/* Desktop horizontal nav (claude.com top-nav) */}
            <nav className="top-nav mx-auto" aria-label="Primary">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={hrefFor(item.id)}
                        className="top-nav-link"
                        aria-current={item.id === activeId ? "true" : undefined}
                        prefetch={false}
                        data-testid={`top-nav-link-${item.id}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Right cluster: theme toggle + mobile hamburger */}
            <div className="ml-auto md:ml-0 flex items-center gap-2">
                <ThemeToggle />
                <div className="md:hidden flex items-center">
                    <MenuToggle isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
                </div>
            </div>

            {/* Mobile off-canvas sheet */}
            <Sidebar
                profile={profile}
                isMenuOpen={isMenuOpen}
                menuItems={menuItems}
                activeId={activeId}
            />
        </header>
    );
};

SiteHeader.displayName = "SiteHeader";

export default SiteHeader;
