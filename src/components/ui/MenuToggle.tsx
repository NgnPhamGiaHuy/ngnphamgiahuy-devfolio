// ============================================================
// Component: MenuToggle
// Purpose: Mobile menu toggle button with animations and accessibility
// ============================================================

import clsx from "clsx";
import React, { useCallback } from "react";

import type { MenuToggleProps } from "@/types";

import { useKeyboardHandler } from "@/hooks";

// ============================================================
// Component Definition
// ============================================================

/**
 * MenuToggle component renders a mobile menu toggle button.
 * Features animations, accessibility, and keyboard navigation.
 *
 * @param props - Component props
 * @param props.isMenuOpen - Whether the menu is currently open
 * @param props.onToggle - Toggle function callback
 * @param props.className - Additional CSS classes
 * @returns Menu toggle component
 */
const MenuToggle: React.FC<MenuToggleProps> = ({
    isMenuOpen,
    onToggle,
    className,
    ...props
}) => {
    // ============================================================
    // Event Handlers
    // ============================================================

    const handleKeyDown = useKeyboardHandler(onToggle);
    const handleClick = useCallback(() => onToggle(), [onToggle]);

    // ============================================================
    // Render
    // ============================================================

    return (
        <button
            type="button"
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
            data-testid="menu-toggle"
            {...props}
        >
            {/* Top hamburger line */}
            <span
                className={clsx(
                    "w-full h-[2px] left-0 bg-inverse transition-all duration-500 block absolute",
                    isMenuOpen ? "top-[14px] -rotate-45" : "top-[8px]"
                )}
                aria-hidden="true"
            />

            {/* Bottom hamburger line */}
            <span
                className={clsx(
                    "w-full h-[2px] left-0 bg-inverse transition-all duration-500 block absolute",
                    isMenuOpen ? "top-[14px] rotate-45" : "bottom-[8px]"
                )}
                aria-hidden="true"
            />
        </button>
    );
};

MenuToggle.displayName = "MenuToggle";

export default MenuToggle;
