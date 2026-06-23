import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { ProjectType } from "@/schemas";
import { getPortfolioData } from "@/application/use-cases/content";
import { getSiteUrl, projectSlug, resolveImageUrl } from "@/shared";
import { buildBreadcrumbLd, buildProjectLd } from "@/shared/utils/seo";
import {
    normalizeProjectsData,
    normalizeSectionConfigData,
} from "@/shared/utils/sections";
import { PageChrome } from "@/components";
import { Section } from "@/components/layouts";
import JsonLd from "@/components/seo/JsonLd";
import CaseStudyContent from "@/components/features/career-graph/CaseStudyContent";

// Crawlable, shareable case study (closes PROJECT_GAP_ANALYSIS C2). SSR so the
// problem/architecture/decisions ship in the HTML; the home modal becomes a
// progressive-enhancement "peek" over the same CaseStudyContent.
export const revalidate = 300;

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

const findProject = (
    projects: ProjectType[],
    slug: string
): ProjectType | null =>
    projects.find((p, i) => projectSlug(p, i) === slug) ?? null;

/** Pre-render every published project at build (drafts are already filtered out). */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const data = await getPortfolioData();
    // Use the same mock-fallback normalizer the rest of the site uses, so every
    // project the homepage renders has a matching page (and vice versa).
    return normalizeProjectsData(data.projects).map((p, i) => ({
        slug: projectSlug(p, i),
    }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = await getPortfolioData();
    const project = findProject(normalizeProjectsData(data.projects), slug);
    if (!project) return {};

    const base = getSiteUrl();
    const title = project.metaTitle || `${project.name} — ${data.profile.name}`;
    const description =
        project.metaDescription ||
        project.summary ||
        project.description ||
        undefined;
    const ogImage = resolveImageUrl(
        project.ogImage?.url || project.image?.url,
        base
    );

    return {
        title,
        description,
        alternates: { canonical: `/projects/${slug}` },
        openGraph: {
            type: "article",
            title,
            description,
            url: `${base}/projects/${slug}`,
            images: ogImage
                ? [{ url: ogImage, width: 1200, height: 630, alt: project.name }]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImage ? [ogImage] : [],
        },
    };
}

const ProjectPage = async ({
    params,
}: ProjectPageProps): Promise<React.JSX.Element> => {
    const { slug } = await params;
    const data = await getPortfolioData();
    const project = findProject(normalizeProjectsData(data.projects), slug);
    if (!project) return notFound();

    const base = getSiteUrl();
    const enabledSections = normalizeSectionConfigData(data.settings).filter(
        (section) => section.enabled
    );

    return (
        <PageChrome
            profile={data.profile}
            logo={data.settings.logo}
            enabledSections={enabledSections}
        >
            <JsonLd data={buildProjectLd(project, data.profile, base, slug)} />
            <JsonLd
                data={buildBreadcrumbLd([
                    { name: "Home", url: `${base}/` },
                    { name: "Projects", url: `${base}/portfolios` },
                    {
                        name: project.name,
                        url: `${base}/projects/${slug}`,
                    },
                ])}
            />

            <Section id="project" aria-label={project.name}>
                <nav
                    className="mb-8 font-mono-tnum text-xs text-graph-muted"
                    aria-label="Breadcrumb"
                >
                    <Link href="/" className="hover:underline">
                        home
                    </Link>{" "}
                    <span aria-hidden="true">/</span>{" "}
                    <Link href="/portfolios" className="hover:underline">
                        projects
                    </Link>{" "}
                    <span aria-hidden="true">/</span>{" "}
                    <span className="text-graph-ink">{project.name}</span>
                </nav>

                <article className="mx-auto max-w-3xl">
                    <CaseStudyContent project={project} headingLevel="h1" />
                </article>
            </Section>
        </PageChrome>
    );
};

export default ProjectPage;
