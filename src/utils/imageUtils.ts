import { urlFor } from "@/lib";
import { ImageConfig, SanityImage } from "@/types";

const DEFAULT_CONFIG: Pick<Required<ImageConfig>, "fallbackAlt"> = {
    fallbackAlt: "Image",
};

export const resolveImageUrl = (
    image: SanityImage | string | undefined,
    configOrBaseUrl?: ImageConfig | string
): string => {
    // Handle both ImageConfig object and baseUrl string for backward compatibility
    const isConfigObject =
        configOrBaseUrl && typeof configOrBaseUrl === "object";
    const config = isConfigObject
        ? (configOrBaseUrl as ImageConfig)
        : undefined;
    const baseUrl = !isConfigObject ? (configOrBaseUrl as string) : undefined;

    const { fallbackImage } = { ...DEFAULT_CONFIG, ...config };

    if (!image) {
        return fallbackImage || "";
    }

    if (typeof image === "string") {
        // Handle baseUrl case (from metadata.ts)
        if (baseUrl) {
            if (image.startsWith("http")) return image;
            if (image.startsWith("/")) return `${baseUrl}${image}`;
            return "";
        }
        // Handle config case (original behavior)
        return image;
    }

    // Handle Sanity image
    try {
        if (config?.width && config?.height) {
            return urlFor(image as SanityImage)
                .width(config.width)
                .height(config.height)
                .url();
        }
        return urlFor(image as SanityImage).url();
    } catch {
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
    fallbackAlt?: string
): { url: string; alt: string } => {
    const url = resolveImageUrl(image, config);
    const alt = getImageAlt(image, fallbackAlt || config.fallbackAlt);

    return { url, alt };
};

export const processPortfolioImage = (
    image: SanityImage | string | undefined,
    projectName: string,
    config: ImageConfig
): { url: string; alt: string } => {
    const fallbackAlt = `${projectName} project`;

    return processImage(image, config, fallbackAlt);
};
