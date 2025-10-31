// ============================================================
// Component: BlogPostHeroImage
// Purpose: Responsive hero image section for a blog post with decorative rule.
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";
import Image from "next/image";

import { VerticalRule } from "@/components";

// ============================================================
// Constants
// ============================================================
const CONTAINER_CLASS =
    "sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] w-full mx-auto px-[12px] max-md:px-[20px] relative";

const TEST_IDS = {
    root: "blog-post-hero-image",
} as const;

// ============================================================
// Types
// ============================================================
interface BlogPostHeroImageProps {
    src: string;
    alt: string;
}

// ============================================================
// Component Definition
// ============================================================
/**
 * BlogPostHeroImage renders a responsive, full-bleed hero image with a
 * decorative vertical rule. Designed for SSR safety and a11y compliance.
 *
 * @param props - Component props
 * @param props.src - Image source URL
 * @param props.alt - Descriptive alt text for accessibility
 * @returns JSX.Element - Rendered component
 */
const Container = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={`${CONTAINER_CLASS} ${className}`}>{children}</div>;
};

const BlogPostHeroImage = ({ src, alt }: BlogPostHeroImageProps) => {
    return (
        <section
            className="p-0 z-3"
            aria-label="Post hero image"
            data-testid={TEST_IDS.root}
        >
            <Container className="px-[12px]">
                <VerticalRule
                    top="-143px"
                    right="-100px"
                    bottom="-577px"
                    left="auto"
                    shadow="before:shadow-[-5px_5px_0_rgb(0_0_0/0.2)] dark:before:shadow-[-5px_5px_0_rgb(255_255_255/0.2)] after:shadow-[-5px_5px_0_rgb(0_0_0/0.2)] dark:after:shadow-[-5px_5px_0_rgb(255_255_255/0.2)]"
                    className="max-lg:hidden! transform -scale-x-100"
                />
            </Container>
            <div className="w-full h-[740px] max-md:h-[360px] max-lg:h-[460px] relative">
                <Image
                    src={src}
                    alt={alt}
                    fill={true}
                    className="object-cover"
                    // ============================================================
                    // Image Props
                    // ============================================================
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    priority={false}
                />
            </div>
        </section>
    );
};

// ============================================================
// Export
// ============================================================
export default BlogPostHeroImage;

// DX: Explicit display name for clearer React DevTools identification
BlogPostHeroImage.displayName = "BlogPostHeroImage";
