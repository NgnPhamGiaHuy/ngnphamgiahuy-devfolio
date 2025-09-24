"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ServiceCardProps } from "@/types";

import { StandardAnimations } from "@/config";

const ServiceCard: React.FC<ServiceCardProps> = ({ item, index }) => {
    const cardVariants = StandardAnimations.scaleIn(0.95);
    const contentVariants = StandardAnimations.fadeInUp(10);

    return (
        <motion.div
            key={index}
            className={"card"}
            variants={cardVariants}
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className={"card-inner"}>
                <motion.div className={"card-category"} variants={contentVariants}>
                    <span>
                        {item.category}
                    </span>
                </motion.div>
                <motion.div className={"card-icon"} variants={contentVariants}></motion.div>
                <motion.h5 className={"card-title"} variants={contentVariants}>
                    <span>
                        {item.title}
                    </span>
                </motion.h5>
                <motion.div className={"card-description"} variants={contentVariants}>
                    <p>
                        {item.description}
                    </p>
                </motion.div>
                <motion.div variants={contentVariants}>
                    <Link href={"/src/public"}>
                        <span className={"card-link"}>
                            More information
                        </span>
                    </Link>
                </motion.div>
                <motion.div
                    className={"card-pattern"}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                ></motion.div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
