// ============================================================
// Route Layout: /blog/layout
// Purpose: Provides site chrome (header/sidebar/footer) and settings/profile data
//          for all blog routes via SSR-friendly Sanity fetches.
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";

import type { HomePageData } from "@/types";

import { PageChrome } from "@/components";
import { data as FallbackData } from "@/data";
import { sanityFetch, homePageDataQuery } from "@/lib";
import { normalizeProfileData, normalizeSectionConfigData } from "@/utils";

// ============================================================
// ISR / Revalidation
// ============================================================
export const revalidate = 60;

// ============================================================
// Constants
// ============================================================
const SANITY_CACHE_TAGS = [
    "profile",
    "services",
    "skills",
    "project",
    "testimonial",
    "experience",
    "education",
    "certificate",
    "pricing",
    "blogPost",
    "settings",
] as const;

// ============================================================
// Types
// ============================================================
interface BlogLayoutProps {
    children: React.ReactNode;
}

/**
 * BlogLayout resolves shared site settings/profile data and wraps children
 * with `PageChrome`. Designed for SSR determinism and flexible section config.
 *
 * @param props - Component props
 * @param props.children - Routed page content
 * @returns JSX.Element - Rendered layout with site chrome
 */

// ============================================================
// Component Definition
// ============================================================
const BlogLayout = async ({ children }: BlogLayoutProps) => {
    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: SANITY_CACHE_TAGS as unknown as string[],
    });

    // Normalize upstream data for consistent rendering
    const profile = normalizeProfileData(data.profile, FallbackData);
    const enabledSections = normalizeSectionConfigData(data.settings).filter(
        (section) => section.enabled
    );

    // ============================================================
    // Render
    // ============================================================
    return (
        <PageChrome
            profile={profile}
            logo={data.settings?.logo}
            enabledSections={enabledSections}
        >
            {children}
        </PageChrome>
    );
};

// ============================================================
// Export
// ============================================================
export default BlogLayout;
