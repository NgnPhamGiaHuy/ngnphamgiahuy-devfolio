import { Metadata } from "next";

import type { Profile, Settings, BlogPost } from "@/types/sanity.types";

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

        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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

export const generateBlogPostMetadata = async (
    slug: string
): Promise<Metadata> => {
    try {
        const blogPost = await sanityFetch<BlogPost | null>({
            query: `*[_type == "blogPost" && slug.current == $slug][0] {
                _id,
                title,
                slug,
                date,
                excerpt,
                content,
                image {
                    asset,
                    alt,
                    caption
                },
                categories,
                metaTitle,
                metaDescription,
                ogImage {
                    asset,
                    alt,
                    caption
                }
            }`,
            params: { slug },
            tags: ["blogPost"],
        });

        const fallbackBlog =
            (mockData as any)?.blogs?.find(
                (b: any) => b?.slug?.current === slug
            ) ?? null;
        const effectivePost = blogPost ?? fallbackBlog;

        if (!effectivePost) {
            return {
                title: "Blog Post Not Found",
                description: "The requested blog post could not be found.",
            };
        }

        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const postUrl = `${baseUrl}/blog/${slug}`;

        const title = effectivePost.metaTitle || effectivePost.title;
        const description =
            effectivePost.metaDescription || effectivePost.excerpt;

        const ogImage = effectivePost.ogImage || effectivePost.image;
        const ogImageUrl = resolveImageUrl(ogImage, baseUrl);
        const ogAlt =
            ogImage && typeof ogImage === "object" && "alt" in ogImage
                ? (ogImage as any).alt || effectivePost.title
                : effectivePost.title;

        return {
            title,
            description,
            keywords: [
                ...((effectivePost.categories as string[] | undefined) || []),
                "blog",
                "article",
                "tech",
                "development",
            ],
            openGraph: {
                type: "article",
                locale: "en_US",
                url: postUrl,
                title,
                description,
                siteName: "NgnPhamGiaHuy Devfolio",
                publishedTime: effectivePost.date,
                images: ogImageUrl
                    ? [
                          {
                              url: ogImageUrl,
                              width: 1200,
                              height: 630,
                              alt: ogAlt,
                          },
                      ]
                    : [],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: ogImageUrl ? [ogImageUrl] : [],
            },
        };
    } catch (error) {
        console.error("Error generating blog post metadata:", error);
        return {
            title: "Blog Post",
            description: "A blog post from NgnPhamGiaHuy's portfolio.",
        };
    }
};
