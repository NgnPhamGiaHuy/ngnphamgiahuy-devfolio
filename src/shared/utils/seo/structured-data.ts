// ============================================================
// Module: Structured data (JSON-LD) builders
// Purpose: Typed schema.org objects for the site. Keeping them here (not inline
//          in components) makes the markup consistent and unit-reviewable.
//          Rendered via <JsonLd> (components/seo/JsonLd.tsx).
// ============================================================
import type { BlogPostType, ProfileType, ProjectType } from "@/schemas";

import { resolveImageUrl } from "@/shared/utils/image";

type Ld = Record<string, unknown>;

/** Person — the home page's identity graph (name, role, socials, image). */
export const buildPersonLd = (profile: ProfileType, siteUrl: string): Ld => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    jobTitle: profile.job_title,
    ...(profile.description ? { description: profile.description } : {}),
    ...(profile.location
        ? {
              address: {
                  "@type": "PostalAddress",
                  addressLocality: profile.location,
              },
          }
        : {}),
    ...(profile.email ? { email: `mailto:${profile.email}` } : {}),
    ...(profile.profile_image?.url
        ? { image: resolveImageUrl(profile.profile_image.url, siteUrl) }
        : {}),
    ...(profile.social_links?.length
        ? { sameAs: profile.social_links.map((s) => s.url).filter(Boolean) }
        : {}),
});

/** CreativeWork — a single project / case study, attributed to the owner. */
export const buildProjectLd = (
    project: ProjectType,
    profile: ProfileType,
    siteUrl: string,
    slug: string
): Ld => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    url: `${siteUrl}/projects/${slug}`,
    ...(project.summary || project.description
        ? { description: project.summary || project.description }
        : {}),
    ...(project.category ? { genre: project.category } : {}),
    ...(project.year ? { dateCreated: project.year } : {}),
    ...(project.image?.url
        ? { image: resolveImageUrl(project.image.url, siteUrl) }
        : {}),
    ...(project.technologies?.length
        ? { keywords: project.technologies.join(", ") }
        : {}),
    author: { "@type": "Person", name: profile.name, url: siteUrl },
});

/** BlogPosting — a single article, attributed to its author. */
export const buildArticleLd = (
    post: BlogPostType,
    profile: ProfileType,
    siteUrl: string
): Ld => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.coverImage?.url
        ? { image: resolveImageUrl(post.coverImage.url, siteUrl) }
        : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    author: {
        "@type": "Person",
        name: post.author || profile.name,
        url: siteUrl,
    },
});

/** BreadcrumbList — home → projects → this project. */
export const buildBreadcrumbLd = (
    items: { name: string; url: string }[]
): Ld => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.url,
    })),
});
