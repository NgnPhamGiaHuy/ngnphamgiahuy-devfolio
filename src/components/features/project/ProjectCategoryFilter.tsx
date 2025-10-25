// ============================================================
// Component: ProjectCategoryFilter
// Purpose: Category filter buttons for project filtering
// ============================================================

"use client";

import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

import type { ProjectCategoryFilterProps } from "@/types";

import { COMMON_ANIMATIONS, Duration, Delay, Stagger } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * ProjectCategoryFilter component renders category filter buttons.
 * Features smooth animations, active state management, and accessibility support.
 *
 * @param props - Component props
 * @param props.categories - Array of category names
 * @param props.activeCategory - Currently active category
 * @param props.onCategoryChange - Callback function for category changes
 * @returns Category filter component
 */
const ProjectCategoryFilter: React.FC<ProjectCategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    ...props
}) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    const hoverVariants = COMMON_ANIMATIONS.buttonHover;
    const itemVariants = COMMON_ANIMATIONS.fadeInUp15;
    const containerVariants = COMMON_ANIMATIONS.staggerNormal;

    const buttonVariants = { ...itemVariants, ...hoverVariants } as const;

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.div
            className="project-category-filter-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ duration: Duration.SLOW }}
            role="group"
            aria-label="Category filters"
            data-testid="category-filter-container"
            {...props}
        >
            {categories.map((category, index) => (
                <motion.button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={clsx(
                        "project-category-filter-button",
                        category === activeCategory &&
                            "text-primary before:scale-x-100"
                    )}
                    aria-pressed={category === activeCategory}
                    aria-label={`Filter projects by ${category}`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    transition={{
                        duration: Duration.NORMAL,
                        delay: Delay.MEDIUM + index * Stagger.NORMAL,
                    }}
                    data-testid={`category-button-${category.toLowerCase()}`}
                >
                    <span>{category}</span>
                </motion.button>
            ))}
        </motion.div>
    );
};

ProjectCategoryFilter.displayName = "ProjectCategoryFilter";

export default ProjectCategoryFilter;
