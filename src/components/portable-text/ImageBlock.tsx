import React from "react";
import Image from "next/image";

import { urlFor } from "@/lib";
import type { ImageValue } from "@/types/portable-text.types";

// ============================================================
// Component: ImageBlock
// Purpose: Renders a responsive image with optional caption from Portable Text
// ============================================================

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "pt-image-block",
    image: "pt-image",
    caption: "pt-image-caption",
} as const;

// ============================================================
// Types
// ============================================================
interface ImageBlockProps {
    value: ImageValue;
}

// ============================================================
// Component Definition
// ============================================================
/**
 * ImageBlock renders a responsive image with an optional caption using Next/Image.
 * Designed for SSR and a11y: derives alt text from alt or caption with fallbacks.
 *
 * @param props - Component props
 * @param props.value - Portable Text image value from Sanity
 * @returns JSX.Element | null - Rendered figure or null when invalid
 */
const ImageBlock = ({ value }: ImageBlockProps) => {
    try {
        const src = value?.asset ? urlFor(value).width(1200).url() : null;
        if (!src) return null;

        const alt = value?.alt || value?.caption || "Blog image";
        const caption = value?.caption || "";

        return (
            <figure className="w-full my-8 rounded-2xl overflow-hidden mx-auto" data-testid={TEST_IDS.root}>
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

// ============================================================
// Export
// ============================================================
export default ImageBlock;

// DX: Explicit display name for clearer React DevTools identification
ImageBlock.displayName = "ImageBlock";
