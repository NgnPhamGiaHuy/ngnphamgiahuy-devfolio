const PROGRESS_THRESHOLDS = {
    PREPARING: 30,
    PROCESSING: 70,
    FINALIZING: 100,
} as const;

const PROGRESS_MESSAGES = {
    PREPARING: "Preparing export...",
    PROCESSING: "Processing data...",
    FINALIZING: "Finalizing export...",
    COMPLETE: "Export complete!",
    DEFAULT: "Exporting your data...",
} as const;

const BUTTON_CLASSES = {
    primary: "primary-button",
    secondary: "secondary-button",
} as const;

const DOWNLOAD_CONFIG = {
    JSON_TYPE: "application/json",
    INDENTATION: 2,
} as const;

export type ButtonVariant = keyof typeof BUTTON_CLASSES;

export const getProgressStatusMessage = (progress: number): string => {
    if (progress < 0 || progress > 100) {
        console.warn(
            `Invalid progress value: ${progress}. Expected range: 0-100`
        );
        return PROGRESS_MESSAGES.DEFAULT;
    }

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

export const capitalizeFirstLetter = (str: string): string => {
    if (!str) {
        return str;
    }

    if (str.length === 1) {
        return str.toUpperCase();
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getButtonClass = (variant: ButtonVariant): string => {
    return BUTTON_CLASSES[variant];
};

export const downloadJSON = async (
    data: any,
    filename: string
): Promise<void> => {
    try {
        if (!filename) {
            throw new Error("Filename is required");
        }

        const jsonFilename = filename.endsWith(".json")
            ? filename
            : `${filename}.json`;

        const jsonString = JSON.stringify(
            data,
            null,
            DOWNLOAD_CONFIG.INDENTATION
        );

        const blob = new Blob([jsonString], {
            type: DOWNLOAD_CONFIG.JSON_TYPE,
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = jsonFilename;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading JSON file:", error);
        throw new Error(
            `Failed to download file: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
};
