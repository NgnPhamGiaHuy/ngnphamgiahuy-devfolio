"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import React, { useMemo } from "react";

import type { ContentCarouselProps } from "@/types";

import {
    useCarouselState,
    useCarouselRef,
    useCarouselEvents,
    useCarouselInitialization,
} from "@/hooks";
import CarouselSlides from "./CarouselSlides";
import CarouselContainer from "./CarouselContainer";
import CarouselPagination from "./CarouselPagination";

const ContentCarousel = <T,>({
    items,
    spaceBetween = 40,
    renderItem,
}: ContentCarouselProps<T>) => {
    const totalSlides = useMemo(() => items.length, [items]);

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

    useCarouselInitialization({
        totalSlides,
        slidesPerView,
        setMounted,
        setVisibleSlides,
    });

    return (
        <CarouselContainer>
            <div className="swiper-carousel">
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
