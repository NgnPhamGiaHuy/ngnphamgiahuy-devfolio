// ============================================================
// Component: ExportPanel
// Purpose: Export control panel with options and state management
// ============================================================

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import { COMMON_ANIMATIONS } from "@/config";
import { capitalizeFirstLetter } from "@/utils";
import CustomCheckbox from "./CustomCheckbox";
import useExport from "./hooks/useExport";
import useExportHandler from "./hooks/useExportHandler";

// ============================================================
// Constants
// ============================================================

/** Default content types */
const DEFAULT_CONTENT_TYPES = ["all"];

/** Default spacing values */
const SPACING = {
    SECTION: "mb-[15px]",
    SMALL: "mb-[12px]",
    CHECKBOX: "space-y-[8px]",
    GRID: "gap-[10px]",
} as const;

/** Default button classes */
const BUTTON_BASE_CLASSES = "primary-button w-full";

/** Default grid layout */
const CHECKBOX_GRID_CLASSES = "grid grid-cols-2 gap-[10px]";

// ============================================================
// Types
// ============================================================

/** Props interface for ExportPanel component */
interface ExportPanelProps {
    /** Additional CSS classes */
    className?: string;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportPanel component provides a comprehensive export control interface.
 * Features content type selection, export options, and state management.
 *
 * @param props - Component props
 * @returns JSX element representing the export panel
 *
 * @example
 * ```tsx
 * <ExportPanel className="custom-panel-styles" />
 * ```
 */
const ExportPanel: React.FC<ExportPanelProps> = ({ className = "" }) => {
    // ============================================================
    // Hooks
    // ============================================================

    const { isExporting, error, exportData, availableContentTypes } =
        useExport();
    const { handleExport } = useExportHandler();

    // ============================================================
    // State Management
    // ============================================================

    const [selectedTypes, setSelectedTypes] = useState<string[]>(
        DEFAULT_CONTENT_TYPES
    );
    const [includeAssets, setIncludeAssets] = useState(true);
    const [includeMetadata, setIncludeMetadata] = useState(true);

    // ============================================================
    // Animation Configuration
    // ============================================================

    const buttonVariants = COMMON_ANIMATIONS.fadeInUp15;
    const buttonHoverVariants = COMMON_ANIMATIONS.buttonHover;

    // ============================================================
    // Computed Values
    // ============================================================

    const panelClassName = `w-full ${className}`;
    const contentTypes = ["all", ...availableContentTypes];
    const buttonClassName = `${BUTTON_BASE_CLASSES} ${isExporting ? "opacity-50 cursor-not-allowed" : ""}`;

    // ============================================================
    // Event Handlers
    // ============================================================

    /**
     * Handles content type toggle selection.
     * Manages "all" vs individual type selection logic.
     *
     * @param type - Content type to toggle
     */
    const handleTypeToggle = (type: string) => {
        if (type === "all") {
            setSelectedTypes(DEFAULT_CONTENT_TYPES);
        } else {
            setSelectedTypes((prev) => {
                const filtered = prev.filter((t) => t !== "all");
                if (filtered.includes(type)) {
                    return filtered.filter((t) => t !== type);
                } else {
                    return [...filtered, type];
                }
            });
        }
    };

    /**
     * Handles assets inclusion toggle.
     *
     * @param e - Change event from checkbox
     */
    const handleAssetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeAssets(e.target.checked);
    };

    /**
     * Handles metadata inclusion toggle.
     *
     * @param e - Change event from checkbox
     */
    const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeMetadata(e.target.checked);
    };

    /**
     * Handles export button click.
     * Triggers export with current selections and options.
     */
    const onExportClick = async () => {
        await handleExport({
            exportMethod: async (options) => {
                return exportData(selectedTypes, options);
            },
            options: {
                includeAssets,
                includeMetadata,
            },
        });
    };

    // ============================================================
    // Computed Content
    // ============================================================

    const buttonContent = isExporting ? (
        <>
            <ArrowPathIcon className="animate-spin mr-2 h-4 w-4" />
            Exporting...
        </>
    ) : (
        <>
            <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
            Export Data
        </>
    );

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className={panelClassName} data-testid="export-panel">
            {/* Content Types Selection */}
            <div className={SPACING.SECTION}>
                <div className={`caption-text ${SPACING.SMALL}`}>
                    Content Types
                </div>
                <div className={CHECKBOX_GRID_CLASSES}>
                    {contentTypes.map((type) => (
                        <CustomCheckbox
                            key={type}
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeToggle(type)}
                            label={capitalizeFirstLetter(type)}
                            id={type}
                        />
                    ))}
                </div>
            </div>

            {/* Export Options */}
            <div className={`${SPACING.CHECKBOX} ${SPACING.SECTION}`}>
                <CustomCheckbox
                    checked={includeAssets}
                    onChange={handleAssetsChange}
                    label="Include image URLs"
                    id="assets"
                />
                <CustomCheckbox
                    checked={includeMetadata}
                    onChange={handleMetadataChange}
                    label="Include export metadata"
                    id="metadata"
                />
            </div>

            {/* Export Button */}
            <div className="relative z-2">
                <motion.button
                    onClick={onExportClick}
                    disabled={isExporting}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className={buttonClassName}
                    {...buttonHoverVariants}
                    aria-busy={isExporting}
                    aria-live="polite"
                    aria-label={isExporting ? "Exporting data" : "Export data"}
                    data-testid="export-panel-button"
                >
                    <span className="flex items-center justify-center">
                        {buttonContent}
                    </span>
                </motion.button>
            </div>

            {/* Error Display */}
            {error && (
                <div
                    className={`${SPACING.SECTION} p-[15px] bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-[8px] text-red-700 dark:text-red-300 text-[13px]`}
                    role="alert"
                    aria-live="assertive"
                    data-testid="export-panel-error"
                >
                    {error}
                </div>
            )}
        </div>
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportPanel.displayName = "ExportPanel";

export default ExportPanel;
