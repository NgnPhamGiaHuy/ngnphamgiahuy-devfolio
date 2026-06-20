"use client";

import React from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";

import { EASE_STANDARD } from "./easing";

/**
 * Reveal — the default entrance primitive. Triggered (whileInView, once) not
 * scroll-linked, animating only opacity + transform (compositor-safe). Honors
 * prefers-reduced-motion by rendering the final state immediately. This is the
 * ~90% case; reach for `motion` directly only for bespoke choreography.
 */
interface RevealProps {
    children: React.ReactNode;
    className?: string;
    /** Vertical offset to rise from (px). */
    y?: number;
    delay?: number;
    /** Amount of element visible before firing. */
    amount?: number;
    as?: "div" | "section" | "li" | "article";
}

const Reveal: React.FC<RevealProps> = ({
    children,
    className,
    y = 16,
    delay = 0,
    amount = 0.2,
    as = "div",
}) => {
    const reduce = useReducedMotion();

    const variants: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: EASE_STANDARD, delay },
        },
    };

    const MotionTag = m[as];

    return (
        <MotionTag
            className={className}
            variants={variants}
            initial={reduce ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount }}
        >
            {children}
        </MotionTag>
    );
};

Reveal.displayName = "Reveal";

export default Reveal;
