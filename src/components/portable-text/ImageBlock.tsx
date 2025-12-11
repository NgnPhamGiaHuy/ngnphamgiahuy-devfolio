import React from "react";
import Image from "next/image";

import type { ImageValue } from "@/shared/types/portable-text.types";

import { urlFor } from "@/infrastructure/persistence/sanity/SanityClient";

const TEST_IDS = {
    root: "pt-image-block",
    image: "pt-image",
    caption: "pt-image-caption",
} as const;

interface ImageBlockProps {
    value: ImageValue;
}

const ImageBlock = ({ value }: ImageBlockProps) => {
    try {
        const src = value?.asset ? urlFor(value).width(1200).url() : null;
        if (!src) return null;

        const alt = value?.alt || value?.caption || "Blog image";
        const caption = value?.caption || "";

        return (
            <figure
                className="w-full my-8 rounded-2xl overflow-hidden mx-auto"
                data-testid={TEST_IDS.root}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={700}
                    className="w-full h-auto object-cover shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    data-testid={TEST_IDS.image}
                />
                {caption && (
                    <figcaption
                        className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center leading-relaxed"
                        data-testid={TEST_IDS.caption}
                    >
                        {caption}
                    </figcaption>
                )}
            </figure>
        );
    } catch {
        return null;
    }
};

export default ImageBlock;

ImageBlock.displayName = "ImageBlock";
