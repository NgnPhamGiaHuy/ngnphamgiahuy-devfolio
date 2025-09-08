import { Variants } from "framer-motion";

export interface AnimationConfig {
    fadeIn: (prefersReducedMotion?: boolean) => Variants;
    fadeInUp: (prefersReducedMotion?: boolean, distance?: number) => Variants;
    fadeInDown: (prefersReducedMotion?: boolean, distance?: number) => Variants;
    scaleIn: (prefersReducedMotion?: boolean, startScale?: number) => Variants;
    springUp: (prefersReducedMotion?: boolean, distance?: number) => Variants;
    staggerChildren: (prefersReducedMotion?: boolean, staggerTime?: number, delayTime?: number) => Variants;
    buttonHover: (prefersReducedMotion?: boolean) => Variants;
    [key: string]: (...args: any[]) => Variants;
}