import type { ImageConfig } from "@/shared";
import type { SanityImageType } from "@/schemas";

import { urlFor } from "@/infrastructure/persistence/sanity/SanityClient";

const DEFAULT_CONFIG: Pick<Required<ImageConfig>, "fallbackAlt"> = {
    fallbackAlt: "Image",
} as const;

const URL_PATTERNS = {
    HTTP: "http",
    HTTPS: "https",
    ABSOLUTE_PATH: "/",
} as const;

const ERROR_MESSAGES = {
    INVALID_IMAGE: "Invalid image provided",
    PROCESSING_FAILED: "Failed to process image",
} as const;

interface ProcessedImage {
    url: string;
    alt: string;
}

interface ImageProcessingOptions {
    fallbackAlt?: string;
    validateUrl?: boolean;
}

export const resolveImageUrl = (
    image: SanityImageType | string | undefined,
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

        return handleSanityImage(
            image as SanityImageType,
            config,
            fallbackImage
        );
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

const getPlaceholderImageUrl = (width?: number, height?: number): string => {
    const w = width || 800;
    const h = height || 600;

    return `https://picsum.photos/${w}/${h}?random=${Math.random()}`;
};

const handleSanityImage = (
    image: SanityImageType,
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
        const placeholderUrl = getPlaceholderImageUrl(
            config?.width,
            config?.height
        );

        if (process.env.NODE_ENV === "development") {
            console.warn(
                "Sanity image processing failed, using placeholder:",
                error instanceof Error ? error.message : error
            );
        }

        return fallbackImage || placeholderUrl;
    }
};

export const getImageAlt = (
    image: SanityImageType | string | undefined,
    fallbackText: string = DEFAULT_CONFIG.fallbackAlt
): string => {
    if (!image) {
        return fallbackText;
    }

    if (typeof image === "string") {
        return fallbackText;
    }

    return (image as SanityImageType)?.alt || fallbackText;
};

export const processImage = (
    image: SanityImageType | string | undefined,
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
    image: SanityImageType | string | undefined,
    projectName: string,
    config: ImageConfig
): ProcessedImage => {
    const fallbackAlt = `${projectName} project`;

    return processImage(image, config, { fallbackAlt });
};
