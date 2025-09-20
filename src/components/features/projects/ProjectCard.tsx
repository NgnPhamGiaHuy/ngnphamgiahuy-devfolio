"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import type { ProjectCardProps } from "@/types";

import { processPortfolioImage } from "@/utils";

const ProjectCard: React.FC<ProjectCardProps> = ({ portfolio, index }) => {
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
            className={"project-card-item"}
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
                className={"project-card"}
                whileHover={{ y: -5, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Link href={linkHref}>
                    <div className={"project-card-image-container"}>
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            className={"project-card-image"}
                            width={600}
                            height={400}
                        />
                    </div>
                    <div className={"pt-[30px] bottom-0 relative"}>
                        <span className={"project-card-category"}>
                            {projectCategory}
                        </span>
                        <h5 className={"project-card-title"}>{projectName}</h5>
                        <div className={"project-card-description"}>
                            <p className={"project-card-description-text"}>
                                {projectDescription}
                            </p>
                        </div>
                        <span className={"card-link"}>
                            See project
                        </span>
                    </div>
                    <motion.div
                        className={"bottom-[-36px] card-pattern"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    />
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;


