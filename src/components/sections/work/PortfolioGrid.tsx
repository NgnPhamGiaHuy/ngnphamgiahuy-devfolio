import React from "react";
import { motion, AnimatePresence, Target } from "framer-motion";

import { PortfolioGridProps } from "@/types/portfolio.types";
import { StandardAnimations, Duration, Stagger } from "@/config/animation.config";

import PortfolioCard from "@/components/ui/cards/PortfolioCard";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ portfolios }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const itemEnter = StandardAnimations.springUp(prefersReducedMotion, 16);
    const itemScale = StandardAnimations.scaleIn(prefersReducedMotion, 0.95);
    const gridVariants = StandardAnimations.staggerChildren(prefersReducedMotion, Stagger.NORMAL);

    const itemVariants = {
        hidden: { ...(itemEnter.hidden as Target), ...(itemScale.hidden as Target) },
        visible: { ...(itemEnter.visible as Target), ...(itemScale.visible as Target) },
        exit: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, y: prefersReducedMotion ? 0 : -12, transition: { duration: Duration.NORMAL } }
    } as const;

    return (
        <motion.div
            className={"portfolio-grid"}
            layout
            initial={"hidden"}
            animate={"visible"}
            variants={gridVariants}
            transition={{ duration: Duration.SLOW }}
        >
            <AnimatePresence mode={"popLayout"}>
                {portfolios.slice(0, 6).map((portfolio, index) => (
                    <motion.div
                        key={portfolio.name}
                        layout
                        variants={itemVariants}
                        transition={{ duration: Duration.NORMAL, delay: index * Stagger.NORMAL }}
                    >
                        <PortfolioCard portfolio={portfolio} index={index} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default PortfolioGrid;