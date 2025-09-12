import clsx from "clsx";
import React, { memo } from "react";

import { useKeyboardHandler } from "@/utils/keyboardUtils";
import { HeaderMenuToggleProps } from "@/types";

const HeaderMenuToggle: React.FC<HeaderMenuToggleProps> = memo(({ isMenuOpen, onToggle, className }) => {
    const handleKeyDown = useKeyboardHandler(onToggle);

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
