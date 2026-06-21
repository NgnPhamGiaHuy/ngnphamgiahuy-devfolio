import { Metadata } from "next";

import { resolveImageUrl } from "@/shared";
import { getPortfolioData } from "@/application/use-cases/content";

export const generateHomePageMetadata = async (): Promise<Metadata> => {
    const { profile, settings } = await getPortfolioData();

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

    const title =
        profile.metaTitle ||
        settings.metaTitle ||
        `${profile.name} - ${profile.job_title}`;
    const description =
        profile.metaDescription ||
        settings.metaDescription ||
        profile.description ||
        "";

    const ogImage = profile.ogImage || settings.ogImage;
    const ogImageUrl =
        resolveImageUrl(ogImage, baseUrl) ||
        resolveImageUrl(profile.profile_image, baseUrl);

    return {
        title,
        description,
        keywords: [
            profile.name,
            profile.job_title,
            "portfolio",
            "developer",
            "software engineer",
            ...(profile.location ? [profile.location] : []),
        ],
        authors: [{ name: profile.name }],
        creator: profile.name,
        publisher: profile.name,
        openGraph: {
            type: "website",
            locale: "en_US",
            url: baseUrl,
            title,
            description,
            siteName: `${profile.name} Portfolio`,
            images: ogImageUrl
                ? [
                      {
                          url: ogImageUrl,
                          width: 1200,
                          height: 630,
                          alt: `${profile.name} - ${profile.job_title}`,
                      },
                  ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImageUrl ? [ogImageUrl] : [],
            creator: profile.social_links?.find(
                (link) => link.platform === "Twitter"
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
};
