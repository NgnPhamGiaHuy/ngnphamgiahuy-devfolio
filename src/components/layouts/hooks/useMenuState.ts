// ============================================================
// Hook: useMenuState
// Purpose: Manages mobile menu state with toggle, open, and close actions
// ============================================================

"use client";

import { useCallback, useState } from "react";

// ============================================================
// Types
// ============================================================

/**
 * Return type for useMenuState hook
 */
interface UseMenuStateReturn {
    /** Current menu open state */
    isMenuOpen: boolean;
    /** Toggle menu state */
    toggleMenu: () => void;
    /** Close menu */
    closeMenu: () => void;
    /** Open menu */
    openMenu: () => void;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for managing mobile menu state.
 * Provides simple state management with toggle, open, and close actions.
 *
 * @returns Object containing menu state and control functions
 *
 * @example
 * ```tsx
 * const { isMenuOpen, toggleMenu, closeMenu, openMenu } = useMenuState();
 *
 * return (
 *   <button onClick={toggleMenu}>
 *     {isMenuOpen ? 'Close' : 'Open'} Menu
 *   </button>
 * );
 * ```
 */
const useMenuState = (): UseMenuStateReturn => {
    // ============================================================
    // State
    // ============================================================

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // ============================================================
    // Actions
    // ============================================================

    const toggleMenu = useCallback((): void => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback((): void => {
        setIsMenuOpen(false);
    }, []);

    const openMenu = useCallback((): void => {
        setIsMenuOpen(true);
    }, []);

    // ============================================================
    // Return
    // ============================================================

    return {
        isMenuOpen,
        toggleMenu,
        closeMenu,
        openMenu,
    };
};

export default useMenuState;
