// ============================================================
// Hook: useExportHandler
// Purpose: Export process orchestration and error handling
// ============================================================

"use client";

import { useCallback } from "react";

import { useExportProgressContext } from "@/components";

// ============================================================
// Constants
// ============================================================

/** Default export message */
const DEFAULT_EXPORT_MESSAGE = "Exporting your data...";

// ============================================================
// Types
// ============================================================

/** Export handler configuration options */
interface ExportHandlerOptions {
    /** Whether to include asset files in export */
    includeAssets?: boolean;
    /** Whether to include metadata in export */
    includeMetadata?: boolean;
    /** Custom progress message */
    customMessage?: string;
}

/** Export handler parameters */
interface ExportHandlerParams {
    /** Export method function */
    exportMethod: (options: ExportHandlerOptions) => Promise<any>;
    /** Export configuration options */
    options?: ExportHandlerOptions;
}

/** Return type for useExportHandler hook */
interface UseExportHandlerReturn {
    /** Function to handle export process */
    handleExport: (params: ExportHandlerParams) => Promise<void>;
}

// ============================================================
// Hook Implementation
// ============================================================

/**
 * Custom hook for orchestrating export processes.
 * Provides error handling, progress management, and process coordination.
 *
 * @returns Object containing export handler function
 *
 * @example
 * ```tsx
 * const { handleExport } = useExportHandler();
 *
 * const onExport = async () => {
 *   await handleExport({
 *     exportMethod: exportData,
 *     options: {
 *       includeAssets: true,
 *       customMessage: "Processing your portfolio..."
 *     }
 *   });
 * };
 * ```
 */
export const useExportHandler = (): UseExportHandlerReturn => {
    // ============================================================
    // Hooks
    // ============================================================

    const { startExport, completeExport } = useExportProgressContext();

    // ============================================================
    // Export Handler
    // ============================================================

    /**
     * Handles the complete export process with progress tracking and error handling.
     * Manages progress overlay, executes export method, and handles completion/errors.
     *
     * @param params - Export parameters including method and options
     * @returns Promise that resolves when export process completes
     */
    const handleExport = useCallback(
        async ({
            exportMethod,
            options = {},
        }: ExportHandlerParams): Promise<void> => {
            try {
                // Start progress tracking
                const stopProgress = startExport(
                    options.customMessage || DEFAULT_EXPORT_MESSAGE
                );

                // Execute export method with options
                await exportMethod({
                    includeAssets: options.includeAssets ?? true,
                    includeMetadata: options.includeMetadata ?? true,
                });

                // Complete export process
                completeExport();
                stopProgress();
            } catch (error) {
                // Handle errors gracefully
                completeExport();

                // Re-throw error for component-level handling
                throw error;
            }
        },
        [startExport, completeExport]
    );

    // ============================================================
    // Return Hook Interface
    // ============================================================

    return { handleExport };
};

export default useExportHandler;
