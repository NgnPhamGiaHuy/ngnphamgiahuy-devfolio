"use client"

import React, { useRef } from "react";

import { data } from "@/data/data";
import { HeaderProps } from "@/types";

import { getHeaderClasses } from "@/utils/headerUtils";

import useTheme from "@/hooks/useTheme";
import useMenuState from "@/hooks/useMenuState";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import Sidebar from "@/components/navigation/Sidebar";
import HeaderLogo from "@/components/navigation/headers/HeaderLogo";
import HeaderThemeToggle from "@/components/navigation/headers/HeaderThemeToggle";
import HeaderMenuToggle from "@/components/navigation/headers/HeaderMenuToggle";

const Header: React.FC<HeaderProps> = ({ className }) => {
    const { logo } = data;

    const headerRef = useRef<HTMLElement>(null);

    const { isMenuOpen, toggleMenu, closeMenu } = useMenuState();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { headerState, handleAnimationEnd } = useHeaderScroll();

    return (
        <header ref={headerRef} className={`${getHeaderClasses(headerState)} ${className || ""}`} onAnimationEnd={handleAnimationEnd}>
            <section className={"header-section"}>
                <div className={"header-container"}>
                    <div className={"header-side"}>
                        <HeaderLogo logo={logo} />
                    </div>
                    <div className={"header-side"}>
                        <div className={"header-content"}>
                            <HeaderThemeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
                            <HeaderMenuToggle isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
                            <Sidebar isMenuOpen={isMenuOpen} onMenuItemClick={closeMenu} />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Header;
