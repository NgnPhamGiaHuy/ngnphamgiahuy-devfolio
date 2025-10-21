"use client";

import { useCallback } from "react";

import { useExportProgressContext } from "@/components";

interface ExportHandlerOptions {
    includeAssets?: boolean;
    includeMetadata?: boolean;
    customMessage?: string;
}

interface ExportHandlerParams {
    exportMethod: (options: ExportHandlerOptions) => Promise<any>;
    options?: ExportHandlerOptions;
}

export const useExportHandler = () => {
    const { startExport, completeExport } = useExportProgressContext();

    const handleExport = useCallback(
        async ({ exportMethod, options = {} }: ExportHandlerParams) => {
            try {
                const stopProgress = startExport(
                    options.customMessage || "Exporting your data..."
                );

                await exportMethod({
                    includeAssets: options.includeAssets ?? true,
                    includeMetadata: options.includeMetadata ?? true,
                });

                completeExport();
                stopProgress();
            } catch {
                completeExport();
            }
        },
        [startExport, completeExport]
    );

    return { handleExport };
};

export default useExportHandler;
