import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

import { PortfolioFilterProps } from "@/types";
import { StandardAnimations, Duration, Delay, Stagger } from "@/config/animation.config";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ categories, activeCategory, onCategoryChange }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const hoverVariants = StandardAnimations.buttonHover(prefersReducedMotion);
    const itemVariants = StandardAnimations.fadeInUp(prefersReducedMotion, 12);
    const containerVariants = StandardAnimations.staggerChildren(prefersReducedMotion, Stagger.NORMAL, Delay.SHORT);

    const buttonVariants = { ...itemVariants, ...hoverVariants } as const;

    return (
        <motion.div
            className={"work-filter-container"}
            initial={"hidden"}
            animate={"visible"}
            variants={containerVariants}
            transition={{ duration: Duration.SLOW }}
            role={"group"}
            aria-label={"Portfolio category filters"}
        >
            { categories.map((category, index) => (
                <motion.button
                    key={index}
                    onClick={() => onCategoryChange(category)}
                    className={clsx(
                        "work-filter-button",
                        category === activeCategory && "work-filter-button-active"
                    )}
                    aria-pressed={category === activeCategory}
                    aria-label={`Filter projects by ${category}`}
                    variants={buttonVariants}
                    whileHover={"hover"}
                    whileTap={"tap"}
                    transition={{ duration: Duration.NORMAL, delay: Delay.MEDIUM + index * Stagger.NORMAL }}
                >
                    <span>{ category }</span>
                </motion.button>
            )) }
        </motion.div>
    );
};

export default PortfolioFilter;
