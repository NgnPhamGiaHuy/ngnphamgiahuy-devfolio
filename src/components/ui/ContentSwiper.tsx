"use client"

import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import React, { useEffect, useState, useRef } from "react";

import ServiceCard from "@/components/sections/services/ServiceCard";

import { ServicesProps } from "@/types";

const ContentSwiper: React.FC<ServicesProps> = ({ cards }) => {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    const totalSlides = cards.length;

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
                        spaceBetween={40}
                        slidesPerView={1}
                        loop={true}
                        speed={800}
                        effect="slide"
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
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
                        { cards.map((card, index) => (
                            <SwiperSlide key={index}>
                                <ServiceCard service={card} index={index} />
                            </SwiperSlide>
                        )) }
                    </Swiper>
                ) }
                <div className={"swiper-navigation"}>
                    { mounted && Array.from({ length: totalSlides }).map((_, index) => (
                        <span
                            key={index}
                            className={`swiper-pagination-dot ${index === activeIndex ? "swiper-dot-active" : "swiper-dot-inactive"}`}
                            onClick={() => handlePaginationClick(index)}
                        ></span>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default ContentSwiper;
