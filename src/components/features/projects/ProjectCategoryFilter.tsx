"use client";

import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

import type { ProjectCategoryFilterProps } from "@/types";

import { COMMON_ANIMATIONS, Duration, Delay, Stagger } from "@/config";

const ProjectCategoryFilter: React.FC<ProjectCategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
}) => {
    const hoverVariants = COMMON_ANIMATIONS.buttonHover;
    const itemVariants = COMMON_ANIMATIONS.fadeInUp15;
    const containerVariants = COMMON_ANIMATIONS.staggerNormal;

    const buttonVariants = { ...itemVariants, ...hoverVariants } as const;

    return (
        <motion.div
            className={"project-category-filter-container"}
            initial={"hidden"}
            animate={"visible"}
            variants={containerVariants}
            transition={{ duration: Duration.SLOW }}
            role={"group"}
            aria-label={"Category filters"}
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
                    whileHover={"hover"}
                    whileTap={"tap"}
                    transition={{
                        duration: Duration.NORMAL,
                        delay: Delay.MEDIUM + index * Stagger.NORMAL,
                    }}
                >
                    <span>{category}</span>
                </motion.button>
            ))}
        </motion.div>
    );
};

ProjectCategoryFilter.displayName = "ProjectCategoryFilter";

export default ProjectCategoryFilter;
