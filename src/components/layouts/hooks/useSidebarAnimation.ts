// ============================================================
// Hook: useSidebarAnimation
// Purpose: Manages sidebar animation state and transition handling
// ============================================================

"use client";

import React, { useState, useEffect, useCallback } from "react";

// ============================================================
// Constants
// ============================================================

/** Fallback timeout for sidebar animation in milliseconds */
const SIDEBAR_ANIMATION_TIMEOUT = 850;

// ============================================================
// Types
// ============================================================

/**
 * Return type for useSidebarAnimation hook
 */
interface UseSidebarAnimationReturn {
    /** Whether sidebar has entered (animation completed) */
    sidebarEntered: boolean;
    /** Handler for transition end events */
    handleTransitionEnd: (event: React.TransitionEvent<HTMLDivElement>) => void;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for managing sidebar animation state.
 * Handles sidebar enter/exit animations with proper timing and event handling.
 *
 * @param isMenuOpen - Whether the menu is currently open
 * @returns Object containing sidebar state and transition handler
 *
 * @example
 * ```tsx
 * const { sidebarEntered, handleTransitionEnd } = useSidebarAnimation(isMenuOpen);
 *
 * return (
 *   <div
 *     className={`sidebar ${isMenuOpen ? 'open' : 'closed'}`}
 *     onTransitionEnd={handleTransitionEnd}
 *   >
 *     {sidebarEntered && <SidebarContent />}
 *   </div>
 * );
 * ```
 */
const useSidebarAnimation = (
    isMenuOpen: boolean
): UseSidebarAnimationReturn => {
    // ============================================================
    // State
    // ============================================================

    const [sidebarEntered, setSidebarEntered] = useState<boolean>(false);

    // ============================================================
    // Event Handlers
    // ============================================================

    /**
     * Handles transition end events for sidebar animations.
     * Sets sidebarEntered to true when the main transition completes.
     *
     * @param event - Transition event from the sidebar element
     */
    const handleTransitionEnd = useCallback(
        (event: React.TransitionEvent<HTMLDivElement>) => {
            // Only trigger on the main element, not child elements
            if (isMenuOpen && event.target === event.currentTarget) {
                setSidebarEntered(true);
            }
        },
        [isMenuOpen]
    );

    // ============================================================
    // Effects
    // ============================================================

    useEffect(() => {
        if (!isMenuOpen) {
            // Reset state when menu closes
            setSidebarEntered(false);
        } else {
            // Set fallback timeout for cases where transition events don't fire
            const timer = setTimeout(() => {
                if (isMenuOpen) {
                    setSidebarEntered(true);
                }
            }, SIDEBAR_ANIMATION_TIMEOUT);

            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    // ============================================================
    // Return
    // ============================================================

    return {
        sidebarEntered,
        handleTransitionEnd,
    };
};

export default useSidebarAnimation;
