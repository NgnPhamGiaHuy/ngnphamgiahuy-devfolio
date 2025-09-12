import { urlFor } from "@/lib";
import { ImageConfig, SanityImage } from "@/types";

/**
 * Default configuration for image processing
 */
const DEFAULT_CONFIG: Required<Omit<ImageConfig, 'fallbackImage'>> = {
    width: 600,
    height: 400,
    fallbackAlt: "Image"
};

/**
 * Processes a Sanity image or string URL and returns a resolved image URL
 * @param image - Sanity image object or string URL
 * @param config - Configuration for image processing (fallbackImage is required)
 * @returns Resolved image URL
 */
export const resolveImageUrl = (
    image: SanityImage | string | undefined,
    config: ImageConfig
): string => {
    const { width, height, fallbackImage } = { ...DEFAULT_CONFIG, ...config };

    if (!image) {
        return fallbackImage || "";
    }

    if (typeof image === "string") {
        return image;
    }

    return urlFor(image as SanityImage)
        .width(width)
        .height(height)
        .url();
};

/**
 * Extracts alt text from a Sanity image or provides a fallback
 * @param image - Sanity image object or string URL
 * @param fallbackText - Fallback text to use if no alt text is available
 * @returns Alt text for the image
 */
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

/**
 * Processes both image URL and alt text in one function call
 * @param image - Sanity image object or string URL
 * @param config - Configuration for image processing (fallbackImage is required)
 * @param fallbackAlt - Fallback alt text
 * @returns Object containing both URL and alt text
 */
export const processImage = (
    image: SanityImage | string | undefined,
    config: ImageConfig,
    fallbackAlt?: string
): { url: string; alt: string } => {
    const url = resolveImageUrl(image, config);
    const alt = getImageAlt(image, fallbackAlt || config.fallbackAlt);

    return { url, alt };
};

/**
 * Convenience function specifically for portfolio/project images
 * @param image - Sanity image object or string URL
 * @param projectName - Name of the project for fallback alt text
 * @param config - Configuration for image processing (fallbackImage is required)
 * @returns Object containing both URL and alt text
 */
export const processPortfolioImage = (
    image: SanityImage | string | undefined,
    projectName: string,
    config: ImageConfig
): { url: string; alt: string } => {
    const fallbackAlt = `${projectName} project`;
    return processImage(image, config, fallbackAlt);
};
