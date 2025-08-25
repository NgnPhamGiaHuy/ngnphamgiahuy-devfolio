"use client"

import React from "react";
import { motion, Variants } from "framer-motion";

import { AnimationVariants } from "@/types";

import AnimatedTextCharacter from "@/components/ui/AnimatedTextCharacter";

const ServicesHeader = () => {
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
        <section className={"services-header-section"}>
            <div className={"services-header-container"}>
                <div className={"services-wrapper"}>
                    <div className={"services-content-wrapper"}>
                        <div className={"services-header-content"}>
                            <motion.h2 className={"services-title"} variants={itemVariants}>
                                { "What i do".split(" ").map((word, index) => (
                                    <motion.span
                                        key={`name-${index}`}
                                        className={"services-title-word"}
                                        variants={spanVariants({ index })}
                                    >
                                        { word }
                                    </motion.span>
                                ))}
                            </motion.h2>
                            <motion.div className={"services-subtitle"} variants={itemVariants}>
                                <AnimatedTextCharacter
                                    text={"My"}
                                    baseDelay={0}
                                />
                                <motion.strong
                                    className={"services-subtitle-text"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <AnimatedTextCharacter
                                        text={"Service"}
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

export default ServicesHeader;
