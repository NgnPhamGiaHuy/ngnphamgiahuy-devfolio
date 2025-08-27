import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

import { data } from "@/data/data";

import { generateSocialLinks } from "@/utils/socialLinks";

import VLineBlock from "@/components/ui/VLineBlock";
import SocialLinks from "@/components/ui/SocialLinks";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

interface SidebarProps {
    isMenuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen }) => {
    const { profile } = data;

    const prefersReducedMotion = usePrefersReducedMotion();
    const socialLinks = generateSocialLinks(profile.social_links);

    const [sidebarEntered, setSidebarEntered] = useState<boolean>(false);

    const handleTransitionEnd = useCallback((event: React.TransitionEvent<HTMLDivElement>) => {
        if (isMenuOpen && event.target === event.currentTarget) {
            setSidebarEntered(true);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isMenuOpen) {
            setSidebarEntered(false);
        } else if (prefersReducedMotion) {
            setSidebarEntered(true);
        } else {
            const timer = setTimeout(() => {
                if (isMenuOpen) {
                    setSidebarEntered(true);
                }
            }, 850);

            return () => clearTimeout(timer);
        }
    }, [isMenuOpen, prefersReducedMotion]);

    return (
        <div className={`sidebar-container ${isMenuOpen ? "sidebar-visible" : "sidebar-hidden"}`} onTransitionEnd={handleTransitionEnd}>
            <div className={"sidebar-content"}>
                <div className={"sidebar-container-inner"}>
                    <div className={"sidebar-row"}>
                        <div className={"sidebar-column"}>
                            <div className={"sidebar-menu-container"}>
                                <ul>
                                    {["Home", "Services", "Skills", "Works", "Resume", "Testimonials", "Pricing", "Blog", "Contact"].map((item, index) => (
                                        <li key={index} className={`sidebar-menu-item ${sidebarEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: prefersReducedMotion ? "0ms" : `${index * 90}ms` }}>
                                            <Link href={"/"}>
                                                <span className={"sidebar-menu-text group"}>
                                                    {item.split("").map((item, index) => (
                                                        <span key={index} className={"sidebar-menu-letter"} style={{ transitionDelay: `${index * 25}ms` }}>
                                                            {item}
                                                        </span>
                                                    ))}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <SocialLinks
                                links={socialLinks}
                                iconSize={"size-5"}
                                iconMargin={"mr-[14px]"}
                                containerMargin={"ml-[130px]"}
                            />
                            <VLineBlock left={"75px"} top={"0"} bottom={"-30px"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

