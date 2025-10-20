"use client";

import React, { useMemo } from "react";

import type { SidebarProps } from "@/types";

import { SIDEBAR_CONFIG } from "@/config";
import { generateSocialLinks } from "@/utils";
import { useSidebarAnimation } from "@/hooks";
import { VerticalRule, SocialLinks, NavItem } from "@/components";

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

const Sidebar: React.FC<SidebarProps> = ({
    profile,
    isMenuOpen,
    enabledSections,
}) => {
    const { sidebarEntered, handleTransitionEnd } =
        useSidebarAnimation(isMenuOpen);

    const socialLinks = useMemo(
        () => generateSocialLinks(profile.social_links),
        [profile.social_links]
    );

    const menuItems = useMemo(() => {
        if (enabledSections) {
            return enabledSections
                .filter((section) => section.enabled && section.id)
                .map(
                    (section) =>
                        SECTION_DISPLAY_NAMES[section.id!] || section.id!
                );
        }
        return SIDEBAR_CONFIG.MENU_ITEMS;
    }, [enabledSections]);

    const sidebarClasses = useMemo(
        () => `sidebar ${isMenuOpen ? "sidebar-visible" : "sidebar-hidden"}`,
        [isMenuOpen]
    );

    return (
        <div
            className={sidebarClasses}
            onTransitionEnd={handleTransitionEnd}
            role={"navigation"}
            aria-label={"Main navigation menu"}
        >
            <div className={"sidebar-content"}>
                <div className={"sidebar-container-inner"}>
                    <div className={"sidebar-row"}>
                        <div className={"sidebar-column"}>
                            <nav
                                className={"sidebar-menu-container"}
                                aria-label={"Navigation menu"}
                            >
                                <ul role={"menubar"}>
                                    {menuItems.map((item, index) => (
                                        <NavItem
                                            key={item}
                                            text={item}
                                            index={index}
                                            sidebarEntered={sidebarEntered}
                                        />
                                    ))}
                                </ul>
                            </nav>
                            <SocialLinks
                                links={socialLinks}
                                iconSize={SIDEBAR_CONFIG.SOCIAL_LINKS.iconSize}
                                iconMargin={
                                    SIDEBAR_CONFIG.SOCIAL_LINKS.iconMargin
                                }
                                containerMargin={
                                    SIDEBAR_CONFIG.SOCIAL_LINKS.containerMargin
                                }
                            />
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
