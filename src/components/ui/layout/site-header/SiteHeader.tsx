"use client";

import React, { useRef } from "react";

import type { SiteHeaderProps } from "@/types";

import { getHeaderClasses } from "@/utils";
import { useMenuState, useHeaderScroll } from "@/hooks";
import { BrandLink, ThemeToggle, MenuToggle, Sidebar } from "@/components";

const SiteHeader: React.FC<SiteHeaderProps> = ({
    profile,
    className,
    logo = "Portfolio",
}) => {
    const headerRef = useRef<HTMLElement>(null);

    const { isMenuOpen, toggleMenu } = useMenuState();
    const { headerState, handleAnimationEnd } = useHeaderScroll();

    return (
        <header
            ref={headerRef}
            className={`${getHeaderClasses(headerState)} ${className || ""}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <section className={"relative"}>
                <div className={"flex-container"}>
                    <div className={"flex-base"}>
                        <BrandLink logo={logo} />
                    </div>
                    <div className={"flex-base"}>
                        <div className={"flex-wrapper"}>
                            <ThemeToggle />
                            <MenuToggle
                                isMenuOpen={isMenuOpen}
                                onToggle={toggleMenu}
                            />
                            <Sidebar
                                profile={profile}
                                isMenuOpen={isMenuOpen}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default SiteHeader;
