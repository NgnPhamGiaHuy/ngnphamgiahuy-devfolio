"use client";

import React from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";

import type { ProjectType } from "@/schemas";

import { Section } from "@/components/layouts";
import { EASE_STANDARD } from "@/components/motion";

import CaseStudyPanel from "./CaseStudyPanel";

interface ProjectBentoProps {
    id: string;
    projects: ProjectType[];
}

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};
const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE_STANDARD },
    },
};

const slugOf = (p: ProjectType, i: number): string =>
    p.slug || p._id || `project-${i}`;

// Metrics that mimic the form of proof without substance — render nothing rather
// than a vanity placeholder (per the audit: "multiple" read as a hard number).
const VAGUE_METRIC = new Set([
    "multiple",
    "many",
    "several",
    "various",
    "lots",
    "numerous",
    "some",
    "a few",
    "n/a",
]);
const isHonestMetric = (value?: string): boolean =>
    !!value && !VAGUE_METRIC.has(value.trim().toLowerCase());

const trimDot = (s: string): string => s.replace(/\s*\.\s*$/, "").trim();
// Reads mid-sentence after "chose" / "over" — lowercase the lead unless it's an
// acronym/proper noun (two leading capitals, e.g. "ELT", "LaTeX").
const phrase = (s: string): string => {
    const t = trimDot(s);
    return /^[A-Z][A-Z]/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1);
};

interface Indexed {
    p: ProjectType;
    i: number;
    ref: string;
}

/**
 * ProjectBento — "The Build Log".
 *
 * Selected Work as a numbered chapter index, not a card gallery. Projects that
 * build on each other (dependsOn[]) render in pipeline order on a dark-navy band
 * — reading top-to-bottom IS walking the data flow; the rest fall to a quiet
 * "Also shipped" coda on cream. Each row surfaces the COMMIT HISTORY story BEFORE
 * a click: one problem line, one honest metric, a plain-text lineage ref
 * (feeds → / builds on ←), and a trade-off teaser ("chose X over Y"). Every slot
 * hides when its field is absent, so the section improves on the old gallery even
 * before the depth content is authored, and the same row opens the same deep
 * CaseStudyPanel the graph nodes do (dual-encoding: graph wins relationships,
 * this list wins item-finding).
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

    const { lineage, also, single } = React.useMemo(() => {
        const indexed: Indexed[] = projects.map((p, i) => ({
            p,
            i,
            ref: slugOf(p, i),
        }));
        const byRef = new Map(indexed.map((x) => [x.ref, x.p]));

        // ref -> downstream refs (what this project feeds)
        const childrenOf = new Map<string, string[]>();
        indexed.forEach(({ p, ref }) => {
            (p.dependsOn ?? []).forEach((dep) => {
                if (!childrenOf.has(dep)) childrenOf.set(dep, []);
                childrenOf.get(dep)!.push(ref);
            });
        });

        const connected = ({ p, ref }: Indexed): boolean =>
            (p.dependsOn?.length ?? 0) > 0 ||
            (childrenOf.get(ref)?.length ?? 0) > 0;

        // Longest path from a root — cycle-safe via a per-walk visited set.
        const cache = new Map<string, number>();
        const depth = (ref: string, seen: Set<string>): number => {
            if (cache.has(ref)) return cache.get(ref)!;
            if (seen.has(ref)) return 0; // cycle guard
            seen.add(ref);
            const parents = (byRef.get(ref)?.dependsOn ?? []).filter((d) =>
                byRef.has(d)
            );
            const d = parents.length
                ? 1 + Math.max(...parents.map((par) => depth(par, seen)))
                : 0;
            seen.delete(ref);
            cache.set(ref, d);
            return d;
        };

        const ord = (a: Indexed, b: Indexed): number =>
            (a.p.order ?? a.i) - (b.p.order ?? b.i);
        const featuredFirst = (a: Indexed, b: Indexed): number =>
            Number(!!b.p.featured) - Number(!!a.p.featured) || ord(a, b);

        const lineage = indexed
            .filter(connected)
            .sort(
                (a, b) => depth(a.ref, new Set()) - depth(b.ref, new Set()) || ord(a, b)
            );
        const also = indexed.filter((x) => !connected(x)).sort(featuredFirst);

        return {
            lineage,
            also,
            // No authored lineage yet → one cream list, no empty dark slab.
            single: lineage.length ? null : [...indexed].sort(featuredFirst),
        };
    }, [projects]);

    const nameOfRef = React.useCallback(
        (ref: string): string | undefined =>
            projects.find((p, i) => slugOf(p, i) === ref)?.name,
        [projects]
    );
    const feedsOf = React.useCallback(
        (ref: string): string[] => {
            const out: string[] = [];
            projects.forEach((p) => {
                if ((p.dependsOn ?? []).includes(ref)) {
                    const n = p.name;
                    if (n) out.push(n);
                }
            });
            return out;
        },
        [projects]
    );

    if (!projects.length) return null;

    const renderRow = (
        { p, i, ref }: Indexed,
        step: number,
        compact: boolean
    ) => {
        const slug = slugOf(p, i);
        const metric = p.outcome?.metrics?.find((m) => isHonestMetric(m.value));
        const buildsOn = (p.dependsOn ?? [])
            .map((d) => nameOfRef(d))
            .filter((n): n is string => !!n);
        const feeds = feedsOf(ref);
        const decision = p.decisions?.[0];
        const problem = p.problem || p.summary || p.description || "";

        return (
            <m.li key={p._id || slug} variants={item}>
                <button
                    type="button"
                    onClick={() => setSelectedSlug(slug)}
                    className="build-log__row group"
                    aria-label={`Open case study: ${p.name}`}
                >
                    <div className="flex items-baseline gap-4 md:gap-6">
                        <span className="build-log__step text-sm">
                            {String(step).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h3 className="text-lg font-medium md:text-xl">
                                    {p.name}
                                </h3>
                                <span className="font-mono-tnum text-xs text-graph-muted">
                                    {p.category}
                                    {p.year ? ` · ${p.year}` : ""}
                                </span>
                            </div>

                            {!compact && problem && (
                                <p className="measure mt-1.5 line-clamp-2 text-sm text-graph-muted">
                                    {problem}
                                </p>
                            )}

                            {(!!metric ||
                                buildsOn.length > 0 ||
                                feeds.length > 0) && (
                                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                                    {metric && (
                                        <span className="lineage-pill">
                                            <span className="font-mono-tnum text-graph-accent">
                                                {metric.value}
                                            </span>
                                            <span>{metric.label}</span>
                                        </span>
                                    )}
                                    {buildsOn.map((n) => (
                                        <span key={`b-${n}`} className="lineage-pill">
                                            builds on{" "}
                                            <span
                                                className="lineage-pill__ref"
                                                style={
                                                    {
                                                        ["--pill-origin" as string]:
                                                            "right",
                                                    } as React.CSSProperties
                                                }
                                            >
                                                ← {n}
                                            </span>
                                        </span>
                                    ))}
                                    {feeds.map((n) => (
                                        <span key={`f-${n}`} className="lineage-pill">
                                            feeds{" "}
                                            <span
                                                className="lineage-pill__ref"
                                                style={
                                                    {
                                                        ["--pill-origin" as string]:
                                                            "left",
                                                    } as React.CSSProperties
                                                }
                                            >
                                                → {n}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            )}

                            {!compact && decision && (
                                <p className="build-log__teaser measure mt-3 text-sm">
                                    <span className="text-graph-ink">
                                        chose {phrase(decision.decision)}
                                    </span>
                                    {decision.alternative && (
                                        <span className="text-graph-muted">
                                            {" "}
                                            over {phrase(decision.alternative)}
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                </button>
            </m.li>
        );
    };

    const list = (items: Indexed[], compact: boolean) => (
        <m.ol
            className="build-log"
            variants={container}
            initial={reduce ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
        >
            {items.map((it, idx) => renderRow(it, idx + 1, compact))}
        </m.ol>
    );

    return (
        <>
            {single ? (
                <Section
                    id={id}
                    tone="panel"
                    eyebrow="Selected work"
                    title="The Build Log"
                    intro="The systems I've shipped — problem, the call I made, and what it connects to. Select one to read how it was built."
                    aria-label="Selected projects"
                >
                    {list(single, false)}
                </Section>
            ) : (
                <>
                    <Section
                        id={id}
                        tone="dark"
                        eyebrow="Selected work"
                        title="The Build Log"
                        intro="The systems I've shipped, in the order they built on each other — problem, the call I made, and what it connects to. Select one to read how it was built."
                        aria-label="Selected projects"
                    >
                        {list(lineage, false)}
                    </Section>
                    {also.length > 0 && (
                        <Section
                            tone="default"
                            eyebrow="Also shipped"
                            aria-label="Other projects"
                        >
                            {list(also, true)}
                        </Section>
                    )}
                </>
            )}

            <CaseStudyPanel
                project={selectedProject}
                onClose={() => setSelectedSlug(null)}
            />
        </>
    );
};

ProjectBento.displayName = "ProjectBento";

export default ProjectBento;
