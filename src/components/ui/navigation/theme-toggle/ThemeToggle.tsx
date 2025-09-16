import React, { memo } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import type { ThemeToggleProps } from "@/types";

import { useKeyboardHandler } from "@/utils/keyboardUtils";

const ThemeToggle: React.FC<ThemeToggleProps> = memo(({ isDarkMode, onToggle, className }) => {
    const handleKeyDown = useKeyboardHandler(onToggle);

    return (
        <div
            className={`header-toggle-theme ${className || ""}`}
            onClick={onToggle}
            role={"button"}
            tabIndex={0}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            onKeyDown={handleKeyDown}
        >
            {isDarkMode ? (
                <SunIcon className={"w-7 h-7"} />
            ) : (
                <MoonIcon className={"w-7 h-7"} />
            )}
        </div>
    );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;


