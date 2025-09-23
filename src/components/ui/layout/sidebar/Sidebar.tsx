"use client";

import React, { memo } from "react";

import type { SidebarProps } from "@/types";

import { SIDEBAR_CONFIG } from "@/config";
import { generateSocialLinks } from "@/utils";
import { useSidebarAnimation } from "@/hooks";
import { VerticalRule, SocialLinks, NavItem } from "@/components";

const Sidebar: React.FC<SidebarProps> = memo(({ profile, isMenuOpen }) => {
    const { sidebarEntered, handleTransitionEnd, prefersReducedMotion } = useSidebarAnimation(isMenuOpen);

    const socialLinks = generateSocialLinks(profile.social_links);

    const sidebarClasses = `sidebar ${isMenuOpen ? "sidebar-visible" : "sidebar-hidden"}`;

    return (
        <div className={sidebarClasses} onTransitionEnd={handleTransitionEnd} role={"navigation"} aria-label={"Main navigation menu"}>
            <div className={"sidebar-content"}>
                <div className={"sidebar-container-inner"}>
                    <div className={"sidebar-row"}>
                        <div className={"sidebar-column"}>
                            <nav className={"sidebar-menu-container"} aria-label={"Navigation menu"}>
                                <ul role={"menubar"}>
                                    {SIDEBAR_CONFIG.MENU_ITEMS.map((item, index) => (
                                        <NavItem
                                            key={item}
                                            text={item}
                                            index={index}
                                            sidebarEntered={sidebarEntered}
                                            prefersReducedMotion={prefersReducedMotion}
                                        />
                                    ))}
                                </ul>
                            </nav>
                            <SocialLinks
                                links={socialLinks}
                                iconSize={SIDEBAR_CONFIG.SOCIAL_LINKS.iconSize}
                                iconMargin={SIDEBAR_CONFIG.SOCIAL_LINKS.iconMargin}
                                containerMargin={SIDEBAR_CONFIG.SOCIAL_LINKS.containerMargin}
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
});

Sidebar.displayName = "Sidebar";

export default Sidebar;


