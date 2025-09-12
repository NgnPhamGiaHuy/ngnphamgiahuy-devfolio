"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { ContentCardProps } from "@/types";
import { StandardAnimations } from "@/config";

import { usePrefersReducedMotion } from "@/hooks";

const ContentCard: React.FC<ContentCardProps> = ({ item, index }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const cardVariants = StandardAnimations.scaleIn(prefersReducedMotion, 0.95);
    const contentVariants = StandardAnimations.fadeInUp(prefersReducedMotion, 10);

    return (
        <motion.div
            key={index}
            className={"content-card"}
            variants={cardVariants}
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
        >
            <motion.div
                className={"content-card-inner"}
                whileHover={{ y: -5 }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            >
                <motion.div className={"content-card-category"} variants={contentVariants}>
                    <span>
                        {item.category}
                    </span>
                </motion.div>
                <motion.div className={"content-card-icon"} variants={contentVariants}></motion.div>
                <motion.h5 className={"content-card-title"} variants={contentVariants}>
                    <span>
                        {item.title}
                    </span>
                </motion.h5>
                <motion.div className={"content-card-description"} variants={contentVariants}>
                    <p>
                        {item.description}
                    </p>
                </motion.div>
                <motion.div variants={contentVariants}>
                    <Link href={"/src/public"}>
                        <span className={"content-card-link"}>
                            More information
                        </span>
                    </Link>
                </motion.div>
                <motion.div
                    className={"content-card-pattern"}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                ></motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ContentCard;


