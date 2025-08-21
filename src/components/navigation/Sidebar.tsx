import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

import VLineBlock from "@/components/ui/VLineBlock";
import MenuSocialLinks from "@/components/navigation/MenuSocialLinks";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

interface SidebarProps {
    isMenuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen }) => {
    const prefersReducedMotion = usePrefersReducedMotion();
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
            <div className="sidebar-content">
                <div className="xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full px-3 m-auto relative">
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 flex-none">
                            <div className="pt-[80px] pr-[60px] pb-[40px] pl-[130px] relative">
                                <ul>
                                    { ["Home", "Services", "Skills", "Works", "Resume", "Testimonials", "Pricing", "Blog", "Contact"].map((item, index) => (
                                        <li key={index} className={`sidebar-menu-item ${sidebarEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: prefersReducedMotion ? "0ms" : `${index * 90}ms` }}>
                                            <Link href={"/"}>
                                                <span className="sidebar-menu-text group">
                                                    { item.split("").map((item, index) => (
                                                        <span key={index} className="sidebar-menu-letter" style={{ transitionDelay: `${index * 25}ms` }}>
                                                            {item}
                                                        </span>
                                                    )) }
                                                </span>
                                            </Link>
                                        </li>
                                    )) }
                                </ul>
                            </div>
                            <MenuSocialLinks />
                            <VLineBlock left="75px" top="0" bottom="-30px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
