"use client";

import React, { useMemo, useRef } from "react";

import type { SiteHeaderProps } from "@/types";

import { getHeaderClasses } from "@/utils";
import { useMenuState, useHeaderScroll } from "@/hooks";
import { BrandLink, ThemeToggle, MenuToggle, Sidebar } from "@/components";

const SiteHeader: React.FC<SiteHeaderProps> = ({
    profile,
    className,
    logo = "Portfolio",
    enabledSections,
}) => {
    const headerRef = useRef<HTMLElement>(null);

    const { isMenuOpen, toggleMenu } = useMenuState();
    const { headerState, handleAnimationEnd } = useHeaderScroll();

    const headerClassNames = useMemo(
        () => `${getHeaderClasses(headerState)} ${className || ""}`,
        [headerState, className]
    );

    return (
        <header
            ref={headerRef}
            className={headerClassNames}
            role={"banner"}
            aria-label={`Site header (${logo})`}
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
                                enabledSections={enabledSections}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

SiteHeader.displayName = "SiteHeader";

export default SiteHeader;
