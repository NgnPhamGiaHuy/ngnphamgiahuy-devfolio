// ============================================================
// Component: ExportButton
// Purpose: Export button with loading states and error handling
// ============================================================

"use client";

import { motion } from "framer-motion";
import React from "react";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import { getButtonClass } from "@/utils";
import { COMMON_ANIMATIONS } from "@/config";
import ExportError from "./ExportError";
import useExport from "./hooks/useExport";
import useExportHandler from "./hooks/useExportHandler";

// ============================================================
// Constants
// ============================================================

/** Default button text */
const DEFAULT_BUTTON_TEXT = "Export Data";

/** Default export options */
const DEFAULT_EXPORT_OPTIONS = {
    includeAssets: true,
    includeMetadata: true,
} as const;

// ============================================================
// Types
// ============================================================

/** Button variant options */
type ButtonVariant = "primary" | "secondary";

/** Props interface for ExportButton component */
interface ExportButtonProps {
    /** Additional CSS classes */
    className?: string;
    /** Button variant style */
    variant?: ButtonVariant;
    /** Button text content */
    children?: React.ReactNode;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportButton component provides an export button with loading states.
 * Features animated loading indicators, error handling, and accessibility support.
 *
 * @param props - Component props
 * @returns JSX element representing the export button
 *
 * @example
 * ```tsx
 * <ExportButton
 *   variant="primary"
 *   className="w-full"
 * >
 *   Export Portfolio Data
 * </ExportButton>
 * ```
 */
const ExportButton: React.FC<ExportButtonProps> = ({
    className,
    variant = "primary",
    children = DEFAULT_BUTTON_TEXT,
}) => {
    // ============================================================
    // Hooks
    // ============================================================

    const { isExporting, error, exportAll } = useExport();
    const { handleExport } = useExportHandler();

    // ============================================================
    // Animation Configuration
    // ============================================================

    const buttonVariants = COMMON_ANIMATIONS.fadeInUp15;
    const buttonHoverVariants = COMMON_ANIMATIONS.buttonHover;

    // ============================================================
    // Event Handlers
    // ============================================================

    /**
     * Handles export button click.
     * Triggers the export process with default options.
     */
    const onExportClick = async () => {
        await handleExport({
            exportMethod: exportAll,
            options: DEFAULT_EXPORT_OPTIONS,
        });
    };

    // ============================================================
    // Computed Values
    // ============================================================

    const buttonClass = getButtonClass(variant);

    // Build button content based on loading state
    const buttonContent = isExporting ? (
        <>
            <ArrowPathIcon className="animate-spin mr-2 h-4 w-4" />
            Exporting...
        </>
    ) : (
        <>
            <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
            {children}
        </>
    );

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className="relative z-2">
            <motion.button
                onClick={onExportClick}
                disabled={isExporting}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                className={`${buttonClass} ${className || ""}`}
                {...buttonHoverVariants}
                aria-busy={isExporting}
                aria-live="polite"
                aria-label={isExporting ? "Exporting data" : "Export data"}
                data-testid="export-button"
            >
                <span className="flex items-center justify-center">
                    {buttonContent}
                </span>
            </motion.button>

            {/* Error display */}
            {error && <ExportError error={error} />}
        </div>
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportButton.displayName = "ExportButton";

export default ExportButton;
