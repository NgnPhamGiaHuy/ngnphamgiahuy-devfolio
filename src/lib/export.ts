import { sanityClient, urlFor } from "./sanity";
import type {
    ExportOptions,
    ExportedData,
    ExportContentType,
    ExportQueries,
} from "@/types";

import { EXPORT_CONTENT_TYPES, EXPORT_DEFAULTS } from "@/config";

import {
    profileQuery,
    skillsQuery,
    projectsQuery,
    experienceQuery,
    educationQuery,
    servicesQuery,
    testimonialsQuery,
    pricingQuery,
    blogPostsQuery,
    certificatesQuery,
    settingsQuery,
} from "./queries";

const resolveImageUrls = (data: any): any => {
    if (!data) return data;

    if (Array.isArray(data)) {
        return data.map(resolveImageUrls);
    }

    if (typeof data === "object") {
        const resolved: any = {};
        for (const [key, value] of Object.entries(data)) {
            if (
                key === "image" ||
                key === "profile_image" ||
                key === "ogImage" ||
                key === "icon"
            ) {
                if (
                    value &&
                    typeof value === "object" &&
                    "asset" in value &&
                    value.asset
                ) {
                    resolved[key] = {
                        ...value,
                        url: urlFor(value as any)
                            .width(800)
                            .height(600)
                            .url(),
                        thumbnail: urlFor(value as any)
                            .width(300)
                            .height(200)
                            .url(),
                    };
                } else {
                    resolved[key] = value;
                }
            } else if (key === "social_links" && Array.isArray(value)) {
                resolved[key] = value.map((link: any) => ({
                    ...link,
                    icon: link.icon
                        ? {
                              ...link.icon,
                              url: urlFor(link.icon).width(64).height(64).url(),
                          }
                        : link.icon,
                }));
            } else {
                resolved[key] = resolveImageUrls(value);
            }
        }
        return resolved;
    }

    return data;
};

export const exportPortfolioData = async (
    options: ExportOptions = {}
): Promise<ExportedData> => {
    const {
        includeAssets = EXPORT_DEFAULTS.includeAssets,
        contentTypes = [...EXPORT_DEFAULTS.contentTypes],
        includeMetadata = EXPORT_DEFAULTS.includeMetadata,
    } = options;

    const exportedData: ExportedData = {};
    const queries: ExportQueries = {
        profile: profileQuery,
        skills: skillsQuery,
        projects: projectsQuery,
        experience: experienceQuery,
        education: educationQuery,
        services: servicesQuery,
        testimonials: testimonialsQuery,
        pricing: pricingQuery,
        blogs: blogPostsQuery,
        certificates: certificatesQuery,
        settings: settingsQuery,
    };

    let totalDocuments = 0;
    const failedContentTypes: string[] = [];

    const typesToExport = contentTypes.includes("all")
        ? Object.keys(queries)
        : contentTypes;

    for (const contentType of typesToExport) {
        if (queries[contentType]) {
            try {
                const data = await sanityClient.fetch(queries[contentType]);

                if (includeAssets) {
                    exportedData[contentType as keyof ExportedData] =
                        resolveImageUrls(data);
                } else {
                    exportedData[contentType as keyof ExportedData] = data;
                }

                if (Array.isArray(data)) {
                    totalDocuments += data.length;
                } else if (data) {
                    totalDocuments += 1;
                }
            } catch {
                failedContentTypes.push(contentType);
            }
        }
    }

    if (includeMetadata) {
        exportedData.metadata = {
            exportDate: new Date().toISOString(),
            totalDocuments,
            contentTypes: typesToExport,
            version: "1.0.0",
            ...(failedContentTypes.length > 0 && { failedContentTypes }),
        };
    }

    if (failedContentTypes.length === typesToExport.length) {
        throw new Error(
            `All content types failed to export: ${failedContentTypes.join(", ")}`
        );
    }

    return exportedData;
};

export const exportContentType = async (
    contentType: ExportContentType
): Promise<any> => {
    const queries: ExportQueries = {
        profile: profileQuery,
        skills: skillsQuery,
        projects: projectsQuery,
        experience: experienceQuery,
        education: educationQuery,
        services: servicesQuery,
        testimonials: testimonialsQuery,
        pricing: pricingQuery,
        blogs: blogPostsQuery,
        certificates: certificatesQuery,
        settings: settingsQuery,
    };

    if (!queries[contentType]) {
        throw new Error(`Unknown content type: ${contentType}`);
    }

    const data = await sanityClient.fetch(queries[contentType]);
    return resolveImageUrls(data);
};

export const getAvailableContentTypes = (): ExportContentType[] => {
    return [...EXPORT_CONTENT_TYPES];
};
