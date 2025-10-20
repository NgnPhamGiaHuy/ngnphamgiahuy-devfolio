import type { Swiper as SwiperType } from "swiper";

import type { UseCarouselEventsProps } from "@/types";

const useCarouselEvents = ({
    swiperRef,
    setSlidesPerView,
    setActiveIndex,
    setVisibleSlides,
    calculateVisibleSlides,
    activeIndex,
    slidesPerView,
}: UseCarouselEventsProps) => {
    const onSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper;
        const newSlidesPerView = swiper.params.slidesPerView as number;
        setSlidesPerView(newSlidesPerView);
    };

    const onResize = (swiper: SwiperType) => {
        setSlidesPerView(swiper.params.slidesPerView as number);
    };

    const onBreakpoint = (swiper: SwiperType) => {
        const newSlidesPerView = swiper.params.slidesPerView as number;
        setSlidesPerView(newSlidesPerView);
        setVisibleSlides(calculateVisibleSlides(activeIndex, newSlidesPerView));
    };

    const onSlideChange = (swiper: SwiperType) => {
        const newActiveIndex = swiper.realIndex;
        setActiveIndex(newActiveIndex);
        setVisibleSlides(calculateVisibleSlides(newActiveIndex, slidesPerView));
    };

    return {
        onSwiper,
        onResize,
        onBreakpoint,
        onSlideChange,
    };
};

export default useCarouselEvents;
