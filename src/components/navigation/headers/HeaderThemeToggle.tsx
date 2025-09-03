import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { memo, useCallback } from "react";

import { HeaderThemeToggleProps } from "@/types";

const HeaderThemeToggle: React.FC<HeaderThemeToggleProps> = memo(({ isDarkMode, onToggle, className }) => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
        }
    }, [onToggle]);

    return (
        <div
            className={`header-toggle-theme ${className || ""}`}
            onClick={onToggle}
            role={"button"}
            tabIndex={0}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            onKeyDown={handleKeyDown}
        >
            { isDarkMode ? (
                <SunIcon className={"w-7 h-7"} />
            ) : (
                <MoonIcon className={"w-7 h-7"} />
            ) }
        </div>
    );
});

HeaderThemeToggle.displayName = "HeaderThemeToggle";

export default HeaderThemeToggle;
