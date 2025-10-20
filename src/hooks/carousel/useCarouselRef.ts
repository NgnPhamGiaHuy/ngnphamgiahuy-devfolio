import React, { useRef, useCallback } from "react";
import type { Swiper as SwiperType } from "swiper";

import type { UseCarouselRefReturn } from "@/types";

const useCarouselRef = (): UseCarouselRefReturn => {
    const swiperRef = useRef<SwiperType>(null!);

    const handlePaginationClick = useCallback((index: number) => {
        swiperRef.current?.slideToLoop(index);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent, index: number) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePaginationClick(index);
            }
        },
        [handlePaginationClick]
    );

    return {
        swiperRef,
        handlePaginationClick,
        handleKeyDown,
    };
};

export default useCarouselRef;
