// ============================================================
// Component: ProjectGrid
// Purpose: Responsive grid container for project cards with animations
// ============================================================

"use client";

import React from "react";
import { motion, AnimatePresence, Target } from "framer-motion";

import type { ProjectGridProps } from "@/types";

import { ProjectCard } from "@/components";
import { COMMON_ANIMATIONS, Duration, Stagger } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * ProjectGrid component renders a responsive grid of project cards.
 * Features smooth animations, layout transitions, and proper key management.
 *
 * @param props - Component props
 * @param props.maxItems - Maximum number of items to display
 * @param props.portfolios - Array of portfolio data
 * @returns Project grid component
 */
const ProjectGrid: React.FC<ProjectGridProps> = ({
    maxItems,
    portfolios = [],
    ...props
}) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    const itemEnter = COMMON_ANIMATIONS.springUp16;
    const itemScale = COMMON_ANIMATIONS.scaleIn95;
    const gridVariants = COMMON_ANIMATIONS.staggerNormal;

    const itemVariants = {
        hidden: {
            ...(itemEnter.hidden as Target),
            ...(itemScale.hidden as Target),
        },
        visible: {
            ...(itemEnter.visible as Target),
            ...(itemScale.visible as Target),
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: -12,
            transition: { duration: Duration.NORMAL },
        },
    } as const;

    // ============================================================
    // Data Processing
    // ============================================================

    const displayedPortfolios = maxItems
        ? portfolios.slice(0, maxItems)
        : portfolios;

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.div
            className="project-grid"
            layout
            initial="hidden"
            animate="visible"
            variants={gridVariants}
            transition={{ duration: Duration.SLOW }}
            data-testid="project-grid-container"
            {...props}
        >
            <AnimatePresence mode="popLayout">
                {displayedPortfolios.map((portfolio, index) => (
                    <motion.div
                        key={
                            portfolio._id ||
                            `${portfolio.name || "portfolio"}-${portfolio.link || ""}-${index}`
                        }
                        layout
                        variants={itemVariants}
                        transition={{
                            duration: Duration.NORMAL,
                            delay: index * Stagger.NORMAL,
                        }}
                        data-testid={`project-item-${index}`}
                    >
                        <ProjectCard
                            portfolio={portfolio}
                            index={index}
                            data-testid={`project-card-${index}`}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

ProjectGrid.displayName = "ProjectGrid";

export default ProjectGrid;
