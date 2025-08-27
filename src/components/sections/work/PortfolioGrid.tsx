import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import PortfolioCard from "@/components/ui/PortfolioCard";

import { PortfolioGridProps } from "@/types";

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ portfolios }) => {
    return (
        <motion.div
            className={"portfolio-grid"}
            layout
            transition={{
                duration: 0.6,
                type: "spring",
                damping: 25,
                stiffness: 100,
                layout: {
                    duration: 0.6,
                    type: "spring",
                    damping: 30,
                    stiffness: 80
                }
            }}
        >
            <AnimatePresence mode="popLayout">
                { portfolios.slice(0, 6).map((portfolio, index) => (
                    <motion.div
                        key={portfolio.name}
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
                        <PortfolioCard portfolio={portfolio} index={index} />
                    </motion.div>
                )) }
            </AnimatePresence>
        </motion.div>
    );
};

export default PortfolioGrid;
