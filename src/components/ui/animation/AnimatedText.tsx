"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

import type { AnimatedTextProps } from "@/types";

import { Duration, HeroAnimationsConfig } from "@/config";

const AnimatedText: React.FC<AnimatedTextProps> = ({
    text,
    baseDelay = 0,
    className = "",
    containerClassName = "",
    staggerDelay = 40,
    duration = Duration.FAST,
}) => {
    const safeText = useMemo(() => text ?? "", [text]);
    const shouldAnimateWords = useMemo(() => safeText.length > 50, [safeText]);
    const words = useMemo(() => safeText.split(" "), [safeText]);
    const chars = useMemo(() => safeText.split(""), [safeText]);
    const wordContainerVariants = useMemo(
        () => HeroAnimationsConfig.animatedText.createWordContainer(baseDelay),
        [baseDelay]
    );
    const charContainerVariants = useMemo(
        () => HeroAnimationsConfig.animatedText.createCharContainer(baseDelay),
        [baseDelay]
    );

    if (shouldAnimateWords) {
        return (
            <motion.span
                className={containerClassName}
                initial={"hidden"}
                animate={"visible"}
                variants={wordContainerVariants}
            >
                {words.map((word, index) => (
                    <React.Fragment key={`word-${index}`}>
                        <motion.span
                            className={className}
                            {...HeroAnimationsConfig.animatedText.wordItem(
                                baseDelay,
                                index,
                                staggerDelay,
                                duration
                            )}
                        >
                            {word}
                        </motion.span>
                        {index < words.length - 1 && " "}
                    </React.Fragment>
                ))}
            </motion.span>
        );
    }

    return (
        <motion.span
            className={containerClassName}
            initial={"hidden"}
            animate={"visible"}
            variants={charContainerVariants}
        >
            {chars.map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    className={className}
                    {...HeroAnimationsConfig.animatedText.charItem(
                        baseDelay,
                        index,
                        staggerDelay,
                        duration
                    )}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

AnimatedText.displayName = "AnimatedText";

export default AnimatedText;
