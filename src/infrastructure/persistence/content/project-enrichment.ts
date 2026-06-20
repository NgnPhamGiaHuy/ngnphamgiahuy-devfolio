import type {
    ProjectDecision,
    ProjectType,
} from "@/schemas";

/**
 * ============================================================
 *  PROJECT ENRICHMENT OVERLAY  —  DRAFT, VERIFY & MOVE TO SANITY
 * ============================================================
 *
 * The real Sanity projects predate the deepened case-study schema, so they
 * carry no `technologies[]`, no `featured` hierarchy, and none of the depth
 * fields (problem / decisions / outcome / dependsOn) that the COMMIT HISTORY
 * graph, the Build Log lineage, and the case-study panel render. This overlay
 * fills ONLY missing fields, merged by a name keyword, so those surfaces light
 * up now. Sanity ALWAYS wins — once you author these fields in Studio, the
 * overlay is a no-op and can be deleted.
 *
 * ⚠️  EVERYTHING BELOW IS A DRAFT INFERENCE — VERIFY BEFORE PUBLISHING. ⚠️
 *  - `technologies[]` MUST match the exact skill `name` strings in Sanity for
 *    the edges to draw: "ReactJS & Next.js", "Node.js & Express", "Python",
 *    "MongoDB & Firebase", "API Design & Integration".
 *  - `dependsOnMatch` is the INTER-PROJECT LINEAGE (the owner's #1 signal). It is
 *    expressed as name-substrings of the UPSTREAM projects and resolved to their
 *    real slugs at merge time (so it survives whatever the live slugs are). The
 *    chain below (TopCV → CVGenius → Gemini) is a *plausible inference* from the
 *    project descriptions — REPLACE IT with the relationships that are literally
 *    true. Remove any edge that two systems did not genuinely share.
 *  - `decisions` / `outcome` carry honest, early-career-scoped drafts. Rewrite
 *    them in your own words and with real numbers where you have them; the
 *    Build Log and panel render exactly what is here, so a wrong claim ships.
 */

interface ProjectEnrichment {
    /** lowercase substring matched against project.name */
    match: string;
    technologies?: string[];
    featured?: boolean;
    summary?: string;
    /** Name-substrings of UPSTREAM projects this one builds on (resolved to slugs). */
    dependsOnMatch?: string[];
    problem?: string;
    constraints?: string[];
    decisions?: ProjectDecision[];
    outcome?: ProjectType["outcome"];
    scale?: string;
}

const PROJECT_ENRICHMENTS: ProjectEnrichment[] = [
    {
        match: "cvgenius",
        featured: true,
        technologies: ["ReactJS & Next.js", "API Design & Integration"],
        summary:
            "AI résumé analyzer — a server-rendered Next.js app with browser-based auth, storage, and LLM feedback.",
        // DRAFT lineage: résumé analysis grounded on job-market signals from the crawler.
        dependsOnMatch: ["topcv"],
        problem:
            "Generic résumé advice is useless; feedback has to be specific to the target role and the live job market, not vague tips.",
        decisions: [
            {
                decision:
                    "Ground the model on the parsed résumé + role signals rather than free-form prompting.",
                alternative: "Send the raw résumé text straight to the model.",
                whyRejected:
                    "Raw prompting produced generic, sometimes hallucinated advice; grounding on structured fields kept suggestions specific.",
            },
        ],
        outcome: {
            summary: "Role-specific, actionable résumé feedback in one pass.",
            metrics: [{ label: "feedback", value: "role-targeted" }],
        },
        scale: "Interactive, single-résumé analysis",
    },
    {
        match: "media crawler",
        featured: true,
        technologies: ["Python", "API Design & Integration"],
        summary:
            "A resilient Flask crawler with async workers for safe, sessionized media extraction.",
        problem:
            "Media is scattered across sites with different structures, rate limits, and failure modes; collecting it reliably without re-fetching or getting banned is the hard part.",
        decisions: [
            {
                decision:
                    "Session-scoped async workers with resumable, deduplicated fetches.",
                alternative: "A simple sequential loop over URLs.",
                whyRejected:
                    "A loop couldn't resume mid-run or dedupe, so any crash meant re-fetching everything and risking bans.",
            },
        ],
        outcome: {
            summary: "Runs unattended and extracts media safely per session.",
            metrics: [{ label: "extraction", value: "sessionized, resumable" }],
        },
        scale: "Continuous, per-session media extraction",
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
        problem:
            "Job-market data is spread across listings that change and rate-limit; tracking demand over time needs dependable, repeatable collection.",
        decisions: [
            {
                decision:
                    "Scheduled, resumable crawls keyed by posting ID so a failure doesn't re-fetch or double-count.",
                alternative: "A one-off scrape script run by hand.",
                whyRejected:
                    "A manual scrape couldn't resume or dedupe, so any failure meant restarting and risking bans.",
            },
        ],
        outcome: {
            summary: "Continuous, deduplicated job-market signal over time.",
            metrics: [{ label: "ingestion", value: "continuous, resumable" }],
        },
        scale: "Ongoing Vietnamese job-market ingestion",
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
        // DRAFT lineage: enhancement follows the analysis step.
        dependsOnMatch: ["cvgenius"],
        problem:
            "Turning analyzed résumé content into a clean, consistent document by hand is slow and error-prone.",
        decisions: [
            {
                decision:
                    "Generate from a fixed LaTeX template the model fills, rather than letting it emit raw LaTeX.",
                alternative: "Let the model output LaTeX freely.",
                whyRejected:
                    "Free-form LaTeX frequently failed to compile; a constrained template stays compile-ready.",
            },
        ],
        outcome: {
            summary: "Produces compile-ready, consistent LaTeX CVs.",
            metrics: [{ label: "output", value: "compile-ready LaTeX" }],
        },
        scale: "Interactive, single-CV enhancement",
    },
    {
        match: "serp",
        technologies: ["Python", "API Design & Integration"],
        summary:
            "Bulk Google Custom Search extraction to clean, structured files.",
    },
];

/** Merge enrichment into projects, only where Sanity left a field empty. */
export const enrichProjects = (projects: ProjectType[]): ProjectType[] => {
    // Build a name → ref index so dependsOnMatch (names) resolves to the same
    // ref the graph/Build Log use for a target (p.slug || p._id).
    const refOf = (p: ProjectType): string => p.slug || p._id || "";
    const nameRefs = projects.map((p) => ({
        name: (p.name || "").toLowerCase(),
        ref: refOf(p),
    }));
    const resolveMatches = (matches: string[]): string[] =>
        matches
            .map((m) => nameRefs.find((x) => x.name.includes(m))?.ref)
            .filter((r): r is string => !!r);

    return projects.map((p) => {
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
            problem: p.problem || e.problem,
            constraints: p.constraints?.length ? p.constraints : e.constraints,
            decisions: p.decisions?.length ? p.decisions : e.decisions,
            outcome: p.outcome ?? e.outcome,
            scale: p.scale || e.scale,
            dependsOn: p.dependsOn?.length
                ? p.dependsOn
                : e.dependsOnMatch
                  ? resolveMatches(e.dependsOnMatch)
                  : p.dependsOn,
        };
    });
};

export default enrichProjects;
