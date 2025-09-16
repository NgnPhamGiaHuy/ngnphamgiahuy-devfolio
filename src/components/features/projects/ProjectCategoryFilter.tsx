"use client";

import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

import type { ProjectCategoryFilterProps } from "@/types";

import { usePrefersReducedMotion } from "@/hooks";
import { StandardAnimations, Duration, Delay, Stagger } from "@/config";

const ProjectCategoryFilter: React.FC<ProjectCategoryFilterProps> = ({ categories, activeCategory, onCategoryChange }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const hoverVariants = StandardAnimations.buttonHover(prefersReducedMotion);
    const itemVariants = StandardAnimations.fadeInUp(prefersReducedMotion, 12);
    const containerVariants = StandardAnimations.staggerChildren(prefersReducedMotion, Stagger.NORMAL, Delay.SHORT);

    const buttonVariants = { ...itemVariants, ...hoverVariants } as const;

    return (
        <motion.div
            className={"category-filter-container"}
            initial={"hidden"}
            animate={"visible"}
            variants={containerVariants}
            transition={{ duration: Duration.SLOW }}
            role={"group"}
            aria-label={"Category filters"}
        >
            {categories.map((category, index) => (
                <motion.button
                    key={index}
                    onClick={() => onCategoryChange(category)}
                    className={clsx(
                        "category-filter-button",
                        category === activeCategory && "category-filter-button-active"
                    )}
                    aria-pressed={category === activeCategory}
                    aria-label={`Filter projects by ${category}`}
                    variants={buttonVariants}
                    whileHover={"hover"}
                    whileTap={"tap"}
                    transition={{ duration: Duration.NORMAL, delay: Delay.MEDIUM + index * Stagger.NORMAL }}
                >
                    <span>{category}</span>
                </motion.button>
            ))}
        </motion.div>
    );
};

export default ProjectCategoryFilter;
