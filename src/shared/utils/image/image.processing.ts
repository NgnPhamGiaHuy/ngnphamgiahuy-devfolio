import type { ImageConfig } from "@/shared";

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
    image: string | undefined,
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

        if (baseUrl) {
            if (
                image.startsWith(URL_PATTERNS.HTTP) ||
                image.startsWith(URL_PATTERNS.HTTPS)
            ) {
                return image;
            }

            if (image.startsWith(URL_PATTERNS.ABSOLUTE_PATH)) {
                return `${baseUrl}${image}`;
            }

            return fallbackImage || "";
        }

        return image;
    } catch (error) {
        console.error(ERROR_MESSAGES.PROCESSING_FAILED, error);
        return "";
    }
};

export const getImageAlt = (
    image: string | undefined,
    fallbackText: string = DEFAULT_CONFIG.fallbackAlt
): string => {
    return image ? fallbackText : fallbackText;
};

export const processImage = (
    image: string | undefined,
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
    image: string | undefined,
    projectName: string,
    config: ImageConfig
): ProcessedImage => {
    const fallbackAlt = `${projectName} project`;

    return processImage(image, config, { fallbackAlt });
};
