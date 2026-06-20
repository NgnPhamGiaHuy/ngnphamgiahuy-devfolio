import React from "react";

import type { HomePageData } from "@/shared/types";

import { normalizeProfileData, normalizeProjectsData } from "@/shared/utils/sections";
import {
    Portfolios,
    ScrollToTopButton,
    SiteFooter,
    SiteHeader,
} from "@/components";
import {
    createMockData,
    homePageDataQuery,
    sanityFetch,
} from "@/infrastructure";

const CACHE_TAGS: string[] = ["profile", "project", "settings"];

const PAGE_LAYOUT = {
    MIN_HEIGHT: "min-h-[50vh]",
    CONTENT_TOP_PADDING: "pt-[200px]",
} as const;

const PORTFOLIO_CONFIG = {
    ID: "portfolios",
    HIDE_SEE_MORE: true,
    BACKGROUND_VARIANT: "none" as const,
} as const;

const PortfoliosPage = async (): Promise<React.JSX.Element> => {
    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: CACHE_TAGS,
    });

    const FallbackData = createMockData();

    const profile = normalizeProfileData(data.profile, FallbackData);

    const projects = normalizeProjectsData(data.projects, FallbackData);

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

PortfoliosPage.displayName = "PortfoliosPage";

export default PortfoliosPage;
