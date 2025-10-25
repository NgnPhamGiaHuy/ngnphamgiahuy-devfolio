// ============================================================
// Component: CarouselSlides
// Purpose: Swiper slides component with accessibility and responsive design
// ============================================================

"use client";

import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import {
    SWIPER_MODULES,
    AUTOPLAY_CONFIG,
    BREAKPOINTS,
    A11Y_CONFIG,
} from "@/config";

// ============================================================
// Types
// ============================================================

/**
 * Props for CarouselSlides component
 */
interface CarouselSlidesProps<T> {
    items: T[];
    spaceBetween: number;
    visibleSlides: Set<number>;
    onSwiper: (swiper: SwiperType) => void;
    onResize: (swiper: SwiperType) => void;
    onBreakpoint: (swiper: SwiperType) => void;
    onSlideChange: (swiper: SwiperType) => void;
    renderItem: (item: T, index: number, isVisible: boolean) => React.ReactNode;
}

// ============================================================
// Component Definition
// ============================================================

/**
 * CarouselSlides component renders Swiper slides with accessibility.
 * Features responsive design, keyboard navigation, and proper ARIA support.
 *
 * @param props - Component props
 * @param props.items - Array of items to display
 * @param props.spaceBetween - Space between slides
 * @param props.visibleSlides - Set of visible slide indices
 * @param props.onSwiper - Swiper instance callback
 * @param props.onResize - Resize event callback
 * @param props.onBreakpoint - Breakpoint change callback
 * @param props.onSlideChange - Slide change callback
 * @param props.renderItem - Function to render each item
 * @returns Carousel slides component
 */
const CarouselSlides = <T,>({
    items,
    spaceBetween,
    visibleSlides,
    onSwiper,
    onResize,
    onBreakpoint,
    onSlideChange,
    renderItem,
    ...props
}: CarouselSlidesProps<T>) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple array mapping doesn't need memoization
    const indices = items.map((_, index) => index);

    // ============================================================
    // Render
    // ============================================================

    return (
        <Swiper
            autoHeight={true}
            modules={SWIPER_MODULES}
            spaceBetween={spaceBetween}
            slidesPerView={1}
            loop={true}
            autoplay={AUTOPLAY_CONFIG}
            speed={1000}
            effect="slide"
            keyboard={{ enabled: true }}
            a11y={A11Y_CONFIG}
            onSwiper={onSwiper}
            onResize={onResize}
            onBreakpoint={onBreakpoint}
            onSlideChange={onSlideChange}
            breakpoints={BREAKPOINTS}
            data-testid="carousel-slides"
            {...props}
        >
            {indices.map((index) => {
                const item = items[index] as unknown as { _id?: string } & T;
                const key = item?._id ?? `slide-${index}`;

                return (
                    <SwiperSlide
                        key={key}
                        role="group"
                        aria-roledescription="slide"
                        data-testid={`carousel-slide-${index}`}
                    >
                        {renderItem(item as T, index, visibleSlides.has(index))}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

CarouselSlides.displayName = "CarouselSlides";

export default CarouselSlides;
