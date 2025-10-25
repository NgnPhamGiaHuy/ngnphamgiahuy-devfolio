// ============================================================
// Hook: useCarouselRef
// Purpose: Manages Swiper reference and pagination interaction handlers
// ============================================================

import React, { useRef, useCallback } from "react";
import type { Swiper as SwiperType } from "swiper";

// ============================================================
// Types
// ============================================================

/**
 * Return type for useCarouselRef hook
 */
interface UseCarouselRefReturn {
    swiperRef: React.RefObject<SwiperType>;
    handlePaginationClick: (index: number) => void;
    handleKeyDown: (e: React.KeyboardEvent, index: number) => void;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for managing Swiper reference and pagination interactions.
 * Provides ref management and keyboard/click handlers for carousel navigation.
 *
 * @returns Object containing swiper ref and interaction handlers
 *
 * @example
 *
 * const { swiperRef, handlePaginationClick, handleKeyDown } = useCarouselRef();
 *
 * return (
 *   <div>
 *     <Swiper ref={swiperRef}>
 *     </Swiper>
 *     <button
 *       onClick={() => handlePaginationClick(2)}
 *       onKeyDown={(e) => handleKeyDown(e, 2)}
 *     >
 *       Go to slide 3
 *     </button>
 *   </div>
 * );
 * ```
 **/
const useCarouselRef = (): UseCarouselRefReturn => {
    // ============================================================
    // Refs
    // ============================================================

    const swiperRef = useRef<SwiperType>(null!);

    // ============================================================
    // Event Handlers
    // ============================================================

    /**
     * Handles pagination dot clicks.
     * Navigates to the specified slide index using Swiper's slideToLoop method.
     *
     * @param index - Target slide index
     */
    const handlePaginationClick = useCallback((index: number): void => {
        swiperRef.current?.slideToLoop(index);
    }, []);

    /**
     * Handles keyboard navigation for pagination dots.
     * Supports Enter and Space key activation for accessibility.
     *
     * @param event - Keyboard event
     * @param index - Target slide index
     */
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent, index: number): void => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handlePaginationClick(index);
            }
        },
        [handlePaginationClick]
    );

    // ============================================================
    // Return
    // ============================================================

    return {
        swiperRef,
        handlePaginationClick,
        handleKeyDown,
    };
};

export default useCarouselRef;
