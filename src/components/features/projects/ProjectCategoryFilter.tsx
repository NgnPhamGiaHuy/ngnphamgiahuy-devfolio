"use client";

import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

import type { ProjectCategoryFilterProps } from "@/types";

import { StandardAnimations, Duration, Delay, Stagger } from "@/config";

const ProjectCategoryFilter: React.FC<ProjectCategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
}) => {
    const hoverVariants = StandardAnimations.buttonHover();
    const itemVariants = StandardAnimations.fadeInUp(12);
    const containerVariants = StandardAnimations.staggerChildren(
        Stagger.NORMAL,
        Delay.SHORT
    );

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
                    key={index}
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

export default ProjectCategoryFilter;
