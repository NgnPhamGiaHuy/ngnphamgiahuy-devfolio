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

/**
 * Resolves image URL from various sources (Sanity, string, undefined).
 * Handles both ImageConfig objects and baseUrl strings for backward compatibility.
 *
 * @param image - Image source (Sanity image, string URL, or undefined)
 * @param configOrBaseUrl - Image configuration or base URL string
 * @returns Resolved image URL
 *
 * @example
 * ```typescript
 * // With Sanity image
 * const url = resolveImageUrl(sanityImage, { width: 300, height: 200 });
 *
 * // With string URL
 * const url = resolveImageUrl("https://example.com/image.jpg");
 *
 * // With base URL
 * const url = resolveImageUrl("/images/logo.png", "https://mysite.com");
 * ```
 */
export const resolveImageUrl = (
    image: SanityImage | string | undefined,
    configOrBaseUrl?: ImageConfig | string
): string => {
    try {
        // Determine if configOrBaseUrl is an object or string
        const isConfigObject =
            configOrBaseUrl && typeof configOrBaseUrl === "object";
        const config = isConfigObject
            ? (configOrBaseUrl as ImageConfig)
            : undefined;
        const baseUrl = !isConfigObject
            ? (configOrBaseUrl as string)
            : undefined;

        // Get fallback image from config
        const { fallbackImage } = { ...DEFAULT_CONFIG, ...config };

        // Handle undefined/null image
        if (!image) {
            return fallbackImage || "";
        }

        // Handle string URLs
        if (typeof image === "string") {
            return handleStringImage(image, baseUrl, fallbackImage);
        }

        // Handle Sanity images
        return handleSanityImage(image as SanityImage, config, fallbackImage);
    } catch (error) {
        console.error(ERROR_MESSAGES.PROCESSING_FAILED, error);
        return "";
    }
};

/**
 * Handles string-based image URLs with base URL support.
 *
 * @param imageUrl - String image URL
 * @param baseUrl - Optional base URL for relative paths
 * @param fallbackImage - Fallback image URL
 * @returns Resolved image URL
 */
const handleStringImage = (
    imageUrl: string,
    baseUrl?: string,
    fallbackImage?: string
): string => {
    // Handle baseUrl case (from metadata.ts)
    if (baseUrl) {
        // Already absolute URL
        if (
            imageUrl.startsWith(URL_PATTERNS.HTTP) ||
            imageUrl.startsWith(URL_PATTERNS.HTTPS)
        ) {
            return imageUrl;
        }

        // Relative path
        if (imageUrl.startsWith(URL_PATTERNS.ABSOLUTE_PATH)) {
            return `${baseUrl}${imageUrl}`;
        }

        // Invalid relative path
        return fallbackImage || "";
    }

    // Return string as-is for config case
    return imageUrl;
};

/**
 * Handles Sanity image processing with size constraints.
 *
 * @param image - Sanity image object
 * @param config - Image configuration
 * @param fallbackImage - Fallback image URL
 * @returns Resolved image URL
 */
const handleSanityImage = (
    image: SanityImage,
    config?: ImageConfig,
    fallbackImage?: string
): string => {
    try {
        // Process with size constraints if provided
        if (config?.width && config?.height) {
            return urlFor(image)
                .width(config.width)
                .height(config.height)
                .url();
        }

        // Process without size constraints
        return urlFor(image).url();
    } catch (error) {
        console.error("Sanity image processing failed:", error);
        return fallbackImage || "";
    }
};

/**
 * Extracts alt text from image with fallback support.
 * Handles various image types and provides meaningful fallback text.
 *
 * @param image - Image source
 * @param fallbackText - Fallback alt text
 * @returns Image alt text
 *
 * @example
 * ```typescript
 * const alt = getImageAlt(sanityImage, "Project screenshot");
 * const alt2 = getImageAlt("https://example.com/image.jpg", "Logo");
 * ```
 */
export const getImageAlt = (
    image: SanityImage | string | undefined,
    fallbackText: string = DEFAULT_CONFIG.fallbackAlt
): string => {
    // Handle undefined/null image
    if (!image) {
        return fallbackText;
    }

    // Handle string URLs (no alt text available)
    if (typeof image === "string") {
        return fallbackText;
    }

    // Handle Sanity images
    return (image as SanityImage)?.alt || fallbackText;
};

/**
 * Processes image and returns both URL and alt text.
 * Combines URL resolution and alt text extraction in one function.
 *
 * @param image - Image source
 * @param config - Image configuration
 * @param options - Processing options
 * @returns Processed image with URL and alt text
 *
 * @example
 * ```typescript
 * const processed = processImage(sanityImage, {
 *   width: 300,
 *   height: 200,
 *   fallbackImage: "/default.jpg"
 * }, {
 *   fallbackAlt: "Custom alt text"
 * });
 *
 * console.log(processed.url); // "https://..."
 * console.log(processed.alt); // "Custom alt text"
 * ```
 */
export const processImage = (
    image: SanityImage | string | undefined,
    config: ImageConfig,
    options: ImageProcessingOptions = {}
): ProcessedImage => {
    const { fallbackAlt, validateUrl = false } = options;

    // Resolve image URL
    const url = resolveImageUrl(image, config);

    // Get alt text
    const alt = getImageAlt(image, fallbackAlt || config.fallbackAlt);

    // Validate URL if requested
    if (validateUrl && !url) {
        console.warn(ERROR_MESSAGES.INVALID_IMAGE, { image, config });
    }

    return { url, alt };
};

/**
 * Processes portfolio project images with project-specific alt text.
 * Specialized function for portfolio project images with naming conventions.
 *
 * @param image - Project image source
 * @param projectName - Name of the project
 * @param config - Image configuration
 * @returns Processed project image
 *
 * @example
 * ```typescript
 * const projectImage = processPortfolioImage(
 *   project.image,
 *   "E-commerce Platform",
 *   { width: 400, height: 300 }
 * );
 *
 * console.log(projectImage.alt); // "E-commerce Platform project"
 * ```
 */
export const processPortfolioImage = (
    image: SanityImage | string | undefined,
    projectName: string,
    config: ImageConfig
): ProcessedImage => {
    // Generate project-specific alt text
    const fallbackAlt = `${projectName} project`;

    return processImage(image, config, { fallbackAlt });
};

/**
 * Validates if an image URL is accessible.
 * Useful for checking if fallback images exist.
 *
 * @param url - Image URL to validate
 * @returns Promise resolving to true if image is accessible
 *
 * @example
 * ```typescript
 * const isValid = await validateImageUrl("https://example.com/image.jpg");
 * if (!isValid) {
 *   // Use fallback image
 * }
 * ```
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
    if (!url) return false;

    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    } catch {
        return false;
    }
};
