import type { MetadataRoute } from "next";

import {
    getBlogPosts,
    getPortfolioData,
} from "@/application/use-cases/content";
import { getSiteUrl, projectSlug } from "@/shared/utils";
import { normalizeProjectsData } from "@/shared/utils/sections";

/**
 * sitemap.xml — static public routes plus one entry per published project
 * and blog post. Drafts are excluded because the read use-cases only return
 * published documents.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = getSiteUrl();
    const now = new Date();
    const data = await getPortfolioData();
    // Same normalizer the public pages use, so the sitemap matches what renders.
    const projects = normalizeProjectsData(data.projects);
    const posts = await getBlogPosts();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${base}/`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${base}/portfolios`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${base}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p, i) => ({
        url: `${base}/projects/${projectSlug(p, i)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
