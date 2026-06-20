"use client";

import React from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";

import type { ProjectType } from "@/schemas";

import { Section } from "@/components/layouts";
import { EASE_STANDARD } from "@/components/motion";
import BrowserFrame from "@/components/ui/BrowserFrame";

import CaseStudyPanel from "./CaseStudyPanel";

interface ProjectBentoProps {
    id: string;
    projects: ProjectType[];
}

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE_STANDARD },
    },
};

const slugOf = (p: ProjectType, i: number): string =>
    p.slug || p._id || `project-${i}`;

/**
 * ProjectBento — the visual counterpart to the graph. Where the graph shows how
 * the work connects, the bento shows the work itself: real Sanity screenshots in
 * a shared BrowserFrame, size-by-importance (featured projects go full-width).
 * Duotone at rest -> colour on hover unifies seven different app UIs; selecting a
 * tile opens the same deep case study as the graph nodes.
 */
const ProjectBento: React.FC<ProjectBentoProps> = ({ id, projects }) => {
    const reduce = useReducedMotion();
    const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

    const selectedProject = React.useMemo(
        () =>
            selectedSlug
                ? (projects.find((p, i) => slugOf(p, i) === selectedSlug) ??
                  null)
                : null,
        [selectedSlug, projects]
    );

    if (!projects.length) return null;

    return (
        <Section
            id={id}
            tone="panel"
            eyebrow="Selected work"
            title="Things I've shipped"
            intro="Crawlers, data tools, and AI products — the systems behind the graph. Select one to read how it was built."
            aria-label="Selected projects"
        >
            <m.div
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
                variants={container}
                initial={reduce ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-8%" }}
            >
                {projects.map((p, i) => {
                    const slug = slugOf(p, i);
                    const featured = !!p.featured;
                    const blurb = p.summary || p.description || "";
                    return (
                        <m.article
                            key={p._id || slug}
                            variants={item}
                            className={featured ? "md:col-span-2" : ""}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedSlug(slug)}
                                className="media-hover bento-tile block w-full text-left"
                                aria-label={`Open case study: ${p.name}`}
                            >
                                <BrowserFrame
                                    image={p.image}
                                    alt={`${p.name} screenshot`}
                                    link={p.link}
                                    routeLabel={p.category}
                                    sizes={
                                        featured
                                            ? "(max-width: 768px) 100vw, 1100px"
                                            : "(max-width: 768px) 100vw, 560px"
                                    }
                                    width={featured ? 1400 : 900}
                                />
                                <div className="px-4 pt-3 pb-5">
                                    <div className="mb-1 flex items-center justify-between gap-3">
                                        <span className="eyebrow">
                                            {p.category}
                                        </span>
                                        {p.year && (
                                            <span className="font-mono-tnum text-xs text-[color:var(--graph-muted)]">
                                                {p.year}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-medium">
                                        {p.name}
                                    </h3>
                                    {blurb && (
                                        <p className="measure mt-1 line-clamp-2 text-sm text-[color:var(--graph-muted)]">
                                            {blurb}
                                        </p>
                                    )}
                                    {p.technologies?.length ? (
                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {p.technologies
                                                .slice(0, 5)
                                                .map((t) => (
                                                    <span
                                                        key={t}
                                                        className="font-mono-tnum rounded border px-2 py-0.5 text-[11px] text-[color:var(--graph-muted)]"
                                                        style={{
                                                            borderColor:
                                                                "var(--graph-line)",
                                                        }}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                        </div>
                                    ) : null}
                                </div>
                            </button>
                        </m.article>
                    );
                })}
            </m.div>

            <CaseStudyPanel
                project={selectedProject}
                onClose={() => setSelectedSlug(null)}
            />
        </Section>
    );
};

ProjectBento.displayName = "ProjectBento";

export default ProjectBento;
