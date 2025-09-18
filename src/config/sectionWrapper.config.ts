import { Variants } from "framer-motion";

export const SECTION_WRAPPER_CONFIG = {
    CONTAINER_VARIANTS: {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.2 }
        }
    } as Variants,

    BACKGROUNDS: {
        gradientUp: "bg-[image:linear-gradient(0deg,#fff_0%,#f0ebe3_100%)] dark:bg-[image:linear-gradient(0deg,#31363c_0%,#222831_100%)]",
        gradientDown: "bg-[image:linear-gradient(rgb(255,255,255)_0%_0%,rgb(240,235,227)_100%)] dark:bg-[image:linear-gradient(180deg,#31363c_0%,#222831_100%)]",
        none: "bg-[image:linear-gradient(180deg,#f0ebe3_0%,#f0ebe3_100%)] dark:bg-[image:linear-gradient(180deg,#222831_0%,#222831_100%)]",
    } as const,

    VLINE_POSITIONS: {
        right: {
            top: "-70px",
            right: "-100px",
            bottom: "-30px",
            left: "auto",
            shadow: "before:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)] dark:before:shadow-[-5px_-5px_0_rgb(255_255_255/0.2)] after:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)] dark:after:shadow-[-5px_-5px_0_rgb(255_255_255/0.2)]",
            className: "rotate-180 transform",
        },
        left: {
            top: "-70px",
            right: "auto",
            bottom: "-70px",
            left: "-100px",
            shadow: "before:shadow-[5px_-5px_0_rgb(0_0_0/0.2)] dark:before:shadow-[5px_-5px_0_rgb(255_255_255/0.2)] after:shadow-[5px_-5px_0_rgb(0_0_0/0.2)] dark:after:shadow-[5px_-5px_0_rgb(255_255_255/0.2)]",
            className: "rotate-180 transform -scale-x-100",
        },
    } as const,
} as const;

export const containerVariants = SECTION_WRAPPER_CONFIG.CONTAINER_VARIANTS;
export const backgroundByName = SECTION_WRAPPER_CONFIG.BACKGROUNDS;
export const vlinePositions = SECTION_WRAPPER_CONFIG.VLINE_POSITIONS;