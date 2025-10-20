"use client";

import { motion } from "framer-motion";
import React, { useCallback, useMemo } from "react";

import type { CarouselPaginationProps } from "@/types";

const CarouselPagination: React.FC<CarouselPaginationProps> = ({
    totalSlides,
    slidesPerView,
    activeIndex,
    onClickDot,
    onKeyDownDot,
}) => {
    const shouldRender = totalSlides > slidesPerView;
    const indices = useMemo(
        () => Array.from({ length: totalSlides }, (_, i) => i),
        [totalSlides]
    );

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

    if (!shouldRender) return null;

    return (
        <motion.div
            className="swiper-carousel-navigation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            role="tablist"
            aria-label="Carousel pagination"
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
                />
            ))}
        </motion.div>
    );
};

CarouselPagination.displayName = "CarouselPagination";

export default CarouselPagination;
