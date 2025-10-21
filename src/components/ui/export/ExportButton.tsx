"use client";

import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import type { ExportButtonProps } from "@/types";

import { getButtonClass } from "@/utils";
import { COMMON_ANIMATIONS } from "@/config";
import { useExport, useExportHandler } from "@/hooks";
import ExportError from "./ExportError";

const ExportButton: React.FC<ExportButtonProps> = ({
    className,
    variant = "primary",
    children = "Export Data",
}) => {
    const { isExporting, error, exportAll } = useExport();
    const { handleExport } = useExportHandler();

    const buttonVariants = useMemo(() => COMMON_ANIMATIONS.fadeInUp15, []);

    const buttonHoverVariants = useMemo(
        () => COMMON_ANIMATIONS.buttonHover,
        []
    );

    const onExportClick = useCallback(async () => {
        await handleExport({
            exportMethod: exportAll,
            options: {
                includeAssets: true,
                includeMetadata: true,
            },
        });
    }, [handleExport, exportAll]);

    const buttonClass = useMemo(() => getButtonClass(variant), [variant]);

    const buttonContent = useMemo(() => {
        if (isExporting) {
            return (
                <>
                    <ArrowPathIcon className="animate-spin mr-2 h-4 w-4" />
                    Exporting...
                </>
            );
        }
        return (
            <>
                <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
                {children}
            </>
        );
    }, [isExporting, children]);

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
            >
                <span className="flex items-center justify-center">
                    {buttonContent}
                </span>
            </motion.button>

            {error && <ExportError error={error} />}
        </div>
    );
};

ExportButton.displayName = "ExportButton";

export default ExportButton;
