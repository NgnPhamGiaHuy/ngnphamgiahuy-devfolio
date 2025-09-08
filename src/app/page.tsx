import React from "react";
import { Metadata } from "next";

import { renderSection } from "@/utils/sectionComponents";
import { SECTIONS_CONFIG } from "@/config/sections.config";

import { sanityFetch } from "@/lib/sanity";
import { homePageDataQuery } from "@/lib/queries";
import type { HomePageData } from "@/types/cms.types";
import { SiteSettings, Profile } from "@/types/sanity.types";

import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import ScrollToTopButton from "@/components/ui/button/ScrollToTopButton";

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
    const data = await sanityFetch<{ profile: Pick<Profile, "metaTitle" | "metaDescription" | "ogImage">, siteSettings: Pick<SiteSettings, "metaTitle" | "metaDescription" | "ogImage"> }>({
        query: `{
      "profile": *[_type == "profile"][0] {
        metaTitle,
        metaDescription,
        ogImage
      },
      "siteSettings": *[_type == "siteSettings"][0] {
        metaTitle,
        metaDescription,
        ogImage
      }
    }`,
        tags: ["profile", "siteSettings"],
    });

    const { profile, siteSettings } = data;

    const title = profile?.metaTitle || siteSettings?.metaTitle || "Portfolio";
    const description = profile?.metaDescription || siteSettings?.metaDescription || "";
    const ogImageUrl = undefined;

    return {
        title,
        description,
        openGraph: ogImageUrl ? {
            images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        } : undefined,
    };
}

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