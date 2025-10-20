import { useEffect } from "react";

import type { UseCarouselInitializationProps } from "@/types";

const useCarouselInitialization = ({
    totalSlides,
    slidesPerView,
    setMounted,
    setVisibleSlides,
}: UseCarouselInitializationProps) => {
    useEffect(() => {
        setMounted(true);

        const initialVisible = new Set<number>();
        const maxSlides = Math.min(slidesPerView, totalSlides);

        for (let i = 0; i < maxSlides; i++) {
            initialVisible.add(i);
        }

        setVisibleSlides(initialVisible);
    }, [slidesPerView, totalSlides, setMounted, setVisibleSlides]);
};

export default useCarouselInitialization;
