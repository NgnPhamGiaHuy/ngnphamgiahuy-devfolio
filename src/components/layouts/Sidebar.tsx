"use client";

import React from "react";

import type { SidebarProps } from "@/shared/types";

import useSidebarAnimation from "./hooks/useSidebarAnimation";
import { SIDEBAR_CONFIG } from "@/infrastructure/config";
import { generateSocialLinks } from "@/components/ui/social";
import { NavItem, SocialLinks, VerticalRule } from "@/components";

const Sidebar: React.FC<SidebarProps> = ({
    profile,
    isMenuOpen,
    menuItems,
    activeId,
    ...props
}) => {
    const { sidebarEntered, handleTransitionEnd } =
        useSidebarAnimation(isMenuOpen);

    const socialLinks = generateSocialLinks(profile.social_links);

    const sidebarClasses = `sidebar ${isMenuOpen ? "sidebar-visible" : "sidebar-hidden"}`;

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
                                            key={item.id}
                                            text={item.label}
                                            sectionId={item.id}
                                            active={item.id === activeId}
                                            index={index}
                                            sidebarEntered={sidebarEntered}
                                            data-testid={`nav-item-${item.id}`}
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
