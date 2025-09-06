"use client";

import React, { useMemo } from "react";
import { motion, easeOut } from "framer-motion";

import { AnimatedTextCharacterProps } from "@/types/common.types";
import { Duration, Stagger } from "@/config/animation.config";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const AnimatedTextCharacter: React.FC<AnimatedTextCharacterProps> = ({ text, baseDelay = 0, className = "", containerClassName = "", staggerDelay = 40, duration = Duration.FAST }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const shouldAnimateWords = useMemo(() => text.length > 50, [text]);

    if (prefersReducedMotion) {
        return <span className={containerClassName}>{text}</span>;
    }

    if (shouldAnimateWords) {
        const words = text.split(" ");

        const containerVariants = {
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: Stagger.NORMAL,
                    delayChildren: baseDelay / 1000
                }
            }
        };

        return (
            <motion.span
                className={containerClassName}
                initial={"hidden"}
                animate={"visible"}
                variants={containerVariants}
            >
                {words.map((word, index) => (
                    <React.Fragment key={`word-${index}`}>
                        <motion.span
                            className={className}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: (baseDelay + (index * staggerDelay * 2)) / 1000,
                                duration,
                                ease: easeOut
                            }}
                        >
                            {word}
                        </motion.span>
                        {index < words.length - 1 && " "}
                    </React.Fragment>
                ))}
            </motion.span>
        );
    }

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: Stagger.TEXT,
                delayChildren: baseDelay / 1000
            }
        }
    };

    return (
        <motion.span
            className={containerClassName}
            initial={"hidden"}
            animate={"visible"}
            variants={containerVariants}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    className={className}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: (baseDelay + (index * staggerDelay)) / 1000,
                        duration,
                        ease: easeOut
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default AnimatedTextCharacter;