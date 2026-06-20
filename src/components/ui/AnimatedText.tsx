// ============================================================
// Component: AnimatedText
// Purpose: Text animation component with word/character staggering
// ============================================================

"use client";

import React from "react";
import { m } from "framer-motion";

import type { AnimatedTextProps } from "@/shared/types";

import { AnimatedTextConfig, Duration } from "@/infrastructure/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * AnimatedText component renders text with staggered animations.
 * Features word-based or character-based animations based on text length.
 *
 * @param props - Component props
 * @param props.text - Text content to animate
 * @param props.baseDelay - Base animation delay
 * @param props.className - CSS classes for text elements
 * @param props.containerClassName - CSS classes for container
 * @param props.staggerDelay - Delay between each element animation
 * @param props.duration - Animation duration
 * @returns Animated text component
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({
    text,
    baseDelay = 0,
    className = "",
    containerClassName = "",
    staggerDelay = 40,
    duration = Duration.FAST,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple string operations don't need memoization
    const safeText = text ?? "";
    const shouldAnimateWords = safeText.length > 50;
    const words = safeText.split(" ");
    const chars = safeText.split("");

    // Remove unnecessary useMemo - animation variants are static objects
    const wordContainerVariants =
        AnimatedTextConfig.createWordContainer(baseDelay);
    const charContainerVariants =
        AnimatedTextConfig.createCharContainer(baseDelay);

    // ============================================================
    // Render Functions
    // ============================================================

    const renderWordAnimation = () => (
        <m.span
            className={containerClassName}
            initial="hidden"
            animate="visible"
            variants={wordContainerVariants}
            data-testid="animated-text-words"
            {...props}
        >
            {words.map((word, index) => (
                <React.Fragment key={`word-${index}`}>
                    <m.span
                        className={className}
                        {...AnimatedTextConfig.wordItem(
                            baseDelay,
                            index,
                            staggerDelay,
                            duration
                        )}
                        data-testid={`animated-word-${index}`}
                    >
                        {word}
                    </m.span>
                    {index < words.length - 1 && " "}
                </React.Fragment>
            ))}
        </m.span>
    );

    const renderCharAnimation = () => (
        <m.span
            className={containerClassName}
            initial="hidden"
            animate="visible"
            variants={charContainerVariants}
            data-testid="animated-text-chars"
            {...props}
        >
            {chars.map((char, index) => (
                <m.span
                    key={`${char}-${index}`}
                    className={className}
                    {...AnimatedTextConfig.charItem(
                        baseDelay,
                        index,
                        staggerDelay,
                        duration
                    )}
                    data-testid={`animated-char-${index}`}
                >
                    {char}
                </m.span>
            ))}
        </m.span>
    );

    // ============================================================
    // Render
    // ============================================================

    return shouldAnimateWords ? renderWordAnimation() : renderCharAnimation();
};

AnimatedText.displayName = "AnimatedText";

export default AnimatedText;
