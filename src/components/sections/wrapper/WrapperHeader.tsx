"use client"

import React from "react";
import { motion, Variants } from "framer-motion";

import { AnimationVariants } from "@/types";

import AnimatedTextCharacter from "@/components/ui/AnimatedTextCharacter";

interface ServicesHeaderProps {
    title: string;
    subtitle: string;
}

const WrapperHeader : React.FC<ServicesHeaderProps> = ({ title, subtitle }) => {
    const firstSubtitleWord = subtitle.split(" ")[0];
    const restSubtitleWords = subtitle.split(" ").slice(1).join(" ");

    const itemVariants: AnimationVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25 }
        }
    };

    const spanVariants = ({ index } : { index : number }) : Variants => {
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
                            <motion.h2 className={"wrapper-header-title"} variants={itemVariants}>
                                { title?.split(" ").map((word, index) => (
                                    <motion.span
                                        key={`name-${index}`}
                                        className={"wrapper-header-title-word"}
                                        variants={spanVariants({ index })}
                                    >
                                        { word }
                                    </motion.span>
                                ))}
                            </motion.h2>
                            <motion.div className={"wrapper-header-subtitle"} variants={itemVariants}>
                                <AnimatedTextCharacter
                                    text={firstSubtitleWord}
                                    baseDelay={0}
                                />
                                <motion.strong
                                    className={"wrapper-header-subtitle-text"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <AnimatedTextCharacter
                                        text={restSubtitleWords}
                                        baseDelay={1200}
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
