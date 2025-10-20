import clsx from "clsx";
import React, { useCallback } from "react";

import type { MenuToggleProps } from "@/types";

import { useKeyboardHandler } from "@/utils/keyboardUtils";

const MenuToggle: React.FC<MenuToggleProps> = ({
    isMenuOpen,
    onToggle,
    className,
}) => {
    const handleKeyDown = useKeyboardHandler(onToggle);
    const handleClick = useCallback(() => onToggle(), [onToggle]);

    return (
        <button
            type={"button"}
            className={clsx(
                "w-[28px] h-[30px] top-0 right-0 relative z-3 cursor-pointer",
                className
            )}
            onClick={handleClick}
            aria-label={`${isMenuOpen ? "Close" : "Open"} navigation menu`}
            aria-expanded={isMenuOpen}
            aria-pressed={isMenuOpen}
            title={`${isMenuOpen ? "Close" : "Open"} navigation menu`}
            onKeyDown={handleKeyDown}
        >
            <span
                className={clsx(
                    "w-full h-[2px] left-0 bg-inverse transition-all duration-500 block absolute",
                    isMenuOpen ? "top-[14px] -rotate-45" : "top-[8px]"
                )}
            />
            <span
                className={clsx(
                    "w-full h-[2px] left-0 bg-inverse transition-all duration-500 block absolute",
                    isMenuOpen ? "top-[14px] rotate-45" : "bottom-[8px]"
                )}
            />
        </button>
    );
};

MenuToggle.displayName = "MenuToggle";

export default MenuToggle;
