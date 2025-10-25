// ============================================================
// Component: ProjectCard
// Purpose: Individual project card with image, metadata, and call-to-action
// ============================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import type { ProjectCardProps } from "@/types";

import { processPortfolioImage } from "@/utils";
import { PROJECT_CARD_VARIANTS } from "@/config";

// ============================================================
// Constants
// ============================================================

const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 400;
const FALLBACK_IMAGE = "/images/profile2.png";

// ============================================================
// Component Definition
// ============================================================

/**
 * ProjectCard component renders an individual project in a card format.
 * Features hover animations, responsive design, and proper accessibility.
 *
 * @param props - Component props
 * @param props.portfolio - Project data object
 * @param props.index - Index position for staggered animation timing
 * @returns Project card component
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
    portfolio,
    index,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Process image data - lightweight operation that doesn't need memoization
    const { url: imageUrl, alt: imageAlt } = processPortfolioImage(
        portfolio.image,
        portfolio.name || "Untitled Project",
        { fallbackImage: FALLBACK_IMAGE }
    );

    // Project metadata with fallback values
    const linkHref = portfolio.link || "#";
    const projectName = portfolio.name || "Untitled Project";
    const projectCategory = portfolio.category || "Uncategorized";
    const projectDescription = portfolio.description || "";

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.article
            className="project-card-item"
            layout
            variants={PROJECT_CARD_VARIANTS.cardItem(index)}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-testid="project-card"
            {...props}
        >
            <motion.div
                className="project-card"
                variants={PROJECT_CARD_VARIANTS.cardHover()}
                initial="initial"
                whileHover="hover"
            >
                <Link
                    href={linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex flex-col"
                    aria-label={`Open project: ${projectName}`}
                    prefetch={false}
                >
                    {/* Project Image */}
                    <div className="project-card-image-container">
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            className="project-card-image"
                            width={IMAGE_WIDTH}
                            height={IMAGE_HEIGHT}
                            sizes="(max-width: 1024px) 100vw, 600px"
                            loading="lazy"
                            decoding="async"
                            fetchPriority="auto"
                        />
                    </div>

                    {/* Card Content */}
                    <div className="project-card-content">
                        {/* Header Section */}
                        <header className="project-card-header">
                            <span className="project-card-category">
                                {projectCategory}
                            </span>
                            <h3 className="project-card-title">
                                {projectName}
                            </h3>
                        </header>

                        {/* Footer Section */}
                        <div className="project-card-footer">
                            <div className="project-card-description">
                                <p className="project-card-description-text">
                                    {projectDescription}
                                </p>
                            </div>
                            <span className="card-link">See project</span>
                        </div>
                    </div>

                    {/* Decorative Pattern */}
                    <motion.div
                        className="bottom-[-72px] card-pattern"
                        variants={PROJECT_CARD_VARIANTS.cardPattern()}
                        initial="hidden"
                        animate="visible"
                        aria-hidden="true"
                    />
                </Link>
            </motion.div>
        </motion.article>
    );
};

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
