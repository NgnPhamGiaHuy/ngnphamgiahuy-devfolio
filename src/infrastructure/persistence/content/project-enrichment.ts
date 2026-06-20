import type { ProjectType } from "@/schemas";

/**
 * ============================================================
 *  PROJECT ENRICHMENT OVERLAY  —  DRAFT, VERIFY & MOVE TO SANITY
 * ============================================================
 *
 * The real Sanity projects predate the deepened case-study schema, so they
 * carry no `technologies[]` (→ the graph can't draw skill→project edges) and no
 * `featured` hierarchy. This overlay fills ONLY missing fields, merged by a
 * name keyword, so the dependency web and the highlight-reel hierarchy light up
 * now. Sanity always wins — once you author these fields in Studio, the overlay
 * is a no-op and can be deleted.
 *
 * IMPORTANT: `technologies[]` MUST match the exact skill `name` strings in
 * Sanity for the edges to draw — currently: "ReactJS & Next.js",
 * "Node.js & Express", "Python", "MongoDB & Firebase", "API Design & Integration".
 * The tech tags below are reasonable inferences from each project's description —
 * correct them to what you actually used.
 */

interface ProjectEnrichment {
    /** lowercase substring matched against project.name */
    match: string;
    technologies?: string[];
    featured?: boolean;
    summary?: string;
}

const PROJECT_ENRICHMENTS: ProjectEnrichment[] = [
    {
        match: "cvgenius",
        featured: true,
        technologies: ["ReactJS & Next.js", "API Design & Integration"],
        summary:
            "AI résumé analyzer — a server-rendered Next.js app with browser-based auth, storage, and LLM feedback.",
    },
    {
        match: "media crawler",
        featured: true,
        technologies: ["Python", "API Design & Integration"],
        summary:
            "A resilient Flask crawler with async workers for safe, sessionized media extraction.",
    },
    {
        match: "mockinter",
        technologies: ["ReactJS & Next.js", "API Design & Integration"],
        summary: "An AI-powered mock-interview platform.",
    },
    {
        match: "topcv",
        technologies: ["Python", "MongoDB & Firebase"],
        summary:
            "Automated Vietnamese job-market intelligence crawled from TopCV.",
    },
    {
        match: "recial",
        technologies: [
            "ReactJS & Next.js",
            "Node.js & Express",
            "MongoDB & Firebase",
        ],
        summary: "A modern full-stack social-media platform.",
    },
    {
        match: "gemini",
        technologies: ["Python", "API Design & Integration"],
        summary:
            "AI-assisted CV enhancement that produces polished LaTeX output.",
    },
    {
        match: "serp",
        technologies: ["Python", "API Design & Integration"],
        summary:
            "Bulk Google Custom Search extraction to clean, structured files.",
    },
];

/** Merge enrichment into projects, only where Sanity left a field empty. */
export const enrichProjects = (projects: ProjectType[]): ProjectType[] =>
    projects.map((p) => {
        const name = (p.name || "").toLowerCase();
        const e = PROJECT_ENRICHMENTS.find((x) => name.includes(x.match));
        if (!e) return p;
        return {
            ...p,
            technologies: p.technologies?.length
                ? p.technologies
                : e.technologies,
            featured: p.featured ?? e.featured,
            summary: p.summary || e.summary,
        };
    });

export default enrichProjects;
