export const SIDEBAR_CONFIG = {
    MENU_ITEMS: [
        "Home",
        "Services", 
        "Skills",
        "Portfolios",
        "Resume",
        "Testimonials",
        "Pricing",
        "Blog",
        "Contact"
    ] as const,
    
    ANIMATION: {
        ITEM_STAGGER_DELAY: 90,
        LETTER_STAGGER_DELAY: 25,
        SIDEBAR_TRANSITION_DURATION: 850,
    },
    
    SOCIAL_LINKS: {
        iconSize: "size-5",
        iconMargin: "mr-[14px]",
        containerMargin: "ml-[130px]",
    },
    
    VLINE: {
        left: "75px",
        top: "0",
        bottom: "-30px",
    },
} as const;

export default SIDEBAR_CONFIG;