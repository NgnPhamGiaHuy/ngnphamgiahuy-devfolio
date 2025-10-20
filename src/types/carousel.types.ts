import React from "react";
import type { Swiper as SwiperType } from "swiper";

export interface UseCarouselStateReturn {
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

export interface UseCarouselRefReturn {
    swiperRef: React.RefObject<SwiperType>;
    handlePaginationClick: (index: number) => void;
    handleKeyDown: (e: React.KeyboardEvent, index: number) => void;
}

export interface UseCarouselEventsProps {
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

export interface UseCarouselInitializationProps {
    totalSlides: number;
    slidesPerView: number;
    setMounted: (mounted: boolean) => void;
    setVisibleSlides: (slides: Set<number>) => void;
}

export interface CarouselContainerProps {
    children: React.ReactNode;
}

export interface CarouselSlidesProps<T> {
    items: T[];
    spaceBetween: number;
    visibleSlides: Set<number>;
    onSwiper: (swiper: SwiperType) => void;
    onResize: (swiper: SwiperType) => void;
    onBreakpoint: (swiper: SwiperType) => void;
    onSlideChange: (swiper: SwiperType) => void;
    renderItem: (item: T, index: number, isVisible: boolean) => React.ReactNode;
}

export interface CarouselPaginationProps {
    totalSlides: number;
    slidesPerView: number;
    activeIndex: number;
    onClickDot: (index: number) => void;
    onKeyDownDot: (
        event: React.KeyboardEvent<HTMLSpanElement>,
        index: number
    ) => void;
}
