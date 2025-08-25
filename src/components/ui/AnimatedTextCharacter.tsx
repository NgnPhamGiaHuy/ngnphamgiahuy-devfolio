"use client"

import React from "react";
import { motion } from "framer-motion";

import { Easing } from "@/config/animation.config";

import { useHeroAnimation } from "@/hooks/animation";

import { AnimatedTextCharacterProps } from "@/types";

const AnimatedTextCharacter: React.FC<AnimatedTextCharacterProps> = ({ text, stage, baseDelay = 0, className = "", containerClassName = "" }) => {
    const { prefersReducedMotion, shouldAnimate } = useHeroAnimation();

    if (prefersReducedMotion) {
        return <span className={containerClassName}>{text}</span>;
    }

    const characterVariants = {
        hidden: {
            opacity: 0,
            y: 10,
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: (baseDelay + (i * 40)) / 1000,
                duration: 0.3,
                ease: Easing.BOUNCE,
                staggerChildren: 0.03,
            },
        }),
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.015,
                delayChildren: baseDelay / 1000
            }
        }
    };

    return (
        <motion.span className={containerClassName} initial={"hidden"} animate={shouldAnimate(stage) ? "visible" : "hidden"} variants={containerVariants}>
            { text.split("").map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    className={className}
                    custom={index}
                    initial={"hidden"}
                    animate={shouldAnimate(stage) ? "visible" : "hidden"}
                    style={{ opacity: shouldAnimate(stage) ? undefined : 0 }}
                    variants={characterVariants}
                >
                    { char }
                </motion.span>
            )) }
        </motion.span>
    );
};

export default AnimatedTextCharacter;