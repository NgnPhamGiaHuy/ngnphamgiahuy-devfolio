import clsx from "clsx";
import React, { memo } from "react";

import type { MenuToggleProps } from "@/types";

import { useKeyboardHandler } from "@/utils/keyboardUtils";

const MenuToggle: React.FC<MenuToggleProps> = memo(
    ({ isMenuOpen, onToggle, className }) => {
        const handleKeyDown = useKeyboardHandler(onToggle);

        return (
            <div
                className={`w-[28px] h-[30px] top-0 right-0 relative z-3 cursor-pointer ${className || ""}`}
                onClick={onToggle}
                role={"button"}
                tabIndex={0}
                aria-label={`${isMenuOpen ? "Close" : "Open"} navigation menu`}
                aria-expanded={isMenuOpen}
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
            </div>
        );
    }
);

MenuToggle.displayName = "MenuToggle";

export default MenuToggle;
