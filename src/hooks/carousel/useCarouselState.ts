import { useState, useCallback } from "react";

import type { UseCarouselStateReturn } from "@/types";

const useCarouselState = (totalSlides: number): UseCarouselStateReturn => {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const [visibleSlides, setVisibleSlides] = useState<Set<number>>(
        new Set([0])
    );

    const calculateVisibleSlides = useCallback(
        (currentIndex: number, currentSlidesPerView: number) => {
            const visible = new Set<number>();
            for (let i = 0; i < currentSlidesPerView; i++) {
                const slideIndex = (currentIndex + i) % totalSlides;
                visible.add(slideIndex);
            }
            return visible;
        },
        [totalSlides]
    );

    return {
        mounted,
        activeIndex,
        slidesPerView,
        visibleSlides,
        setMounted,
        setActiveIndex,
        setSlidesPerView,
        setVisibleSlides,
        calculateVisibleSlides,
    };
};

export default useCarouselState;
