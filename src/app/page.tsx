// ============================================================
// Page: Home
// Purpose: Main landing page with dynamic section rendering
// ============================================================

import React from "react";
import dynamic from "next/dynamic";

import type { HomePageData } from "@/types";

import { data as FallbackData } from "@/data";
import { SiteHeader, SiteFooter } from "@/components";
import { sanityFetch, homePageDataQuery } from "@/lib";
import { normalizeProfileData, normalizeSectionConfigData } from "@/utils";
import { renderSection } from "@/utils/sectionComponents";

// ============================================================
// Dynamic Imports
// ============================================================

/**
 * Dynamically imported ScrollToTopButton for better performance.
 * Only loads when needed to reduce initial bundle size.
 */
const ScrollToTopButton = dynamic(() =>
    import("@/components").then((mod) => ({ default: mod.ScrollToTopButton }))
);

// ============================================================
// Page Configuration
// ============================================================
export const revalidate = 60;

// ============================================================
// Constants
// ============================================================

/** Sanity cache tags for data invalidation */
const SANITY_CACHE_TAGS: string[] = [
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
];

// ============================================================
// Page Component
// ============================================================

/**
 * Home page component that renders the main landing page.
 * Features dynamic section rendering, data normalization, and performance optimization.
 *
 * @returns JSX element representing the home page
 */
export default async function Home(): Promise<React.JSX.Element> {
    // ============================================================
    // Data Fetching
    // ============================================================

    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: SANITY_CACHE_TAGS,
    });

    // ============================================================
    // Data Processing
    // ============================================================

    // Normalize profile data with fallback
    const profile = normalizeProfileData(data.profile, FallbackData);

    // Filter and normalize enabled sections
    const enabledSections = normalizeSectionConfigData(data.settings).filter(
        (section) => section.enabled
    );

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className="min-h-[50vh] overflow-hidden relative">
            {/* Site Header */}
            <SiteHeader
                profile={profile}
                logo={data.settings?.logo}
                enabledSections={enabledSections}
            />

            {/* Dynamic Sections */}
            <div className="relative">
                {enabledSections.map((section) =>
                    renderSection(section, { sectionProps: data })
                )}
            </div>

            {/* Site Footer */}
            <SiteFooter socialLinks={profile.social_links} />

            {/* Scroll to Top Button */}
            <ScrollToTopButton />
        </div>
    );
}
