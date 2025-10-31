// ============================================================
// Component: BlogPostIntro
// Purpose: Layout wrapper for the blog post header area with gradient background
//          and responsive paddings.
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "blog-post-intro",
} as const;

// ============================================================
// Types
// ============================================================
interface BlogPostIntroProps {
    children: React.ReactNode;
}

/**
 * BlogPostIntro renders the top section container for a blog article.
 * Designed for SSR and accessibility compliance.
 *
 * @param props - Component props
 * @param props.children - Content to render within the intro container
 * @returns JSX.Element - Rendered component
 */

// ============================================================
// Component Definition
// ============================================================
const BlogPostIntro = ({ children }: BlogPostIntroProps) => {
    return (
        <section
            className="pt-[170px] lg:pt-[220px] pb-[70px] lg:pb-[120px] bg-[linear-gradient(180deg,#fff_0%,#f0ebe3_100%)] z-3 relative"
            aria-label="Post introduction"
            data-testid={TEST_IDS.root}
        >
            <div className="sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] w-full mx-auto px-[20px] md:px-[12px] relative">
                {children}
            </div>
        </section>
    );
};

// ============================================================
// Export
// ============================================================
export default BlogPostIntro;

// DX: Explicit display name for clearer React DevTools identification
BlogPostIntro.displayName = "BlogPostIntro";
