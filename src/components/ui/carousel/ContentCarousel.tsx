"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState, useRef } from "react";
import { Pagination, EffectFade, Keyboard, A11y } from "swiper/modules";

import type { ContentCarouselProps } from "@/types";

import { StandardAnimations } from "@/config";

const ContentCarousel = <T,>({
    items,
    spaceBetween = 40,
    renderItem,
}: ContentCarouselProps<T>) => {
    const containerVariants = StandardAnimations.fadeIn();

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
        <motion.div
            className={"swiper-carousel-outer"}
            variants={containerVariants}
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className={"swiper-carousel"}>
                {mounted && (
                    <Swiper
                        autoHeight={true}
                        modules={[Pagination, EffectFade, Keyboard, A11y]}
                        spaceBetween={spaceBetween}
                        slidesPerView={1}
                        loop={true}
                        speed={600}
                        effect={"slide"}
                        keyboard={{ enabled: true }}
                        a11y={{
                            prevSlideMessage: "Previous slide",
                            nextSlideMessage: "Next slide",
                            firstSlideMessage: "This is the first slide",
                            lastSlideMessage: "This is the last slide",
                            paginationBulletMessage: "Go to slide {{index}}",
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setSlidesPerView(
                                swiper.params.slidesPerView as number
                            );
                        }}
                        onResize={(swiper) => {
                            setSlidesPerView(
                                swiper.params.slidesPerView as number
                            );
                        }}
                        onBreakpoint={(swiper) => {
                            setSlidesPerView(
                                swiper.params.slidesPerView as number
                            );
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
                        {items.map((item, index) => (
                            <SwiperSlide key={index}>
                                {renderItem(item, index)}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                {mounted && totalSlides > slidesPerView && (
                    <motion.div
                        className={"swiper-carousel-navigation"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        role={"tablist"}
                        aria-label={"Carousel pagination"}
                    >
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <span
                                key={index}
                                className={`swiper-carousel-pagination-dot ${
                                    index === activeIndex
                                        ? "swiper-carousel-dot-active"
                                        : "swiper-carousel-dot-inactive"
                                }`}
                                onClick={() => handlePaginationClick(index)}
                                role={"tab"}
                                tabIndex={0}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-selected={index === activeIndex}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handlePaginationClick(index);
                                    }
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ContentCarousel;
