// ============================================================
// Component: ContentCarousel
// Purpose: Main carousel component with state management and event handling
// ============================================================

"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import React from "react";

import CarouselSlides from "./CarouselSlides";
import CarouselContainer from "./CarouselContainer";
import CarouselPagination from "./CarouselPagination";

import useCarouselRef from "./hooks/useCarouselRef";
import useCarouselState from "./hooks/useCarouselState";
import useCarouselEvents from "./hooks/useCarouselEvents";
import useCarouselInitialization from "./hooks/useCarouselInitialization";

// ============================================================
// Types
// ============================================================

/**
 * Props for ContentCarousel component
 */
interface ContentCarouselProps<T> {
    items: T[];
    spaceBetween?: number;
    renderItem: (item: T, index: number, isVisible: boolean) => React.ReactNode;
}

// ============================================================
// Component Definition
// ============================================================

/**
 * ContentCarousel component renders a fully functional carousel.
 * Features state management, event handling, and responsive design.
 *
 * @param props - Component props
 * @param props.items - Array of items to display in carousel
 * @param props.spaceBetween - Space between slides
 * @param props.renderItem - Function to render each carousel item
 * @returns Content carousel component
 */
const ContentCarousel = <T,>({
    items,
    spaceBetween = 40,
    renderItem,
    ...props
}: ContentCarouselProps<T>) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple array length doesn't need memoization
    const totalSlides = items.length;

    // ============================================================
    // State Management
    // ============================================================

    const {
        mounted,
        activeIndex,
        slidesPerView,
        visibleSlides,
        setMounted,
        setActiveIndex,
        setSlidesPerView,
        setVisibleSlides,
        calculateVisibleSlides,
    } = useCarouselState(totalSlides);

    // ============================================================
    // Event Handlers
    // ============================================================

    const { swiperRef, handlePaginationClick, handleKeyDown } =
        useCarouselRef();

    const { onSwiper, onResize, onBreakpoint, onSlideChange } =
        useCarouselEvents({
            swiperRef,
            setSlidesPerView,
            setActiveIndex,
            setVisibleSlides,
            calculateVisibleSlides,
            activeIndex,
            slidesPerView,
        });

    // ============================================================
    // Initialization
    // ============================================================

    useCarouselInitialization({
        totalSlides,
        slidesPerView,
        setMounted,
        setVisibleSlides,
    });

    // ============================================================
    // Render
    // ============================================================

    return (
        <CarouselContainer {...props}>
            <div className="swiper-carousel" data-testid="content-carousel">
                {/* Carousel Slides */}
                {mounted && (
                    <CarouselSlides
                        items={items}
                        spaceBetween={spaceBetween}
                        visibleSlides={visibleSlides}
                        onSwiper={onSwiper}
                        onResize={onResize}
                        onBreakpoint={onBreakpoint}
                        onSlideChange={onSlideChange}
                        renderItem={renderItem}
                    />
                )}

                {/* Carousel Pagination */}
                {mounted && (
                    <CarouselPagination
                        totalSlides={totalSlides}
                        slidesPerView={slidesPerView}
                        activeIndex={activeIndex}
                        onClickDot={handlePaginationClick}
                        onKeyDownDot={handleKeyDown}
                    />
                )}
            </div>
        </CarouselContainer>
    );
};

ContentCarousel.displayName = "ContentCarousel";

export default ContentCarousel;
