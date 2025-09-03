import clsx from "clsx";
import React, { memo, useCallback } from "react";

import { HeaderMenuToggleProps } from "@/types";

const HeaderMenuToggle: React.FC<HeaderMenuToggleProps> = memo(({ isMenuOpen, onToggle, className }) => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
        }
    }, [onToggle]);

    return (
        <div
            className={`header-toggle-menu ${className || ""}`}
            onClick={onToggle}
            role={"button"}
            tabIndex={0}
            aria-label={`${isMenuOpen ? "Close" : "Open"} navigation menu`}
            aria-expanded={isMenuOpen}
            onKeyDown={handleKeyDown}
        >
            <span
                className={clsx(
                    "header-menu-bar",
                    isMenuOpen ? "header-menu-top-active" : "header-menu-top"
                )}
            />
            <span
                className={clsx(
                    "header-menu-bar",
                    isMenuOpen ? "header-menu-bottom-active" : "header-menu-bottom"
                )}
            />
        </div>
    );
});

HeaderMenuToggle.displayName = "HeaderMenuToggle";

export default HeaderMenuToggle;
