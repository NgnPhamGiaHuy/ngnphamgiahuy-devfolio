"use client";

import React from "react";

import type { ProjectType, SkillType } from "@/schemas";

import { Section } from "@/components/layouts";

interface SkillsDependencyProps {
    id: string;
    skills: SkillType[];
    projects?: ProjectType[];
}

/**
 * SkillsDependency — replaces the %-bars entirely. A skill's strength is not a
 * number; it's where it was used. Selecting a skill reveals the projects that
 * prove it (derived from each project's technologies[]). Honest, un-fakeable.
 */
const SkillsDependency: React.FC<SkillsDependencyProps> = ({
    id,
    skills,
    projects = [],
}) => {
    const provenBy = React.useMemo(() => {
        const map = new Map<string, ProjectType[]>();
        skills.forEach((s) => {
            const key = s.name.toLowerCase();
            map.set(
                s.name,
                projects.filter((p) =>
                    (p.technologies ?? []).some((t) => t.toLowerCase() === key)
                )
            );
        });
        return map;
    }, [skills, projects]);

    const grouped = React.useMemo(() => {
        const g = new Map<string, SkillType[]>();
        skills.forEach((s) => {
            const cat = s.category || "Other";
            if (!g.has(cat)) g.set(cat, []);
            g.get(cat)!.push(s);
        });
        return Array.from(g.entries());
    }, [skills]);

    const [active, setActive] = React.useState<string | null>(
        skills[0]?.name ?? null
    );

    const activeProjects = active ? (provenBy.get(active) ?? []) : [];
    const activeSkill = skills.find((s) => s.name === active);

    return (
        <Section
            id={id}
            tone="default"
            eyebrow="Skills"
            title="What each skill actually built"
            intro="Not a percentage — a dependency. Select a skill to see the systems it proves."
            aria-label="Skills as a dependency graph"
        >
            <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
                <div className="space-y-6">
                    {grouped.map(([cat, list]) => (
                        <div key={cat}>
                            <p className="eyebrow mb-3">{cat}</p>
                            <div className="flex flex-wrap gap-2">
                                {list.map((s) => (
                                    <button
                                        key={s._id || s.name}
                                        type="button"
                                        className="skill-chip rounded-full px-4 py-2 text-sm"
                                        data-active={active === s.name}
                                        aria-pressed={active === s.name}
                                        onMouseEnter={() => setActive(s.name)}
                                        onFocus={() => setActive(s.name)}
                                        onClick={() => setActive(s.name)}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--graph-line)" }}
                    aria-live="polite"
                >
                    {activeSkill ? (
                        <>
                            <h3 className="mb-1 text-xl font-medium">
                                {activeSkill.name}
                            </h3>
                            {activeSkill.description && (
                                <p className="measure mb-5 text-sm text-[color:var(--graph-muted)]">
                                    {activeSkill.description}
                                </p>
                            )}
                            <p className="eyebrow mb-3">
                                {activeProjects.length
                                    ? `proven in ${activeProjects.length} project${
                                          activeProjects.length === 1 ? "" : "s"
                                      }`
                                    : "where it's applied"}
                            </p>
                            {activeProjects.length ? (
                                <ul className="space-y-3">
                                    {activeProjects.map((p) => (
                                        <li
                                            key={p._id}
                                            className="border-l-2 pl-3"
                                            style={{
                                                borderColor:
                                                    "var(--graph-accent)",
                                            }}
                                        >
                                            <span className="font-medium">
                                                {p.name}
                                            </span>
                                            <span className="text-[color:var(--graph-muted)]">
                                                {" "}
                                                — {p.category}
                                            </span>
                                            {p.summary && (
                                                <p className="text-sm text-[color:var(--graph-muted)]">
                                                    {p.summary}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-[color:var(--graph-muted)]">
                                    Add this skill to a project&apos;s
                                    technologies to wire it into the graph.
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-[color:var(--graph-muted)]">
                            Select a skill.
                        </p>
                    )}
                </div>
            </div>
        </Section>
    );
};

SkillsDependency.displayName = "SkillsDependency";

export default SkillsDependency;
