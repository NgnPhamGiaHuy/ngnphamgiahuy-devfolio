"use client";

import React from "react";
import { motion, AnimatePresence, Target } from "framer-motion";

import type { ProjectGridProps } from "@/types";

import { ProjectCard } from "@/components/features/projects";
import { StandardAnimations, Duration, Stagger } from "@/config";

const ProjectGrid: React.FC<ProjectGridProps> = ({
    maxItems,
    portfolios = [],
}) => {
    const itemEnter = StandardAnimations.springUp(16);
    const itemScale = StandardAnimations.scaleIn(0.95);
    const gridVariants = StandardAnimations.staggerChildren(Stagger.NORMAL);

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

    const displayedPortfolios = maxItems
        ? portfolios.slice(0, maxItems)
        : portfolios;

    return (
        <motion.div
            className={"project-grid"}
            layout
            initial={"hidden"}
            animate={"visible"}
            variants={gridVariants}
            transition={{ duration: Duration.SLOW }}
        >
            <AnimatePresence mode={"popLayout"}>
                {displayedPortfolios.map((portfolio, index) => (
                    <motion.div
                        key={portfolio._id || `portfolio-${index}`}
                        layout
                        variants={itemVariants}
                        transition={{
                            duration: Duration.NORMAL,
                            delay: index * Stagger.NORMAL,
                        }}
                    >
                        <ProjectCard portfolio={portfolio} index={index} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProjectGrid;
