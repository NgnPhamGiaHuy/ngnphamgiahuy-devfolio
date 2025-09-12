"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Project } from "@/types";
import { processPortfolioImage } from "@/utils";

interface PortfolioCardProps {
    index: number;
    portfolio: Project;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio, index }) => {
    const { url: imageUrl, alt: imageAlt } = processPortfolioImage(
        portfolio.image,
        portfolio.name || "Untitled Project",
        { width: 600, height: 400, fallbackImage: "/images/profile2.png" }
    );

    const linkHref = portfolio.link || "#";

    const projectName = portfolio.name || "Untitled Project";
    const projectCategory = portfolio.category || "Uncategorized";
    const projectDescription = portfolio.description || "";

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
            <motion.div
                className={"portfolio-card"}
                whileHover={{ y: -5, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Link href={linkHref}>
                    <div className={"portfolio-card-image-container"}>
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            className={"portfolio-card-image"}
                            width={600}
                            height={400}
                        />
                    </div>
                    <div className={"portfolio-card-content"}>
                        <span className={"portfolio-card-category"}>
                            {projectCategory}
                        </span>
                        <h5 className={"portfolio-card-title"}>{projectName}</h5>
                        <div className={"portfolio-card-description"}>
                            <p className={"portfolio-card-description-text"}>
                                {projectDescription}
                            </p>
                        </div>
                        <span className={"content-card-link"}>
                            See project
                        </span>
                    </div>
                    <motion.div
                        className={"content-card-pattern bottom-[-36px]"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    />
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioCard;
