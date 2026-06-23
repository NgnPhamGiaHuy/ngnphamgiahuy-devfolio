"use client";

// ============================================================
// Component: CaseStudyContent
// Purpose: The case-study body (problem → architecture → decisions → outcome),
//          shared by BOTH the in-page modal (CaseStudyPanel) and the standalone
//          crawlable page (app/projects/[slug]). One source of truth so the two
//          surfaces can never drift. Presentational only — no open/close logic.
// ============================================================
import React from "react";
import { m, useReducedMotion } from "framer-motion";

import type { ProjectType } from "@/schemas";

import { EASE_STANDARD } from "@/components/motion";
import BrowserFrame from "@/components/ui/BrowserFrame";

import ArchitectureDiagram from "./ArchitectureDiagram";

const Block: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => (
    <section className="mb-8">
        <h3 className="eyebrow mb-3">{label}</h3>
        {children}
    </section>
);

interface CaseStudyContentProps {
    project: ProjectType;
    /** When set, renders a permalink to the standalone page (used by the modal). */
    permalink?: string;
    /** h2 inside the labelled modal dialog; h1 as the standalone page's title. */
    headingLevel?: "h1" | "h2";
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({
    project,
    permalink,
    headingLevel = "h2",
}) => {
    const reduce = useReducedMotion();
    const Heading = headingLevel;

    return (
        <>
            <header className="mb-8">
                <p className="eyebrow mb-2">
                    {project.category}
                    {project.year ? ` · ${project.year}` : ""}
                </p>
                <Heading
                    id="case-study-title"
                    className="display-fluid case-study-title"
                >
                    {project.name}
                </Heading>
                {project.summary && (
                    <p className="measure mt-3 text-graph-muted">
                        {project.summary}
                    </p>
                )}
            </header>

            {project.image?.url && (
                <m.div
                    className="mb-8"
                    initial={
                        reduce
                            ? { opacity: 0 }
                            : {
                                  opacity: 0,
                                  clipPath: "inset(0 0 100% 0 round 12px)",
                              }
                    }
                    animate={{
                        opacity: 1,
                        clipPath: "inset(0 0 0% 0 round 12px)",
                    }}
                    transition={{
                        duration: reduce ? 0 : 0.5,
                        ease: EASE_STANDARD,
                        delay: reduce ? 0 : 0.05,
                    }}
                >
                    <BrowserFrame
                        image={project.image.url}
                        alt={`${project.name} screenshot`}
                        link={project.link}
                        tone="color"
                        sizes="(max-width: 768px) 100vw, 720px"
                        width={1280}
                    />
                </m.div>
            )}

            {!project.problem && project.description && (
                <Block label="Overview">
                    <p className="measure">{project.description}</p>
                </Block>
            )}

            {project.problem && (
                <Block label="Problem">
                    <p className="measure">{project.problem}</p>
                </Block>
            )}

            {project.constraints?.length ? (
                <Block label="Constraints">
                    <ul className="measure list-disc space-y-1 pl-5">
                        {project.constraints.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>
                </Block>
            ) : null}

            {project.architecture?.nodes?.length ? (
                <Block label="Architecture">
                    <ArchitectureDiagram
                        nodes={project.architecture.nodes}
                        edges={project.architecture.edges}
                    />
                </Block>
            ) : null}

            {project.decisions?.length ? (
                <Block label="Decisions & trade-offs">
                    <div className="space-y-5">
                        {project.decisions.map((d, i) => (
                            <div
                                key={i}
                                className="decision-item border-l-2 pl-4"
                            >
                                <p className="font-medium">{d.decision}</p>
                                {d.alternative && (
                                    <p className="mt-1 text-sm text-graph-muted">
                                        <span className="font-mono-tnum">
                                            alt:
                                        </span>{" "}
                                        {d.alternative}
                                    </p>
                                )}
                                {d.whyRejected && (
                                    <p className="mt-1 text-sm text-graph-muted">
                                        <span className="font-mono-tnum">
                                            rejected:
                                        </span>{" "}
                                        {d.whyRejected}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </Block>
            ) : null}

            {project.outcome?.metrics?.length || project.outcome?.summary ? (
                <Block label="Outcome">
                    {project.outcome.summary && (
                        <p className="measure mb-4">{project.outcome.summary}</p>
                    )}
                    {project.outcome.metrics?.length ? (
                        <div className="flex flex-wrap gap-6">
                            {project.outcome.metrics.map((metric, i) => (
                                <div key={i}>
                                    <div className="metric-value font-mono-tnum text-2xl">
                                        {metric.value}
                                    </div>
                                    <div className="text-xs text-graph-muted">
                                        {metric.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </Block>
            ) : null}

            <footer className="case-study__footer mt-8 flex flex-wrap items-center gap-4 border-t pt-5">
                {project.scale && (
                    <span className="font-mono-tnum text-xs text-graph-muted">
                        scale: {project.scale}
                    </span>
                )}
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link font-mono-tnum text-xs underline"
                    >
                        view project ↗
                    </a>
                )}
                {permalink && (
                    <a
                        href={permalink}
                        className="project-link font-mono-tnum text-xs underline"
                    >
                        full case study ↗
                    </a>
                )}
            </footer>
        </>
    );
};

CaseStudyContent.displayName = "CaseStudyContent";

export default CaseStudyContent;
