"use client"

import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import React, { useEffect, useState, useRef } from "react";

interface GenericSwiperProps<T> {
    items: T[];
    spaceBetween?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
}

const ContentSwiper = <T,>({ items, spaceBetween = 40, renderItem }: GenericSwiperProps<T>) => {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const swiperRef = useRef<SwiperType | null>(null);

    const totalSlides = items.length;

    useEffect(() => {
        setMounted(true);
    }, []);

    const handlePaginationClick = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index);
        }
    };

    return (
        <div className={"swiper-container-outer"}>
            <div className={"swiper-container"}>
                { mounted && (
                    <Swiper
                        autoHeight={true}
                        modules={[Pagination]}
                        spaceBetween={spaceBetween}
                        slidesPerView={1}
                        loop={true}
                        speed={800}
                        effect="slide"
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setSlidesPerView(swiper.params.slidesPerView as number);
                        }}
                        onResize={(swiper) => {
                            setSlidesPerView(swiper.params.slidesPerView as number);
                        }}
                        onBreakpoint={(swiper) => {
                            setSlidesPerView(swiper.params.slidesPerView as number);
                        }}
                        onSlideChange={(swiper) => {
                            setActiveIndex(swiper.realIndex);
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        { items.map((item, index) => (
                            <SwiperSlide key={index}>
                                {renderItem(item, index)}
                            </SwiperSlide>
                        )) }
                    </Swiper>
                ) }
                { mounted && totalSlides > slidesPerView && (
                    <div className={"swiper-navigation"}>
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <span
                                key={index}
                                className={`swiper-pagination-dot ${
                                    index === activeIndex
                                        ? "swiper-dot-active"
                                        : "swiper-dot-inactive"
                                }`}
                                onClick={() => handlePaginationClick(index)}
                            />
                        ))}
                    </div>
                ) }
            </div>
        </div>
    );
};

export default ContentSwiper;
