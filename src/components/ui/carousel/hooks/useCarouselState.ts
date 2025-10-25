// ============================================================
// Hook: useCarouselState
// Purpose: Manages carousel state including slides, visibility, and calculations
// ============================================================

import { useState, useCallback } from "react";

// ============================================================
// Types
// ============================================================

/**
 * Return type for useCarouselState hook
 */
interface UseCarouselStateReturn {
    mounted: boolean;
    activeIndex: number;
    slidesPerView: number;
    visibleSlides: Set<number>;
    setMounted: (mounted: boolean) => void;
    setActiveIndex: (index: number) => void;
    setSlidesPerView: (slides: number) => void;
    setVisibleSlides: (slides: Set<number>) => void;
    calculateVisibleSlides: (
        currentIndex: number,
        currentSlidesPerView: number
    ) => Set<number>;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for managing carousel state.
 * Provides state management for slides, visibility tracking, and calculations.
 *
 * @param totalSlides - Total number of slides in the carousel
 * @returns Object containing carousel state and setters
 *
 * @example
 * ```tsx
 * const {
 *   mounted,
 *   activeIndex,
 *   slidesPerView,
 *   visibleSlides,
 *   calculateVisibleSlides
 * } = useCarouselState(totalSlides);
 * ```
 */
const useCarouselState = (totalSlides: number): UseCarouselStateReturn => {
    // ============================================================
    // State
    // ============================================================

    const [mounted, setMounted] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [slidesPerView, setSlidesPerView] = useState<number>(1);
    const [visibleSlides, setVisibleSlides] = useState<Set<number>>(
        new Set([0])
    );

    // ============================================================
    // Calculations
    // ============================================================

    /**
     * Calculates which slides should be visible based on current index and slides per view.
     * Handles circular navigation for infinite carousels.
     *
     * @param currentIndex - Current active slide index
     * @param currentSlidesPerView - Number of slides visible at once
     * @returns Set of visible slide indices
     */
    const calculateVisibleSlides = useCallback(
        (currentIndex: number, currentSlidesPerView: number): Set<number> => {
            const visible = new Set<number>();

            for (let i = 0; i < currentSlidesPerView; i++) {
                const slideIndex = (currentIndex + i) % totalSlides;
                visible.add(slideIndex);
            }

            return visible;
        },
        [totalSlides]
    );

    // ============================================================
    // Return
    // ============================================================

    return {
        mounted,
        activeIndex,
        slidesPerView,
        visibleSlides,
        setMounted,
        setActiveIndex,
        setSlidesPerView,
        setVisibleSlides,
        calculateVisibleSlides,
    };
};

export default useCarouselState;
