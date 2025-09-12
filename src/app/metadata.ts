import { Metadata } from "next";

import { sanityFetch } from "@/lib";
import type { SiteSettings, Profile } from "@/types";

export const generateMetadata = async (): Promise<Metadata> => {
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
