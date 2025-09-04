import { Variants } from "framer-motion";

export const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.2 }
    }
} as const;

export const backgroundByName = {
    gradientUp: "bg-[linear-gradient(0deg,#fff_0%,#f0ebe3_100%)]",
    gradientDown: "bg-[linear-gradient(rgb(255,255,255)_0%_0%,rgb(240,235,227)_100%)]",
    none: "bg-none",
} as const;

export const vlinePositions = {
    right: {
        top: "-70px",
        right: "-100px",
        bottom: "-30px",
        left: "auto",
        shadow: "before:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)] after:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)]",
        className: "rotate-180 transform",
    },
    left: {
        top: "-70px",
        right: "auto",
        bottom: "-70px",
        left: "-100px",
        shadow: "before:shadow-[5px_-5px_0_rgb(0_0_0/0.2)] after:shadow-[5px_-5px_0_rgb(0_0_0/0.2)]",
        className: "rotate-180 transform -scale-x-100",
    },
} as const;


