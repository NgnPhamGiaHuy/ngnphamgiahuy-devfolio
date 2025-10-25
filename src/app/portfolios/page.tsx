// ============================================================
// Page: Portfolios
// Purpose: Dedicated portfolios page with project showcase
// ============================================================

import React from "react";

import type { HomePageData } from "@/types";

import { data as FallbackData } from "@/data";
import { homePageDataQuery, sanityFetch } from "@/lib";
import { normalizeProfileData, normalizeProjectsData } from "@/utils";
import {
    Portfolios,
    ScrollToTopButton,
    SiteFooter,
    SiteHeader,
} from "@/components";

// ============================================================
// Constants
// ============================================================

/** Cache tags for data invalidation */
const CACHE_TAGS: string[] = ["profile", "project", "settings"];

/** Page layout constants */
const PAGE_LAYOUT = {
    MIN_HEIGHT: "min-h-[50vh]",
    CONTENT_TOP_PADDING: "pt-[200px]",
} as const;

/** Portfolio section configuration */
const PORTFOLIO_CONFIG = {
    ID: "portfolios",
    HIDE_SEE_MORE: true,
    BACKGROUND_VARIANT: "none" as const,
} as const;

// ============================================================
// Page Component
// ============================================================

/**
 * Portfolios page component displays a dedicated project showcase.
 * Features server-side data fetching, responsive layout, and navigation.
 *
 * @returns JSX element representing the portfolios page
 *
 * @example
 * ```tsx
 * // This page is automatically rendered at /portfolios route
 * // Data is fetched server-side and cached for performance
 * ```
 */
const PortfoliosPage = async (): Promise<React.JSX.Element> => {
    // ============================================================
    // Data Fetching
    // ============================================================

    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: CACHE_TAGS,
    });

    // ============================================================
    // Data Processing
    // ============================================================

    // Normalize profile data with fallback
    const profile = normalizeProfileData(data.profile, FallbackData);

    // Normalize projects data with fallback
    const projects = normalizeProjectsData(data.projects, FallbackData);

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className={`${PAGE_LAYOUT.MIN_HEIGHT} overflow-hidden relative`}>
            {/* Site Header */}
            <SiteHeader profile={profile} logo={data.settings?.logo} />

            {/* Main Content */}
            <div className={`${PAGE_LAYOUT.CONTENT_TOP_PADDING} relative`}>
                <Portfolios
                    id={PORTFOLIO_CONFIG.ID}
                    projects={projects}
                    hideSeeMore={PORTFOLIO_CONFIG.HIDE_SEE_MORE}
                    backgroundVariant={PORTFOLIO_CONFIG.BACKGROUND_VARIANT}
                />
            </div>

            {/* Site Footer */}
            <SiteFooter socialLinks={profile.social_links} />

            {/* Scroll to Top Button */}
            <ScrollToTopButton />
        </div>
    );
};

// ============================================================
// Page Metadata
// ============================================================

PortfoliosPage.displayName = "PortfoliosPage";

export default PortfoliosPage;
