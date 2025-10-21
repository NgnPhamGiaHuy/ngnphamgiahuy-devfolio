"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import type { ExportPanelProps } from "@/types";

import { COMMON_ANIMATIONS } from "@/config";
import { capitalizeFirstLetter } from "@/utils";
import { useExport, useExportHandler } from "@/hooks";
import CustomCheckbox from "./CustomCheckbox";

const ExportPanel: React.FC<ExportPanelProps> = ({ className = "" }) => {
    const { isExporting, error, exportData, availableContentTypes } =
        useExport();
    const { handleExport } = useExportHandler();

    const [selectedTypes, setSelectedTypes] = useState<string[]>(["all"]);
    const [includeAssets, setIncludeAssets] = useState(true);
    const [includeMetadata, setIncludeMetadata] = useState(true);

    const buttonVariants = useMemo(() => COMMON_ANIMATIONS.fadeInUp15, []);

    const buttonHoverVariants = useMemo(
        () => COMMON_ANIMATIONS.buttonHover,
        []
    );

    const panelClassName = useMemo(() => `w-full ${className}`, [className]);

    const contentTypes = useMemo(
        () => ["all", ...availableContentTypes],
        [availableContentTypes]
    );

    const buttonClassName = useMemo(
        () =>
            `primary-button w-full ${isExporting ? "opacity-50 cursor-not-allowed" : ""}`,
        [isExporting]
    );

    const handleTypeToggle = useCallback((type: string) => {
        if (type === "all") {
            setSelectedTypes(["all"]);
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
    }, []);

    const handleAssetsChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setIncludeAssets(e.target.checked);
        },
        []
    );

    const handleMetadataChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setIncludeMetadata(e.target.checked);
        },
        []
    );

    const onExportClick = useCallback(async () => {
        await handleExport({
            exportMethod: async (options) => {
                return exportData(selectedTypes, options);
            },
            options: {
                includeAssets,
                includeMetadata,
            },
        });
    }, [
        handleExport,
        exportData,
        selectedTypes,
        includeAssets,
        includeMetadata,
    ]);

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
                Export Data
            </>
        );
    }, [isExporting]);

    return (
        <div className={panelClassName}>
            <div className="mb-[15px]">
                <div className="caption-text mb-[12px]">Content Types</div>
                <div className="grid grid-cols-2 gap-[10px]">
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

            <div className="space-y-[8px] mb-[15px]">
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
                >
                    <span className="flex items-center justify-center">
                        {buttonContent}
                    </span>
                </motion.button>
            </div>

            {error && (
                <div
                    className="mt-[15px] p-[15px] bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-[8px] text-red-700 dark:text-red-300 text-[13px]"
                    role="alert"
                    aria-live="assertive"
                >
                    {error}
                </div>
            )}
        </div>
    );
};

ExportPanel.displayName = "ExportPanel";

export default ExportPanel;
