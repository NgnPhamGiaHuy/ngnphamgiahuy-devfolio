import React from "react";
import dynamic from "next/dynamic";

import type { HomePageData } from "@/types";

import { data as FallbackData } from "@/data";
import { SiteHeader, SiteFooter } from "@/components";
import { sanityFetch, homePageDataQuery } from "@/lib";
import {
    normalizeProfileData,
    normalizeSectionConfigData,
    renderSection,
} from "@/utils";

const ScrollToTopButton = dynamic(() =>
    import("@/components").then((mod) => ({ default: mod.ScrollToTopButton }))
);

export const revalidate = 60;

export default async function Home() {
    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: [
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
        ],
    });

    const enabledSections = normalizeSectionConfigData(data.settings).filter(
        (section) => section.enabled
    );

    const profile = normalizeProfileData(data.profile, FallbackData);

    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <SiteHeader profile={profile} logo={data.settings?.logo} />
            <div className={"relative"}>
                {enabledSections.map((section) =>
                    renderSection(section, { sectionProps: data })
                )}
            </div>
            <SiteFooter socialLinks={profile.social_links} />
            <ScrollToTopButton />
        </div>
    );
}
