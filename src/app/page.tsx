import React from "react";
import dynamic from "next/dynamic";

import { renderSection } from "@/utils";
import { SECTIONS_CONFIG } from "@/config";

import { sanityFetch } from "@/lib";
import { homePageDataQuery } from "@/lib";
import type { HomePageData } from "@/types";

import { Header, Footer } from "@/components";

const ScrollToTopButton = dynamic(() => import("@/components").then(mod => ({ default: mod.ScrollToTopButton })));

export const revalidate = 60;

export default async function Home() {
    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: ["profile", "services", "skills", "project", "testimonial",
            "experience", "education", "pricing", "blogPost", "contactItem", "siteSettings"],
    });

    const enabledSections = SECTIONS_CONFIG.filter(section => section.enabled);

    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <Header logo={data.siteSettings?.logo} />
            <div className={"wrapper"}>
                {enabledSections.map(section => renderSection(section, data))}
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}