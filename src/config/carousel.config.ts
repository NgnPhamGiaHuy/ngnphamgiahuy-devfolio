import {
    Pagination,
    EffectFade,
    Keyboard,
    A11y,
    Autoplay,
} from "swiper/modules";

export const SWIPER_MODULES = [
    A11y,
    Autoplay,
    EffectFade,
    Keyboard,
    Pagination,
];

export const AUTOPLAY_CONFIG = {
    delay: 5000,
    disableOnInteraction: false,
} as const;

export const BREAKPOINTS = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
} as const;

export const A11Y_CONFIG = {
    prevSlideMessage: "Previous slide",
    nextSlideMessage: "Next slide",
    firstSlideMessage: "This is the first slide",
    lastSlideMessage: "This is the last slide",
    paginationBulletMessage: "Go to slide {{index}}",
} as const;
