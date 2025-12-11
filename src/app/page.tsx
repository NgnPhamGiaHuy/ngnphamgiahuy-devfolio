import React from "react";

import type { HomePageData } from "@/shared/types";

import { createMockData } from "@/infrastructure/persistence/mocks";
import { PageChrome } from "@/components";
import { renderSection } from "@/components/section/SectionRenderer";
import {
    normalizeProfileData,
    normalizeSectionConfigData,
} from "@/shared/utils";
import { sanityFetch } from "@/infrastructure/persistence/sanity/SanityClient";
import { homePageDataQuery } from "@/infrastructure/persistence/sanity/queries";

export const revalidate = 60;

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

export default async function Home(): Promise<React.JSX.Element> {
    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: SANITY_CACHE_TAGS,
    });

    const FallbackData = createMockData();

    const profile = normalizeProfileData(data.profile, FallbackData);

    const enabledSections = normalizeSectionConfigData(data.settings).filter(
        (section) => section.enabled
    );

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
