import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

import { PortfolioFilterProps } from "@/types";

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <motion.div
            className={"work-filter-container"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            { categories.map((category, index) => (
                <motion.button
                    key={index}
                    onClick={() => onCategoryChange(category)}
                    className={clsx(
                        "work-filter-button",
                        category === activeCategory && "work-filter-button-active"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.3 + index * 0.1,
                        type: "spring",
                        stiffness: 300
                    }}
                >
                    <span>{ category }</span>
                </motion.button>
            )) }
        </motion.div>
    );
};

export default PortfolioFilter;
