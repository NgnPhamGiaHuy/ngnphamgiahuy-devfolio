// ============================================================
// Component: SiteHeader
// Purpose: Main site header with navigation, theme toggle, and menu
// ============================================================

"use client";

import React, { useRef } from "react";

import type { SiteHeaderProps } from "@/types";

import useMenuState from "./hooks/useMenuState";
import useHeaderScroll from "./hooks/useHeaderScroll";
import { getHeaderClasses } from "@/utils";
import { BrandLink, ThemeToggle, MenuToggle, Sidebar } from "@/components";

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

    // Remove unnecessary useMemo - simple string concatenation doesn't need memoization
    const headerClassNames = `${getHeaderClasses(headerState)} ${className || ""}`;

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
            <section className="relative">
                <div className="flex-container">
                    {/* Brand/Logo Section */}
                    <div className="flex-base">
                        <BrandLink logo={logo} />
                    </div>

                    {/* Controls Section */}
                    <div className="flex-base">
                        <div className="flex-wrapper">
                            <ThemeToggle />
                            <MenuToggle
                                isMenuOpen={isMenuOpen}
                                onToggle={toggleMenu}
                            />
                            <Sidebar
                                profile={profile}
                                isMenuOpen={isMenuOpen}
                                enabledSections={enabledSections}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

SiteHeader.displayName = "SiteHeader";

export default SiteHeader;
