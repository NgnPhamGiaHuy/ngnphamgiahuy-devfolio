"use client"

import React, { useMemo } from "react";
import { motion } from "framer-motion";

import type { AnimatedTextProps } from "@/types";

import { Duration, HeroAnimationsConfig } from "@/config";

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, baseDelay = 0, className = "", containerClassName = "", staggerDelay = 40, duration = Duration.FAST }) => {
    const shouldAnimateWords = useMemo(() => text.length > 50, [text]);

    if (shouldAnimateWords) {
        const words = text.split(" ");

        const containerVariants = HeroAnimationsConfig.animatedText.createWordContainer(baseDelay);

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
                            {...HeroAnimationsConfig.animatedText.wordItem(baseDelay, index, staggerDelay, duration)}
                        >
                            {word}
                        </motion.span>
                        {index < words.length - 1 && " "}
                    </React.Fragment>
                ))}
            </motion.span>
        );
    }

    const containerVariants = HeroAnimationsConfig.animatedText.createCharContainer(baseDelay);

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
                    {...HeroAnimationsConfig.animatedText.charItem(baseDelay, index, staggerDelay, duration)}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default AnimatedText;
