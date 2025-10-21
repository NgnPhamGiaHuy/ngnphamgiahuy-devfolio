"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ServiceCardProps } from "@/types";

import { COMMON_ANIMATIONS } from "@/config";

const cardVariants = COMMON_ANIMATIONS.scaleIn95;
const contentVariants = COMMON_ANIMATIONS.fadeInUp15;
const patternVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
};

const ServiceCard: React.FC<ServiceCardProps> = ({
    item,
    isActive = false,
}) => {
    return (
        <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
        >
            <div className="card-inner">
                <motion.div
                    className="card-category"
                    variants={contentVariants}
                >
                    <span>{item.category}</span>
                </motion.div>
                <motion.div className="card-icon" variants={contentVariants} />
                <motion.h5 className="card-title" variants={contentVariants}>
                    <span>{item.title}</span>
                </motion.h5>
                <motion.div
                    className="card-description"
                    variants={contentVariants}
                >
                    <p>{item.description}</p>
                </motion.div>
                <motion.div variants={contentVariants}>
                    <Link
                        href="/src/public"
                        aria-label={`More information about ${item.title}`}
                        prefetch
                    >
                        <span className="card-link">More information</span>
                    </Link>
                </motion.div>
                <motion.div
                    className="card-pattern"
                    variants={patternVariants}
                    animate={isActive ? "visible" : "hidden"}
                    transition={{
                        delay: 0.3,
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                />
            </div>
        </motion.div>
    );
};

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
