// ============================================================
// Page: Home
// Purpose: Main landing page with dynamic section rendering
// ============================================================

import React from "react";

import type { HomePageData } from "@/shared/types";

import { createMockData } from "@/infrastructure/persistence/mocks";
import { PageChrome } from "@/components";
import { homePageDataQuery, sanityFetch } from "@/lib";
import { renderSection } from "@/components/section/SectionRenderer";
import {
    normalizeProfileData,
    normalizeSectionConfigData,
} from "@/shared/utils";

// ============================================================
// Dynamic Imports
// ============================================================

// ScrollToTopButton handled by PageChrome

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

    // Generate fallback mock data
    const FallbackData = createMockData();

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
        <PageChrome
            profile={profile}
            logo={data.settings?.logo}
            enabledSections={enabledSections}
        >
            <div className="relative">
                {enabledSections.map((section) =>
                    renderSection(section, { sectionProps: data })
                )}
            </div>
        </PageChrome>
    );
}
