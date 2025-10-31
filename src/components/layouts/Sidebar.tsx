// ============================================================
// Component: Sidebar
// Purpose: Mobile navigation sidebar with menu items and social links
// ============================================================

"use client";

import React from "react";

import type { SidebarProps } from "@/types";

import useSidebarAnimation from "./hooks/useSidebarAnimation";
import { SIDEBAR_CONFIG } from "@/config";
import { generateSocialLinks } from "@/components/ui/social";
import { VerticalRule, SocialLinks, NavItem } from "@/components";

// ============================================================
// Constants
// ============================================================

const SECTION_DISPLAY_NAMES: Record<string, string> = {
    hero: "Home",
    services: "Services",
    skills: "Skills",
    portfolios: "Portfolios",
    resume: "Resume",
    certificates: "Certificates",
    testimonials: "Testimonials",
    pricing: "Pricing",
    blog: "Blog",
    contact: "Contact",
    map: "Map",
};

// ============================================================
// Component Definition
// ============================================================

/**
 * Sidebar component renders a mobile navigation sidebar.
 * Features menu items, social links, and smooth animations.
 *
 * @param props - Component props
 * @param props.profile - User profile data
 * @param props.isMenuOpen - Whether the sidebar is open
 * @param props.enabledSections - Available navigation sections
 * @returns Sidebar component
 */
const Sidebar: React.FC<SidebarProps> = ({
    profile,
    isMenuOpen,
    enabledSections,
    ...props
}) => {
    // ============================================================
    // Custom Hooks
    // ============================================================

    const { sidebarEntered, handleTransitionEnd } =
        useSidebarAnimation(isMenuOpen);

    // ============================================================
    // Data Processing
    // ============================================================

    const socialLinks = generateSocialLinks(profile.social_links);

    const menuItems = enabledSections
        ? enabledSections
              .filter((section) => section.enabled && section.id)
              .map(
                  (section) => SECTION_DISPLAY_NAMES[section.id!] || section.id!
              )
        : SIDEBAR_CONFIG.MENU_ITEMS;

    const sidebarClasses = `sidebar ${isMenuOpen ? "sidebar-visible" : "sidebar-hidden"}`;

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className={sidebarClasses}
            onTransitionEnd={handleTransitionEnd}
            role="navigation"
            aria-label="Main navigation menu"
            data-testid="sidebar"
            {...props}
        >
            <div className="sidebar-content">
                <div className="sidebar-container-inner">
                    <div className="sidebar-row">
                        <div className="sidebar-column">
                            {/* Navigation Menu */}
                            <nav
                                className="sidebar-menu-container"
                                aria-label="Navigation menu"
                            >
                                <ul role="menubar">
                                    {menuItems.map((item, index) => (
                                        <NavItem
                                            key={item}
                                            text={item}
                                            index={index}
                                            sidebarEntered={sidebarEntered}
                                            data-testid={`nav-item-${item.toLowerCase()}`}
                                        />
                                    ))}
                                </ul>
                            </nav>

                            {/* Social Links */}
                            <SocialLinks
                                links={socialLinks}
                                iconSize={SIDEBAR_CONFIG.SOCIAL_LINKS.iconSize}
                                iconMargin={
                                    SIDEBAR_CONFIG.SOCIAL_LINKS.iconMargin
                                }
                                containerMargin={
                                    SIDEBAR_CONFIG.SOCIAL_LINKS.containerMargin
                                }
                                data-testid="sidebar-social-links"
                            />

                            {/* Vertical Rule */}
                            <VerticalRule
                                left={SIDEBAR_CONFIG.VLINE.left}
                                top={SIDEBAR_CONFIG.VLINE.top}
                                bottom={SIDEBAR_CONFIG.VLINE.bottom}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
