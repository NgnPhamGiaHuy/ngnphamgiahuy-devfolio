"use client";

import React from "react";
import Image from "next/image";

import type {
    EducationType,
    ExperienceType,
    ProfileType,
    ProjectType,
    SkillType,
} from "@/schemas";

import { buildCareerGraph, resolveImageUrl } from "@/shared/utils";
import { Section } from "@/components/layouts";

import GraphCanvas from "./GraphCanvas";
import CaseStudyPanel from "./CaseStudyPanel";

interface CareerGraphProps {
    id: string;
    profile: ProfileType;
    education?: EducationType[];
    experience?: ExperienceType[];
    skills?: SkillType[];
    projects?: ProjectType[];
}

/**
 * CareerGraph — the COMMIT HISTORY centerpiece. The page opens on a self-
 * building lineage graph whose project nodes open deep case studies. The static
 * SVG ships in SSR HTML and the relationships are mirrored as a screen-reader
 * list, so the section is legible without JS or sight.
 */
const CareerGraph: React.FC<CareerGraphProps> = ({
    id,
    profile,
    education = [],
    experience = [],
    skills = [],
    projects = [],
}) => {
    const graph = React.useMemo(
        () =>
            buildCareerGraph({
                profile,
                education,
                experience,
                skills,
                projects,
            }),
        [profile, education, experience, skills, projects]
    );

    const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

    const selectedProject = React.useMemo(() => {
        if (!selectedSlug) return null;
        return (
            projects.find(
                (p, i) => (p.slug || p._id || `project-${i}`) === selectedSlug
            ) ?? null
        );
    }, [selectedSlug, projects]);

    const portraitUrl = profile.profile_image
        ? resolveImageUrl(profile.profile_image, { width: 280, height: 280 })
        : "";

    return (
        <Section id={id} className="blueprint-grid" aria-label="Career lineage graph">
            <header className="mb-10 flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                    <p className="eyebrow mb-4">
                        {profile.job_title || "Full-Stack & Data Engineer"}
                    </p>
                    <h1 className="display-fluid mb-5">{profile.name}</h1>
                    <p className="measure text-[color:var(--color-body)] text-lg leading-relaxed">
                        {profile.description}
                    </p>

                </div>
                {portraitUrl && (
                    <div className="portrait-block shrink-0">
                        <div className="portrait h-32 w-32 md:h-40 md:w-40">
                            <Image
                                src={portraitUrl}
                                alt={profile.name}
                                width={320}
                                height={320}
                                priority
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <p className="portrait-block__label">{"// author"}</p>
                    </div>
                )}
            </header>

            <GraphCanvas data={graph} onSelectProject={setSelectedSlug} />

            <p className="font-mono-tnum mt-6 text-xs text-[color:var(--graph-muted)]">
                Hover or focus a node to trace its lineage. Select a project to
                open its case study.
            </p>

            {/* Screen-reader relationship model (the graph as text) */}
            <div className="sr-only">
                <h2>Career graph relationships</h2>
                <p>
                    Origin: {profile.name}, an IT graduate. The graph flows from
                    education through skills and roles into projects.
                </p>
                <ul>
                    {projects.map((p, i) => (
                        <li key={p._id || i}>
                            {p.name} ({p.category}).
                            {p.technologies?.length
                                ? ` Uses ${p.technologies.join(", ")}.`
                                : ""}
                            {p.dependsOn?.length
                                ? ` Depends on ${p.dependsOn.join(", ")}.`
                                : ""}
                        </li>
                    ))}
                </ul>
            </div>

            <CaseStudyPanel
                project={selectedProject}
                onClose={() => setSelectedSlug(null)}
            />
        </Section>
    );
};

CareerGraph.displayName = "CareerGraph";

export default CareerGraph;
