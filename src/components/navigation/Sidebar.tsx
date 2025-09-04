"use client";

import React, { memo } from "react";

import { data } from "@/data/data";
import { SidebarProps } from "@/types";
import { generateSocialLinks } from "@/utils/socialLinks";

import SIDEBAR_CONFIG from "@/config/sidebar.config";
import useSidebarAnimation from "@/hooks/useSidebarAnimation";
import VLineBlock from "@/components/ui/VLineBlock";
import SocialLinks from "@/components/ui/SocialLinks";
import SidebarMenuItem from "@/components/navigation/sidebars/SidebarMenuItem";

const Sidebar: React.FC<SidebarProps> = memo(({ isMenuOpen, onMenuItemClick }) => {
    const { profile } = data;
    const { sidebarEntered, handleTransitionEnd, prefersReducedMotion } = useSidebarAnimation(isMenuOpen);
    const socialLinks = generateSocialLinks(profile.social_links);

    const sidebarClasses = `sidebar-container ${isMenuOpen ? "sidebar-visible" : "sidebar-hidden"}`;

    return (
        <div className={sidebarClasses} onTransitionEnd={handleTransitionEnd} role={"navigation"} aria-label={"Main navigation menu"}>
            <div className={"sidebar-content"}>
                <div className={"sidebar-container-inner"}>
                    <div className={"sidebar-row"}>
                        <div className={"sidebar-column"}>
                            <nav className={"sidebar-menu-container"} aria-label={"Navigation menu"}>
                                <ul role={"menubar"}>
                                    { SIDEBAR_CONFIG.MENU_ITEMS.map((item, index) => (
                                        <SidebarMenuItem
                                            key={item}
                                            text={item}
                                            index={index}
                                            sidebarEntered={sidebarEntered}
                                            prefersReducedMotion={prefersReducedMotion}
                                            onClick={onMenuItemClick}
                                        />
                                    )) }
                                </ul>
                            </nav>
                            <SocialLinks
                                links={socialLinks}
                                iconSize={SIDEBAR_CONFIG.SOCIAL_LINKS.iconSize}
                                iconMargin={SIDEBAR_CONFIG.SOCIAL_LINKS.iconMargin}
                                containerMargin={SIDEBAR_CONFIG.SOCIAL_LINKS.containerMargin}
                            />
                            <VLineBlock
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

