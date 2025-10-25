// ============================================================
// Hook: useCarouselInitialization
// Purpose: Handles carousel initialization and initial visible slides setup
// ============================================================

import { useEffect } from "react";

// ============================================================
// Types
// ============================================================

/**
 * Props for useCarouselInitialization hook
 */
interface UseCarouselInitializationProps {
    totalSlides: number;
    slidesPerView: number;
    setMounted: (mounted: boolean) => void;
    setVisibleSlides: (slides: Set<number>) => void;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for initializing carousel state.
 * Handles mounting state and initial visible slides calculation.
 *
 * @param props - Initialization configuration
 * @param props.totalSlides - Total number of slides in the carousel
 * @param props.slidesPerView - Number of slides visible at once
 * @param props.setMounted - Function to set mounted state
 * @param props.setVisibleSlides - Function to set visible slides
 *
 * @example
 * ```tsx
 * useCarouselInitialization({
 *   totalSlides: 5,
 *   slidesPerView: 3,
 *   setMounted,
 *   setVisibleSlides,
 * });
 * ```
 */
const useCarouselInitialization = ({
    totalSlides,
    slidesPerView,
    setMounted,
    setVisibleSlides,
}: UseCarouselInitializationProps): void => {
    // ============================================================
    // Initialization Effect
    // ============================================================

    useEffect(() => {
        // Mark carousel as mounted for client-side rendering
        setMounted(true);

        // Calculate initial visible slides based on slides per view
        const initialVisible = new Set<number>();
        const maxSlides = Math.min(slidesPerView, totalSlides);

        // Add initial visible slide indices
        for (let i = 0; i < maxSlides; i++) {
            initialVisible.add(i);
        }

        // Set the initial visible slides
        setVisibleSlides(initialVisible);
    }, [slidesPerView, totalSlides, setMounted, setVisibleSlides]);
};

export default useCarouselInitialization;
