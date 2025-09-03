/**
 * Sidebar configuration constants
 */
const SIDEBAR_CONFIG = {
    /** Menu items displayed in the sidebar */
    MENU_ITEMS: [
        "Home",
        "Services", 
        "Skills",
        "Works",
        "Resume",
        "Testimonials",
        "Pricing",
        "Blog",
        "Contact"
    ] as const,
    
    /** Animation timing constants */
    ANIMATION: {
        /** Delay between menu items appearing */
        ITEM_STAGGER_DELAY: 90,
        /** Delay between letters in menu item text */
        LETTER_STAGGER_DELAY: 25,
        /** Total sidebar transition duration */
        SIDEBAR_TRANSITION_DURATION: 850,
    },
    
    /** Social links configuration */
    SOCIAL_LINKS: {
        iconSize: "size-5",
        iconMargin: "mr-[14px]",
        containerMargin: "ml-[130px]",
    },
    
    /** VLine block positioning */
    VLINE: {
        left: "75px",
        top: "0",
        bottom: "-30px",
    },
} as const;

export default SIDEBAR_CONFIG;