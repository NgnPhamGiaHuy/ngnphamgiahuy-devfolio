// ============================================================
// Component: ExportError
// Purpose: Error display component with animations and accessibility
// ============================================================

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { COMMON_ANIMATIONS } from "@/config";

// ============================================================
// Constants
// ============================================================

/** Default animation duration */
const ANIMATION_DURATION = 0.2;

/** Default error styling classes */
const ERROR_BASE_CLASSES = `
    absolute top-full left-0 mt-2 p-3 
    bg-red-100 dark:bg-red-900/20 
    border border-red-300 dark:border-red-700 
    rounded-lg 
    text-red-700 dark:text-red-300 
    text-sm whitespace-nowrap 
    z-10 shadow-lg
`;

// ============================================================
// Types
// ============================================================

/** Props interface for ExportError component */
interface ExportErrorProps {
    /** Error message to display */
    error: string;
    /** Additional CSS classes */
    className?: string;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportError component displays error messages with smooth animations.
 * Features accessibility support, dark mode compatibility, and animated transitions.
 *
 * @param props - Component props
 * @returns JSX element representing the error display
 *
 * @example
 * ```tsx
 * <ExportError
 *   error="Failed to export data"
 *   className="custom-error-styles"
 * />
 * ```
 */
const ExportError: React.FC<ExportErrorProps> = ({ error, className = "" }) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    const errorVariants = COMMON_ANIMATIONS.fadeInUp15;

    // ============================================================
    // Computed Values
    // ============================================================

    const errorClassName = `${ERROR_BASE_CLASSES} ${className}`;

    // ============================================================
    // Render
    // ============================================================

    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    className={errorClassName}
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: ANIMATION_DURATION }}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    data-testid="export-error"
                >
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportError.displayName = "ExportError";

export default ExportError;
