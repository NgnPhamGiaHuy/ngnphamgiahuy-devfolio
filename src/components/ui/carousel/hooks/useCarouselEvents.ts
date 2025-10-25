// ============================================================
// Hook: useCarouselEvents
// Purpose: Manages Swiper carousel event handlers and state updates
// ============================================================

import type { Swiper as SwiperType } from "swiper";

// ============================================================
// Types
// ============================================================

/**
 * Props for useCarouselEvents hook
 */
interface UseCarouselEventsProps {
    swiperRef: React.RefObject<SwiperType>;
    setSlidesPerView: (slides: number) => void;
    setActiveIndex: (index: number) => void;
    setVisibleSlides: (slides: Set<number>) => void;
    calculateVisibleSlides: (
        currentIndex: number,
        currentSlidesPerView: number
    ) => Set<number>;
    activeIndex: number;
    slidesPerView: number;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for managing Swiper carousel events.
 * Provides event handlers for swiper initialization, resize, breakpoint changes, and slide changes.
 *
 * @param props - Event handler configuration and state setters
 * @returns Object containing Swiper event handlers
 *
 * @example
 * ```tsx
 * const { onSwiper, onResize, onBreakpoint, onSlideChange } = useCarouselEvents({
 *   swiperRef,
 *   setSlidesPerView,
 *   setActiveIndex,
 *   setVisibleSlides,
 *   calculateVisibleSlides,
 *   activeIndex,
 *   slidesPerView,
 * });
 * ```
 */
const useCarouselEvents = ({
    swiperRef,
    setSlidesPerView,
    setActiveIndex,
    setVisibleSlides,
    calculateVisibleSlides,
    activeIndex,
    slidesPerView,
}: UseCarouselEventsProps) => {
    // ============================================================
    // Event Handlers
    // ============================================================

    /**
     * Handles Swiper initialization.
     * Sets up the swiper reference and initial slides per view.
     *
     * @param swiper - Swiper instance
     */
    const onSwiper = (swiper: SwiperType): void => {
        swiperRef.current = swiper;
        const newSlidesPerView = swiper.params.slidesPerView as number;
        setSlidesPerView(newSlidesPerView);
    };

    /**
     * Handles window resize events.
     * Updates slides per view when window is resized.
     *
     * @param swiper - Swiper instance
     */
    const onResize = (swiper: SwiperType): void => {
        setSlidesPerView(swiper.params.slidesPerView as number);
    };

    /**
     * Handles breakpoint changes.
     * Updates slides per view and recalculates visible slides when breakpoint changes.
     *
     * @param swiper - Swiper instance
     */
    const onBreakpoint = (swiper: SwiperType): void => {
        const newSlidesPerView = swiper.params.slidesPerView as number;
        setSlidesPerView(newSlidesPerView);
        setVisibleSlides(calculateVisibleSlides(activeIndex, newSlidesPerView));
    };

    /**
     * Handles slide change events.
     * Updates active index and recalculates visible slides when slide changes.
     *
     * @param swiper - Swiper instance
     */
    const onSlideChange = (swiper: SwiperType): void => {
        const newActiveIndex = swiper.realIndex;
        setActiveIndex(newActiveIndex);
        setVisibleSlides(calculateVisibleSlides(newActiveIndex, slidesPerView));
    };

    // ============================================================
    // Return
    // ============================================================

    return {
        onSwiper,
        onResize,
        onBreakpoint,
        onSlideChange,
    };
};

export default useCarouselEvents;
