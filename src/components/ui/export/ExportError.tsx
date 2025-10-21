"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { ExportErrorProps } from "@/types";

import { COMMON_ANIMATIONS } from "@/config";

const ExportError: React.FC<ExportErrorProps> = ({ error, className = "" }) => {
    const errorClassName = useMemo(
        () =>
            `absolute top-full left-0 mt-2 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm whitespace-nowrap z-10 shadow-lg ${className}`,
        [className]
    );

    const errorVariants = useMemo(() => COMMON_ANIMATIONS.fadeInUp15, []);

    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    className={errorClassName}
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

ExportError.displayName = "ExportError";

export default ExportError;
