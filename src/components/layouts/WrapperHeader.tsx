// ============================================================
// Component: WrapperHeader
// Purpose: Section header with animated title and subtitle
// ============================================================

"use client";

import { motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";

import type { WrapperHeaderProps } from "@/types";

import { AnimatedText } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * WrapperHeader component renders animated section headers.
 * Features word-by-word animations and proper accessibility.
 *
 * @param props - Component props
 * @param props.title - Section title
 * @param props.subtitle - Section subtitle
 * @param props.isInView - Whether the component is in view
 * @returns Wrapper header component
 */
const WrapperHeader: React.FC<WrapperHeaderProps> = ({
    title,
    subtitle,
    isInView = true,
    ...props
}) => {
    // ============================================================
    // State
    // ============================================================

    const [animationKey, setAnimationKey] = useState(0);

    // ============================================================
    // Effects
    // ============================================================

    useEffect(() => {
        if (isInView) {
            setAnimationKey((prev) => prev + 1);
        }
    }, [isInView]);

    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple string operations don't need memoization
    const parts = subtitle.split(" ");
    const firstSubtitleWord = parts[0] || "";
    const restSubtitleWords = parts.slice(1).join(" ");

    // Remove unnecessary useMemo - static animation variants don't need memoization
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25 },
        },
    };

    const spanVariants = ({ index }: { index: number }): Variants => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.25 },
        },
    });

    // ============================================================
    // Render
    // ============================================================

    return (
        <section
            className="wrapper-header"
            data-testid="wrapper-header"
            {...props}
        >
            <div className="container-1300">
                <div className="flex-full">
                    <div className="p-[10px] flex-wrap-start">
                        <div className="w-full text-center relative">
                            {/* Animated Title */}
                            <motion.h2
                                key={`title-${animationKey}`}
                                className="wrapper-header-title"
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={itemVariants}
                            >
                                {title?.split(" ").map((word, index, array) => (
                                    <React.Fragment key={index}>
                                        <motion.span
                                            className="wrapper-header-title-word"
                                            variants={spanVariants({ index })}
                                        >
                                            {word}
                                        </motion.span>
                                        {index !== array.length - 1 && (
                                            <span> </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </motion.h2>

                            {/* Animated Subtitle */}
                            <motion.div
                                key={`subtitle-${animationKey}`}
                                className="wrapper-header-subtitle"
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={itemVariants}
                            >
                                <AnimatedText
                                    text={firstSubtitleWord}
                                    baseDelay={0}
                                    key={`first-word-${animationKey}`}
                                />
                                <motion.strong
                                    className="wrapper-header-subtitle-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    key={`rest-words-container-${animationKey}`}
                                >
                                    <AnimatedText
                                        text={restSubtitleWords}
                                        baseDelay={1200}
                                        key={`rest-words-${animationKey}`}
                                    />
                                </motion.strong>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

WrapperHeader.displayName = "WrapperHeader";

export default WrapperHeader;
