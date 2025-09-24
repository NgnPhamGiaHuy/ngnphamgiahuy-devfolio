import { Variants } from "framer-motion";

export interface AnimationConfig {
    fadeIn: () => Variants;
    fadeInUp: (distance?: number) => Variants;
    fadeInDown: (distance?: number) => Variants;
    scaleIn: (startScale?: number) => Variants;
    springUp: (distance?: number) => Variants;
    staggerChildren: (staggerTime?: number, delayTime?: number) => Variants;
    buttonHover: () => Variants;
}