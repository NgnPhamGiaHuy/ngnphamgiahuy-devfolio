import { urlFor } from "@/lib";
import { ImageConfig, SanityImage } from "@/types";

const DEFAULT_CONFIG: Pick<Required<ImageConfig>, "fallbackAlt"> = {
    fallbackAlt: "Image",
};

export const resolveImageUrl = (
    image: SanityImage | string | undefined,
    config: ImageConfig
): string => {
    const { fallbackImage } = { ...DEFAULT_CONFIG, ...config };

    if (!image) {
        return fallbackImage || "";
    }

    if (typeof image === "string") {
        return image;
    }
    return urlFor(image as SanityImage).url();
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
