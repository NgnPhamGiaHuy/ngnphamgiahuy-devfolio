// ============================================================
// Hook: useExport
// Purpose: Custom hook for managing data export functionality
// ============================================================

import { useState, useCallback } from "react";

import { downloadJSON } from "@/utils";
import { getAvailableContentTypes, exportContentType } from "@/lib";

// ============================================================
// Constants
// ============================================================

/** Default export filename for all content */
const DEFAULT_EXPORT_FILENAME = "portfolio-export.json";

/** Default content types when none specified */
const DEFAULT_CONTENT_TYPES = ["all"];

/** API endpoint for export operations */
const EXPORT_API_ENDPOINT = "/api/export";

// ============================================================
// Types
// ============================================================

/** Export state interface */
interface ExportState {
    /** Whether an export operation is currently in progress */
    isExporting: boolean;
    /** Error message if export failed */
    error: string | null;
    /** Timestamp of the last successful export */
    lastExport: string | null;
}

/** Export options configuration */
interface UseExportOptions {
    /** Whether to include asset files in export */
    includeAssets?: boolean;
    /** Whether to include metadata in export */
    includeMetadata?: boolean;
    /** Export format type */
    format?: "json" | "ndjson";
}

/** Return type for useExport hook */
interface UseExportReturn extends ExportState {
    /** Function to export specific content types */
    exportData: (
        contentTypes?: string[],
        options?: UseExportOptions
    ) => Promise<any>;
    /** Function to export all available content */
    exportAll: (options?: UseExportOptions) => Promise<any>;
    /** Function to export a specific content type */
    exportContentType: typeof exportContentType;
    /** List of available content types for export */
    availableContentTypes: string[];
}

// ============================================================
// Hook Implementation
// ============================================================

/**
 * Custom hook for managing data export functionality.
 * Provides state management, error handling, and export operations.
 *
 * @returns Object containing export state and functions
 *
 * @example
 * ```tsx
 * const { isExporting, error, exportAll, exportData } = useExport();
 *
 * const handleExport = async () => {
 *   try {
 *     await exportAll({ includeAssets: true });
 *   } catch (err) {
 *     console.error('Export failed:', err);
 *   }
 * };
 * ```
 */
const useExport = (): UseExportReturn => {
    // ============================================================
    // State Management
    // ============================================================

    const [state, setState] = useState<ExportState>({
        isExporting: false,
        error: null,
        lastExport: null,
    });

    // ============================================================
    // Export Functions
    // ============================================================

    /**
     * Exports data for specified content types.
     * Handles API communication, error management, and file download.
     *
     * @param contentTypes - Array of content types to export
     * @param options - Export configuration options
     * @returns Promise resolving to exported data
     */
    const exportData = useCallback(
        async (
            contentTypes: string[] = DEFAULT_CONTENT_TYPES,
            options: UseExportOptions = {}
        ): Promise<any> => {
            // Set loading state and clear previous errors
            setState((prev) => ({
                ...prev,
                isExporting: true,
                error: null,
            }));

            try {
                // Prepare API request
                const requestBody = {
                    contentTypes,
                    includeAssets: options.includeAssets ?? true,
                    includeMetadata: options.includeMetadata ?? true,
                    format: options.format ?? "json",
                };

                // Make API request
                const response = await fetch(EXPORT_API_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                // Handle API errors
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Export failed");
                }

                // Process successful response
                const result = await response.json();

                // Generate filename based on content types
                const filename = contentTypes.includes("all")
                    ? DEFAULT_EXPORT_FILENAME
                    : `${contentTypes.join("-")}-export.json`;

                // Download the exported data
                downloadJSON(result.data, filename);

                // Update state with success
                setState((prev) => ({
                    ...prev,
                    isExporting: false,
                    lastExport: new Date().toISOString(),
                }));

                return result.data;
            } catch (error) {
                // Handle errors and update state
                const errorMessage =
                    error instanceof Error ? error.message : "Export failed";

                setState((prev) => ({
                    ...prev,
                    isExporting: false,
                    error: errorMessage,
                }));

                throw error;
            }
        },
        []
    );

    /**
     * Exports all available content types.
     * Convenience method that calls exportData with "all" content type.
     *
     * @param options - Export configuration options
     * @returns Promise resolving to exported data
     */
    const exportAll = useCallback(
        async (options: UseExportOptions = {}): Promise<any> => {
            return exportData(DEFAULT_CONTENT_TYPES, options);
        },
        [exportData]
    );

    // ============================================================
    // Return Hook Interface
    // ============================================================

    return {
        ...state,
        exportData,
        exportContentType,
        exportAll,
        availableContentTypes: getAvailableContentTypes(),
    };
};

export default useExport;
