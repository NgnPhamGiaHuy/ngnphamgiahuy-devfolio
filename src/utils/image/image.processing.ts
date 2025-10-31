// ============================================================
// Utility: Image Processing
// Purpose: Image URL resolution and processing utilities for Sanity CMS
// ============================================================

import { urlFor } from "@/lib";
import { ImageConfig, SanityImage } from "@/types";

// ============================================================
// Constants
// ============================================================

/** Default image configuration */
const DEFAULT_CONFIG: Pick<Required<ImageConfig>, "fallbackAlt"> = {
    fallbackAlt: "Image",
} as const;

/** Image URL patterns */
const URL_PATTERNS = {
    HTTP: "http",
    HTTPS: "https",
    ABSOLUTE_PATH: "/",
} as const;

/** Error messages */
const ERROR_MESSAGES = {
    INVALID_IMAGE: "Invalid image provided",
    PROCESSING_FAILED: "Failed to process image",
} as const;

// ============================================================
// Types
// ============================================================

/** Processed image result */
interface ProcessedImage {
    /** Resolved image URL */
    url: string;
    /** Image alt text */
    alt: string;
}

/** Image processing options */
interface ImageProcessingOptions {
    /** Custom fallback alt text */
    fallbackAlt?: string;
    /** Whether to validate image URL */
    validateUrl?: boolean;
}

// ============================================================
// Utility Functions
// ============================================================

export const resolveImageUrl = (
    image: SanityImage | string | undefined,
    configOrBaseUrl?: ImageConfig | string
): string => {
    try {
        const isConfigObject =
            configOrBaseUrl && typeof configOrBaseUrl === "object";
        const config = isConfigObject
            ? (configOrBaseUrl as ImageConfig)
            : undefined;
        const baseUrl = !isConfigObject
            ? (configOrBaseUrl as string)
            : undefined;

        const { fallbackImage } = { ...DEFAULT_CONFIG, ...config };

        if (!image) {
            return fallbackImage || "";
        }

        if (typeof image === "string") {
            return handleStringImage(image, baseUrl, fallbackImage);
        }

        return handleSanityImage(image as SanityImage, config, fallbackImage);
    } catch (error) {
        console.error(ERROR_MESSAGES.PROCESSING_FAILED, error);
        return "";
    }
};

const handleStringImage = (
    imageUrl: string,
    baseUrl?: string,
    fallbackImage?: string
): string => {
    if (baseUrl) {
        if (
            imageUrl.startsWith(URL_PATTERNS.HTTP) ||
            imageUrl.startsWith(URL_PATTERNS.HTTPS)
        ) {
            return imageUrl;
        }

        if (imageUrl.startsWith(URL_PATTERNS.ABSOLUTE_PATH)) {
            return `${baseUrl}${imageUrl}`;
        }

        return fallbackImage || "";
    }

    return imageUrl;
};

const handleSanityImage = (
    image: SanityImage,
    config?: ImageConfig,
    fallbackImage?: string
): string => {
    try {
        if (config?.width && config?.height) {
            return urlFor(image)
                .width(config.width)
                .height(config.height)
                .url();
        }

        return urlFor(image).url();
    } catch (error) {
        console.error("Sanity image processing failed:", error);
        return fallbackImage || "";
    }
};

export const getImageAlt = (
    image: SanityImage | string | undefined,
    fallbackText: string = DEFAULT_CONFIG.fallbackAlt
): string => {
    if (!image) {
        return fallbackText;
    }

    if (typeof image === "string") {
        return fallbackText;
    }

    return (image as SanityImage)?.alt || fallbackText;
};

export const processImage = (
    image: SanityImage | string | undefined,
    config: ImageConfig,
    options: ImageProcessingOptions = {}
): ProcessedImage => {
    const { fallbackAlt, validateUrl = false } = options;

    const url = resolveImageUrl(image, config);
    const alt = getImageAlt(image, fallbackAlt || config.fallbackAlt);

    if (validateUrl && !url) {
        console.warn(ERROR_MESSAGES.INVALID_IMAGE, { image, config });
    }

    return { url, alt };
};

export const processPortfolioImage = (
    image: SanityImage | string | undefined,
    projectName: string,
    config: ImageConfig
): ProcessedImage => {
    const fallbackAlt = `${projectName} project`;
    return processImage(image, config, { fallbackAlt });
};

export const validateImageUrl = async (url: string): Promise<boolean> => {
    if (!url) return false;

    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    } catch {
        return false;
    }
};
