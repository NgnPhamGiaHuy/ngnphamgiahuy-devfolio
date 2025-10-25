// ============================================================
// Component: CarouselPagination
// Purpose: Carousel pagination dots with accessibility and animations
// ============================================================

"use client";

import { motion } from "framer-motion";
import React, { useCallback } from "react";

// ============================================================
// Types
// ============================================================

/**
 * Props for CarouselPagination component
 */
interface CarouselPaginationProps {
    totalSlides: number;
    slidesPerView: number;
    activeIndex: number;
    onClickDot: (index: number) => void;
    onKeyDownDot: (
        event: React.KeyboardEvent<HTMLSpanElement>,
        index: number
    ) => void;
}

// ============================================================
// Component Definition
// ============================================================

/**
 * CarouselPagination component renders pagination dots for carousel navigation.
 * Features accessibility, keyboard navigation, and smooth animations.
 *
 * @param props - Component props
 * @param props.totalSlides - Total number of slides
 * @param props.slidesPerView - Number of slides visible at once
 * @param props.activeIndex - Currently active slide index
 * @param props.onClickDot - Click handler for pagination dots
 * @param props.onKeyDownDot - Keyboard handler for pagination dots
 * @returns Carousel pagination component
 */
const CarouselPagination: React.FC<CarouselPaginationProps> = ({
    totalSlides,
    slidesPerView,
    activeIndex,
    onClickDot,
    onKeyDownDot,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const shouldRender = totalSlides > slidesPerView;

    // Remove unnecessary useMemo - simple array creation doesn't need memoization
    const indices = Array.from({ length: totalSlides }, (_, i) => i);

    // ============================================================
    // Event Handlers
    // ============================================================

    const handleClick = useCallback(
        (index: number) => {
            onClickDot(index);
        },
        [onClickDot]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLSpanElement>, index: number) => {
            onKeyDownDot(e, index);
        },
        [onKeyDownDot]
    );

    // ============================================================
    // Render
    // ============================================================

    if (!shouldRender) return null;

    return (
        <motion.div
            className="swiper-carousel-navigation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            role="tablist"
            aria-label="Carousel pagination"
            data-testid="carousel-pagination"
            {...props}
        >
            {indices.map((index) => (
                <span
                    key={`carousel-dot-${index}`}
                    className={`swiper-carousel-pagination-dot ${
                        index === activeIndex
                            ? "swiper-carousel-dot-active"
                            : "swiper-carousel-dot-inactive"
                    }`}
                    onClick={() => handleClick(index)}
                    role="tab"
                    tabIndex={0}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-selected={index === activeIndex}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    data-testid={`carousel-pagination-dot-${index}`}
                />
            ))}
        </motion.div>
    );
};

CarouselPagination.displayName = "CarouselPagination";

export default CarouselPagination;
