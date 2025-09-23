import React from "react";
import dynamic from "next/dynamic";

import type { HomePageData } from "@/types";

import { SECTIONS_CONFIG } from "@/config";
import { data as FallbackData } from "@/data";
import { SiteHeader, SiteFooter } from "@/components";
import { sanityFetch, homePageDataQuery } from "@/lib";
import { normalizeProfileData, renderSection } from "@/utils";

const ScrollToTopButton = dynamic(() => import("@/components").then(mod => ({ default: mod.ScrollToTopButton })));

export const revalidate = 60;

export default async function Home() {
    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: ["profile", "services", "skills", "project", "testimonial",
            "experience", "education", "pricing", "blogPost", "contactItem", "siteSettings"],
    });

    const enabledSections = SECTIONS_CONFIG.filter(section => section.enabled);

    const profile = normalizeProfileData(data.profile, FallbackData);

    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <SiteHeader profile={profile} logo={data.siteSettings?.logo} />
            <div className={"relative"}>
                {enabledSections.map(section => renderSection(section, { sectionProps: data }))}
            </div>
            <SiteFooter socialLinks={profile.social_links} />
            <ScrollToTopButton />
        </div>
    );
}