// ============================================================
// Utility: Export Functions
// Purpose: Export-related utility functions for data processing and UI
// ============================================================

// ============================================================
// Constants
// ============================================================

/** Progress thresholds for status messages */
const PROGRESS_THRESHOLDS = {
    PREPARING: 30,
    PROCESSING: 70,
    FINALIZING: 100,
} as const;

/** Progress status messages */
const PROGRESS_MESSAGES = {
    PREPARING: "Preparing export...",
    PROCESSING: "Processing data...",
    FINALIZING: "Finalizing export...",
    COMPLETE: "Export complete!",
    DEFAULT: "Exporting your data...",
} as const;

/** Button variant classes */
const BUTTON_CLASSES = {
    primary: "primary-button",
    secondary: "secondary-button",
} as const;

/** File download configuration */
const DOWNLOAD_CONFIG = {
    JSON_TYPE: "application/json",
    INDENTATION: 2,
} as const;

// ============================================================
// Types
// ============================================================

/** Button variant options */
export type ButtonVariant = keyof typeof BUTTON_CLASSES;

// ============================================================
// Utility Functions
// ============================================================

/**
 * Generates progress status message based on export progress percentage.
 * Provides user-friendly feedback during export operations.
 *
 * @param progress - Progress percentage (0-100)
 * @returns Status message string
 *
 * @example
 * ```typescript
 * getProgressStatusMessage(25) // "Preparing export..."
 * getProgressStatusMessage(50) // "Processing data..."
 * getProgressStatusMessage(85) // "Finalizing export..."
 * getProgressStatusMessage(100) // "Export complete!"
 * ```
 */
export const getProgressStatusMessage = (progress: number): string => {
    // Validate progress range
    if (progress < 0 || progress > 100) {
        console.warn(
            `Invalid progress value: ${progress}. Expected range: 0-100`
        );
        return PROGRESS_MESSAGES.DEFAULT;
    }

    // Determine status based on progress thresholds
    if (progress < PROGRESS_THRESHOLDS.PREPARING) {
        return PROGRESS_MESSAGES.PREPARING;
    }

    if (
        progress >= PROGRESS_THRESHOLDS.PREPARING &&
        progress < PROGRESS_THRESHOLDS.PROCESSING
    ) {
        return PROGRESS_MESSAGES.PROCESSING;
    }

    if (
        progress >= PROGRESS_THRESHOLDS.PROCESSING &&
        progress < PROGRESS_THRESHOLDS.FINALIZING
    ) {
        return PROGRESS_MESSAGES.FINALIZING;
    }

    if (progress >= PROGRESS_THRESHOLDS.FINALIZING) {
        return PROGRESS_MESSAGES.COMPLETE;
    }

    return PROGRESS_MESSAGES.DEFAULT;
};

/**
 * Capitalizes the first letter of a string.
 * Handles edge cases like empty strings and single characters.
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 *
 * @example
 * ```typescript
 * capitalizeFirstLetter("hello") // "Hello"
 * capitalizeFirstLetter("") // ""
 * capitalizeFirstLetter("a") // "A"
 * ```
 */
export const capitalizeFirstLetter = (str: string): string => {
    // Handle empty string
    if (!str) {
        return str;
    }

    // Handle single character
    if (str.length === 1) {
        return str.toUpperCase();
    }

    // Capitalize first letter and keep rest unchanged
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Gets CSS class for button variant.
 * Provides consistent button styling across the application.
 *
 * @param variant - Button variant type
 * @returns CSS class string
 *
 * @example
 * ```typescript
 * getButtonClass("primary") // "primary-button"
 * getButtonClass("secondary") // "secondary-button"
 * ```
 */
export const getButtonClass = (variant: ButtonVariant): string => {
    return BUTTON_CLASSES[variant];
};

/**
 * Downloads data as a JSON file.
 * Handles browser compatibility and error cases gracefully.
 *
 * @param data - Data to download
 * @param filename - Name of the file to download
 * @returns Promise that resolves when download is complete
 *
 * @example
 * ```typescript
 * const data = { name: "John", age: 30 };
 * await downloadJSON(data, "user-data.json");
 * ```
 */
export const downloadJSON = async (
    data: any,
    filename: string
): Promise<void> => {
    try {
        // Validate inputs
        if (!filename) {
            throw new Error("Filename is required");
        }

        // Ensure filename has .json extension
        const jsonFilename = filename.endsWith(".json")
            ? filename
            : `${filename}.json`;

        // Convert data to JSON string
        const jsonString = JSON.stringify(
            data,
            null,
            DOWNLOAD_CONFIG.INDENTATION
        );

        // Create blob and download URL
        const blob = new Blob([jsonString], {
            type: DOWNLOAD_CONFIG.JSON_TYPE,
        });
        const url = URL.createObjectURL(blob);

        // Create temporary download link
        const link = document.createElement("a");
        link.href = url;
        link.download = jsonFilename;
        link.style.display = "none";

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading JSON file:", error);
        throw new Error(
            `Failed to download file: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
};
