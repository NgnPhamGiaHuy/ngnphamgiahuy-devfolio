"use client";

import React, { useMemo } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";

import type { CarouselSlidesProps } from "@/types";

import {
    SWIPER_MODULES,
    AUTOPLAY_CONFIG,
    BREAKPOINTS,
    A11Y_CONFIG,
} from "@/config";

const CarouselSlides = <T,>({
    items,
    spaceBetween,
    visibleSlides,
    onSwiper,
    onResize,
    onBreakpoint,
    onSlideChange,
    renderItem,
}: CarouselSlidesProps<T>) => {
    const indices = useMemo(() => items.map((_, index) => index), [items]);

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
        >
            {indices.map((index) => {
                const item = items[index] as unknown as { _id?: string } & T;
                const key = item?._id ?? `slide-${index}`;
                return (
                    <SwiperSlide
                        key={key}
                        role="group"
                        aria-roledescription="slide"
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
