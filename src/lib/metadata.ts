import { Metadata } from "next";

import type { Profile, Settings } from "@/types/sanity.types";

import { data as mockData } from "@/data";
import { urlFor } from "./sanity";
import { sanityFetch } from "./sanity";
import { profileQuery, settingsQuery } from "./queries";

const resolveImageUrl = (
    image: unknown,
    baseUrl: string
): string | undefined => {
    if (!image) return undefined;
    if (typeof image === "string") {
        if (image.startsWith("http")) return image;
        if (image.startsWith("/")) return `${baseUrl}${image}`;
        return undefined;
    }
    try {
        return urlFor(image as any)
            .width(1200)
            .height(630)
            .url();
    } catch {
        return undefined;
    }
};

export const generateHomePageMetadata = async (): Promise<Metadata> => {
    try {
        const [profile, settings] = await Promise.all([
            sanityFetch<Profile | null>({
                query: profileQuery,
                tags: ["profile"],
            }),
            sanityFetch<Settings | null>({
                query: settingsQuery,
                tags: ["settings"],
            }),
        ]);

        const resolveBaseUrl = (): string => {
            const envUrl =
                process.env.NEXT_PUBLIC_BASE_URL ||
                process.env.NEXT_PUBLIC_SITE_URL ||
                process.env.NEXT_PUBLIC_VERCEL_URL ||
                "http://localhost:3000";

            const withProtocol = envUrl.startsWith("http")
                ? envUrl
                : `https://${envUrl}`;
            return withProtocol.endsWith("/")
                ? withProtocol.slice(0, -1)
                : withProtocol;
        };

        const baseUrl = resolveBaseUrl();

        const effectiveProfile = profile ?? (mockData as any)?.profile ?? null;

        const title =
            effectiveProfile?.metaTitle ||
            settings?.metaTitle ||
            (effectiveProfile
                ? `${effectiveProfile.name} - ${effectiveProfile.job_title}`
                : "NgnPhamGiaHuy Devfolio");
        const description =
            effectiveProfile?.metaDescription ||
            settings?.metaDescription ||
            effectiveProfile?.description ||
            "";

        const ogImage = effectiveProfile?.ogImage || settings?.ogImage;
        const ogImageUrl =
            resolveImageUrl(ogImage, baseUrl) ||
            resolveImageUrl(effectiveProfile?.profile_image, baseUrl);

        return {
            title,
            description,
            keywords: [
                effectiveProfile?.name,
                effectiveProfile?.job_title,
                effectiveProfile?.title,
                "portfolio",
                "developer",
                "software engineer",
                ...(effectiveProfile?.location
                    ? [effectiveProfile.location]
                    : []),
            ],
            authors: effectiveProfile?.name
                ? [{ name: effectiveProfile.name }]
                : undefined,
            creator: effectiveProfile?.name,
            publisher: effectiveProfile?.name,
            openGraph: {
                type: "website",
                locale: "en_US",
                url: baseUrl,
                title,
                description,
                siteName: effectiveProfile?.name
                    ? `${effectiveProfile.name} Portfolio`
                    : undefined,
                images: ogImageUrl
                    ? [
                          {
                              url: ogImageUrl,
                              width: 1200,
                              height: 630,
                              alt:
                                  typeof ogImage === "object" &&
                                  ogImage &&
                                  "alt" in (ogImage as any)
                                      ? (ogImage as any).alt
                                      : effectiveProfile
                                        ? `${effectiveProfile.name} - ${effectiveProfile.job_title}`
                                        : title,
                          },
                      ]
                    : [],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: ogImageUrl ? [ogImageUrl] : [],
                creator: effectiveProfile?.social_links?.find(
                    (link: any) => link.platform === "Twitter"
                )?.url,
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
            verification: {
                google: process.env.GOOGLE_SITE_VERIFICATION,
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);

        return {
            title: "NgnPhamGiaHuy Devfolio",
            description: "Developed by NgnPhamGiaHuy",
        };
    }
};
