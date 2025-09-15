"use client"

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

import { WrapperHeaderProps } from "@/types";

import { AnimatedText } from "@/components";

const WrapperHeader: React.FC<WrapperHeaderProps> = ({ title, subtitle, isInView = true }) => {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        if (isInView) {
            setAnimationKey(prev => prev + 1);
        }
    }, [isInView]);

    const firstSubtitleWord = subtitle.split(" ")[0];
    const restSubtitleWords = subtitle.split(" ").slice(1).join(" ");

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25 }
        }
    };

    const spanVariants = ({ index }: { index: number }): Variants => {
        const variants = {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.25 }
            }
        }

        return variants;
    }

    return (
        <section className={"wrapper-header-section"}>
            <div className={"wrapper-header-container"}>
                <div className={"wrapper-header-outer"}>
                    <div className={"wrapper-header-content-wrapper"}>
                        <div className={"wrapper-header-content"}>
                            <motion.h2
                                key={`title-${animationKey}`}
                                className={"wrapper-header-title"}
                                initial={"hidden"}
                                animate={isInView ? "visible" : "hidden"}
                                variants={itemVariants}
                            >
                                {title?.split(" ").map((word, index, array) => (
                                    <React.Fragment key={index}>
                                        <motion.span
                                            className={"wrapper-header-title-word"}
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
                            <motion.div
                                key={`subtitle-${animationKey}`}
                                className={"wrapper-header-subtitle"}
                                initial={"hidden"}
                                animate={isInView ? "visible" : "hidden"}
                                variants={itemVariants}
                            >
                                <AnimatedText
                                    text={firstSubtitleWord}
                                    baseDelay={0}
                                    key={`first-word-${animationKey}`}
                                />
                                <motion.strong
                                    className={"wrapper-header-subtitle-text"}
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

export default WrapperHeader;
