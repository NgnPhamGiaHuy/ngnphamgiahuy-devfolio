// ============================================================
// Hook: useHeaderScroll
// Purpose: Manages header state based on scroll position with smooth animations
// ============================================================

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HeaderState } from "@/utils";

// ============================================================
// Constants
// ============================================================

/** Scroll threshold for header state changes */
const SCROLL_THRESHOLD = 50;

/** Throttle delay for scroll events */
const THROTTLE_DELAY = 16; // ~60fps

// ============================================================
// Types
// ============================================================

/**
 * Return type for useHeaderScroll hook
 */
interface UseHeaderScrollReturn {
    /** Current header state */
    headerState: HeaderState;
    /** Handler for animation end events */
    handleAnimationEnd: () => void;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for managing header state based on scroll position.
 * Provides smooth header transitions with throttled scroll handling.
 *
 * @returns Object containing header state and animation handler
 *
 * @example
 * ```tsx
 * const { headerState, handleAnimationEnd } = useHeaderScroll();
 *
 * return (
 *   <header
 *     className={getHeaderClasses(headerState)}
 *     onAnimationEnd={handleAnimationEnd}
 *   >
 *     Header Content
 *   </header>
 * );
 * ```
 */
const useHeaderScroll = (): UseHeaderScrollReturn => {
    // ============================================================
    // State & Refs
    // ============================================================

    const lastScrollY = useRef<number>(0);
    const [headerState, setHeaderState] = useState<HeaderState>("absolute");

    // ============================================================
    // Event Handlers
    // ============================================================

    const handleAnimationEnd = useCallback((): void => {
        if (headerState === "animating-in") {
            setHeaderState("fixed");
        } else if (headerState === "animating-out") {
            setHeaderState("absolute");
        }
    }, [headerState]);

    // ============================================================
    // Scroll Handler
    // ============================================================

    const handleScroll = useCallback((): void => {
        const currentScrollY = window.scrollY;
        lastScrollY.current = currentScrollY;

        // Don't change state during animations
        if (headerState === "animating-in" || headerState === "animating-out") {
            return;
        }

        // Determine new state based on scroll position
        if (currentScrollY > SCROLL_THRESHOLD) {
            if (headerState === "absolute") {
                setHeaderState("animating-in");
            }
        } else if (currentScrollY <= SCROLL_THRESHOLD) {
            if (headerState === "fixed") {
                setHeaderState("animating-out");
            }
        }
    }, [headerState]);

    // ============================================================
    // Throttled Scroll Handler
    // ============================================================

    const throttledHandleScroll = useCallback(() => {
        let ticking = false;

        return () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
    }, [handleScroll]);

    // ============================================================
    // Effects
    // ============================================================

    useEffect(() => {
        // Guard against SSR - only run on client
        if (typeof window === "undefined") return;

        const throttledScroll = throttledHandleScroll();

        window.addEventListener("scroll", throttledScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", throttledScroll);
        };
    }, [throttledHandleScroll]);

    // ============================================================
    // Return
    // ============================================================

    return {
        headerState,
        handleAnimationEnd,
    };
};

export default useHeaderScroll;
