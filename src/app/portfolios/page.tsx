import React from "react";

import type { HomePageData } from "@/shared/types";

import {
    normalizeProfileData,
    normalizeProjectsData,
    normalizeSectionConfigData,
} from "@/shared/utils/sections";
import { PageChrome } from "@/components";
import ProjectBento from "@/components/features/career-graph/ProjectBento";
import { enrichProjects } from "@/infrastructure/persistence/content/project-enrichment";
import { createMockData, homePageDataQuery, sanityFetch } from "@/infrastructure";

export const revalidate = 60;

const CACHE_TAGS: string[] = ["profile", "project", "settings"];

const PortfoliosPage = async (): Promise<React.JSX.Element> => {
    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: CACHE_TAGS,
    });

    const FallbackData = createMockData();

    const profile = normalizeProfileData(data.profile, FallbackData);

    let projects = normalizeProjectsData(data.projects, FallbackData);
    if (projects?.length) projects = enrichProjects(projects);

    // Reuse the home page's claude.com chrome + the reskinned bento grid so
    // /portfolios is visually consistent with the rest of the site.
    const enabledSections = normalizeSectionConfigData(data.settings).filter(
        (section) => section.enabled
    );

    return (
        <PageChrome
            profile={profile}
            logo={data.settings?.logo}
            enabledSections={enabledSections}
        >
            <ProjectBento id="portfolios" projects={projects} />
        </PageChrome>
    );
};

PortfoliosPage.displayName = "PortfoliosPage";

export default PortfoliosPage;
