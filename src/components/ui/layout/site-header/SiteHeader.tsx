"use client"

import React, { useRef } from "react";

import { HeaderProps } from "@/types";
import { getHeaderClasses } from "@/utils";

import { useTheme, useMenuState, useHeaderScroll } from "@/hooks";
import { Sidebar } from "@/components/ui";
import { BrandLink, ThemeToggle, MenuToggle } from "@/components/ui";

const SiteHeader: React.FC<HeaderProps> = ({ className, logo = "Portfolio" }) => {
    const headerRef = useRef<HTMLElement>(null);

    const { isMenuOpen, toggleMenu, closeMenu } = useMenuState();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { headerState, handleAnimationEnd } = useHeaderScroll();

    return (
        <header ref={headerRef} className={`${getHeaderClasses(headerState)} ${className || ""}`} onAnimationEnd={handleAnimationEnd}>
            <section className={"header-section"}>
                <div className={"header-container"}>
                    <div className={"header-side"}>
                        <BrandLink logo={logo} />
                    </div>
                    <div className={"header-side"}>
                        <div className={"header-content"}>
                            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
                            <MenuToggle isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
                            <Sidebar isMenuOpen={isMenuOpen} onMenuItemClick={closeMenu} />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default SiteHeader;
