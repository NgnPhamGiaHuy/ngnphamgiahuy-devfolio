"use client";

import React from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import type { ProjectType } from "@/schemas";

import { EASE_STANDARD } from "@/components/motion";
import BrowserFrame from "@/components/ui/BrowserFrame";

import ArchitectureDiagram from "./ArchitectureDiagram";

interface CaseStudyPanelProps {
    project: ProjectType | null;
    onClose: () => void;
    /**
     * Optional: open scrolled to (and briefly highlighting) this decision in the
     * Decisions list. Undefined = open at the top (problem-first reading order).
     */
    focusDecisionIndex?: number;
}

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => (
    <section className="mb-8">
        <h3 className="eyebrow mb-3">{label}</h3>
        {children}
    </section>
);

const CaseStudyPanel: React.FC<CaseStudyPanelProps> = ({
    project,
    onClose,
    focusDecisionIndex,
}) => {
    const reduce = useReducedMotion();
    const closeRef = React.useRef<HTMLButtonElement | null>(null);
    const decisionRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const [litDecision, setLitDecision] = React.useState<number | null>(null);
    const open = !!project;

    // Keep a stable ref to the latest onClose so the keydown listener never
    // needs to be torn down and re-added just because the parent re-rendered.
    const onCloseRef = React.useRef(onClose);
    React.useEffect(() => {
        onCloseRef.current = onClose;
    });

    // Deep-link to a specific decision (additive). Runs after the open effect so
    // it isn't undone by the close-button focus; no-op when no index is given.
    React.useEffect(() => {
        if (!open || focusDecisionIndex == null) return;
        const el = decisionRefs.current[focusDecisionIndex];
        if (!el) return;
        const t = window.setTimeout(() => {
            el.scrollIntoView({
                behavior: reduce ? "auto" : "smooth",
                block: "center",
            });
            setLitDecision(focusDecisionIndex);
        }, 60);
        const clear = window.setTimeout(() => setLitDecision(null), 1600);
        return () => {
            window.clearTimeout(t);
            window.clearTimeout(clear);
        };
    }, [open, focusDecisionIndex, reduce]);

    React.useEffect(() => {
        if (!open) return;
        // Restore focus to whatever opened the modal (the graph node / bento tile)
        const trigger = document.activeElement as HTMLElement | null;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCloseRef.current();
        };
        document.addEventListener("keydown", onKey);
        closeRef.current?.focus();
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener("keydown", onKey);
            trigger?.focus?.();
        };
    }, [open]);

    return (
        <AnimatePresence>
            {project && (
                <>
                    <m.div
                        className="case-study__scrim"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.2 }}
                        onClick={onClose}
                        aria-hidden="true"
                    />
                    <m.div
                        className="case-study__dialog p-4 md:p-8"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                        transition={{
                            duration: reduce ? 0 : 0.32,
                            ease: EASE_STANDARD,
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="case-study-title"
                        onClick={onClose}
                        onKeyDown={(e) => { if (e.key === "Escape") onCloseRef.current(); }}
                    >
                        <div
                            className="case-study__panel relative flex w-full max-w-3xl flex-col rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button — outside the scroll area so it's always reachable */}
                            <div className="flex flex-shrink-0 justify-end px-4 pt-4">
                                <button
                                    ref={closeRef}
                                    onClick={onClose}
                                    aria-label="Close case study"
                                    className="rounded-full p-2 text-graph-muted hover:text-graph-ink focus-visible:outline focus-visible:outline-2"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable content — flex-1 + min-h-0 allow overflow-y-auto to activate */}
                            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 md:px-10 md:pb-10">

                            <header className="mb-8">
                                <p className="eyebrow mb-2">
                                    {project.category}
                                    {project.year ? ` · ${project.year}` : ""}
                                </p>
                                <h2
                                    id="case-study-title"
                                    className="display-fluid case-study-title"
                                >
                                    {project.name}
                                </h2>
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
                                                  clipPath:
                                                      "inset(0 0 100% 0 round 12px)",
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
                                <Section label="Overview">
                                    <p className="measure">
                                        {project.description}
                                    </p>
                                </Section>
                            )}

                            {project.problem && (
                                <Section label="Problem">
                                    <p className="measure">{project.problem}</p>
                                </Section>
                            )}

                            {project.constraints?.length ? (
                                <Section label="Constraints">
                                    <ul className="measure list-disc space-y-1 pl-5">
                                        {project.constraints.map((c, i) => (
                                            <li key={i}>{c}</li>
                                        ))}
                                    </ul>
                                </Section>
                            ) : null}

                            {project.architecture?.nodes?.length ? (
                                <Section label="Architecture">
                                    <ArchitectureDiagram
                                        nodes={project.architecture.nodes}
                                        edges={project.architecture.edges}
                                    />
                                </Section>
                            ) : null}

                            {project.decisions?.length ? (
                                <Section label="Decisions & trade-offs">
                                    <div className="space-y-5">
                                        {project.decisions.map((d, i) => (
                                            <div
                                                key={i}
                                                ref={(el) => {
                                                    decisionRefs.current[i] = el;
                                                }}
                                                className="decision-item border-l-2 pl-4"
                                                data-lit={litDecision === i ? "true" : undefined}
                                            >
                                                <p className="font-medium">
                                                    {d.decision}
                                                </p>
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
                                </Section>
                            ) : null}

                            {project.outcome?.metrics?.length ||
                            project.outcome?.summary ? (
                                <Section label="Outcome">
                                    {project.outcome.summary && (
                                        <p className="measure mb-4">
                                            {project.outcome.summary}
                                        </p>
                                    )}
                                    {project.outcome.metrics?.length ? (
                                        <div className="flex flex-wrap gap-6">
                                            {project.outcome.metrics.map(
                                                (m, i) => (
                                                    <div key={i}>
                                                        <div
                                                            className="metric-value font-mono-tnum text-2xl"
                                                        >
                                                            {m.value}
                                                        </div>
                                                        <div className="text-xs text-graph-muted">
                                                            {m.label}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : null}
                                </Section>
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
                            </footer>
                            </div>
                        </div>
                    </m.div>
                </>
            )}
        </AnimatePresence>
    );
};

CaseStudyPanel.displayName = "CaseStudyPanel";

export default CaseStudyPanel;
