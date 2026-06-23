"use client";

// ============================================================
// Component: CaseStudyPanel
// Purpose: The in-page modal "peek" at a case study (opened from graph nodes).
//          Owns only the modal chrome — scrim, dialog, focus trap, scroll lock,
//          escape, analytics. The body is the SHARED <CaseStudyContent>, which
//          also powers the standalone /projects/[slug] page (single source).
// ============================================================
import React from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import type { ProjectType } from "@/schemas";

import { AnalyticsEvent, trackEvent } from "@/shared/analytics";
import { EASE_STANDARD } from "@/components/motion";

import CaseStudyContent from "./CaseStudyContent";

interface CaseStudyPanelProps {
    project: ProjectType | null;
    onClose: () => void;
}

const permalinkFor = (project: ProjectType | null): string | undefined => {
    if (!project) return undefined;
    const slug = project.slug || project._id;
    return slug ? `/projects/${slug}` : undefined;
};

const CaseStudyPanel: React.FC<CaseStudyPanelProps> = ({ project, onClose }) => {
    const reduce = useReducedMotion();
    const closeRef = React.useRef<HTMLButtonElement | null>(null);
    const open = !!project;

    // Stable ref to latest onClose so the keydown listener never re-binds.
    const onCloseRef = React.useRef(onClose);
    React.useEffect(() => {
        onCloseRef.current = onClose;
    });

    // Track case-study opens — the key engagement signal (see PROJECT_GAP C3).
    React.useEffect(() => {
        if (project) {
            trackEvent(AnalyticsEvent.CaseStudyOpen, { project: project.name });
        }
    }, [project]);

    React.useEffect(() => {
        if (!open) return;
        // Restore focus to whatever opened the modal (graph node / bento tile).
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
                        className="case-study__dialog p-0 md:p-8"
                        initial={
                            reduce
                                ? { opacity: 0 }
                                : { opacity: 0, scale: 0.96 }
                        }
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
                        onKeyDown={(e) => {
                            if (e.key === "Escape") onCloseRef.current();
                        }}
                    >
                        <div
                            className="case-study__panel relative flex w-full max-w-3xl flex-col rounded-t-2xl md:rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button — outside the scroll area, always reachable */}
                            <div className="flex flex-shrink-0 justify-end px-4 pt-4">
                                <button
                                    ref={closeRef}
                                    onClick={onClose}
                                    aria-label="Close case study"
                                    className="rounded-full p-3 text-graph-muted hover:text-graph-ink focus-visible:outline focus-visible:outline-2"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 md:px-10 md:pb-10">
                                <CaseStudyContent
                                    project={project}
                                    permalink={permalinkFor(project)}
                                />
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
