import { useState } from "react";

import type { UseExportOptions, ExportState } from "@/types";

import { downloadJSON } from "@/utils";
import { getAvailableContentTypes, exportContentType } from "@/lib";

const useExport = () => {
    const [state, setState] = useState<ExportState>({
        isExporting: false,
        error: null,
        lastExport: null,
    });

    const exportData = async (
        contentTypes: string[] = ["all"],
        options: UseExportOptions = {}
    ) => {
        setState((prev) => ({ ...prev, isExporting: true, error: null }));

        try {
            const response = await fetch("/api/export", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contentTypes,
                    includeAssets: options.includeAssets ?? true,
                    includeMetadata: options.includeMetadata ?? true,
                    format: options.format ?? "json",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Export failed");
            }

            const result = await response.json();

            const filename = contentTypes.includes("all")
                ? "portfolio-export.json"
                : `${contentTypes.join("-")}-export.json`;

            downloadJSON(result.data, filename);

            setState((prev) => ({
                ...prev,
                isExporting: false,
                lastExport: new Date().toISOString(),
            }));

            return result.data;
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isExporting: false,
                error: error instanceof Error ? error.message : "Export failed",
            }));
            throw error;
        }
    };

    const exportAll = async (options: UseExportOptions = {}) => {
        return exportData(["all"], options);
    };

    return {
        ...state,
        exportData,
        exportContentType,
        exportAll,
        availableContentTypes: getAvailableContentTypes(),
    };
};

export default useExport;
