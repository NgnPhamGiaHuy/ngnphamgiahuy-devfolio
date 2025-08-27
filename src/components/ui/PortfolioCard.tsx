"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { PortfolioCardProps } from "@/types";

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio, index }) => {
    return (
        <motion.div
            className={"portfolio-item"}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { type: "spring", damping: 20, stiffness: 100 }
            }}
        >
            <motion.div className={"portfolio-card"} whileHover={{ y: -5, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href={portfolio.link}>
                    <div className={"portfolio-card-image-container"}>
                        <img src={portfolio.image} alt={portfolio.name} className={"portfolio-card-image"}/>
                    </div>
                    <div className={"portfolio-card-content"}>
                        <span className={"portfolio-card-category"}>
                            { portfolio.category }
                        </span>
                        <h5 className={"portfolio-card-title"}>{portfolio.name}</h5>
                        <div className={"portfolio-card-description"}>
                            <p className={"portfolio-card-description-text"}>
                                { portfolio.description }
                            </p>
                        </div>
                        <span className={"service-link"}>
                            See project
                        </span>
                    </div>
                    <motion.div className={"service-card-pattern bottom-[-36px]"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioCard;
