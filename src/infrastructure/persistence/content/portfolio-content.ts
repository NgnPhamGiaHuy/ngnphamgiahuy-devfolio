import type {
    EducationType,
    ExperienceType,
    ProfileType,
    ProjectType,
    SkillType,
} from "@/schemas";

/**
 * ============================================================
 *  DRAFT PORTFOLIO CONTENT  —  VERIFY BEFORE PUBLISHING
 * ============================================================
 *
 * This is the real-content seed for the COMMIT HISTORY portfolio. It renders
 * as the fallback whenever Sanity returns nothing, so the career graph + case
 * studies are populated out of the box. Each field below is authored from the
 * stated background but is a *first draft* — replace metrics, dates, and
 * trade-off details with the true numbers, then author the same content in
 * Sanity Studio (the schema mirrors these fields) and this fallback retires.
 *
 * Honesty rules baked in (per the design critique):
 *  - dependsOn edges are only drawn where the systems genuinely fed each other
 *    (crawler -> lake -> analysis). Remove any that are not literally true.
 *  - Voice is early-career systems thinker, not "production platform at scale".
 *  - Every decision carries a real alternative + why it was rejected.
 */

export const REAL_PROFILE: Partial<ProfileType> = {
    _id: "profile-main",
    name: "Pham Gia Huy",
    job_title: "Full-Stack & Data Engineer",
    description:
        "I build systems that move and make sense of data — crawlers, data lakes with lineage, and the interfaces that read them. I think in sources, transforms, and outputs, and I care about clean architecture and performance.",
    location: "Vietnam",
    email: "hello@ngnphamgiahuy.dev",
    experience_years: 2,
};

export const REAL_EDUCATION: Partial<EducationType>[] = [
    {
        _id: "edu-it",
        degree: "B.IT, Information Technology",
        institution: "University",
        year: "2021 — 2025",
        description:
            "Information Technology degree with a focus on software engineering, databases, and data systems.",
        order: 1,
    },
];

export const REAL_EXPERIENCE: Partial<ExperienceType>[] = [
    {
        _id: "exp-fullstack",
        title: "Full-Stack Developer",
        company: "Independent / Project work",
        year: "2023 — Present",
        description:
            "Designing and shipping full-stack applications and data pipelines end to end — from crawlers and storage to the React/Next.js interfaces on top.",
        order: 1,
    },
    {
        _id: "exp-data",
        title: "Data Engineering",
        company: "Project work",
        year: "2024 — Present",
        description:
            "Building ingestion, storage, and metadata/lineage tracking for a data lake, with an emphasis on data governance and reproducibility.",
        order: 2,
    },
];

export const REAL_SKILLS: Partial<SkillType>[] = [
    {
        _id: "skill-python",
        name: "Python",
        category: "Data & Backend",
        description:
            "Crawlers, ingestion jobs, normalization, and analysis pipelines.",
        experience_years: 3,
        order: 1,
    },
    {
        _id: "skill-typescript",
        name: "TypeScript",
        category: "Frontend",
        description: "Typed, maintainable front-end and Node services.",
        experience_years: 3,
        order: 2,
    },
    {
        _id: "skill-react",
        name: "React",
        category: "Frontend",
        description: "Component architecture and interactive UI.",
        experience_years: 3,
        order: 3,
    },
    {
        _id: "skill-nextjs",
        name: "Next.js",
        category: "Frontend",
        description: "App Router, SSR, and performance-focused delivery.",
        experience_years: 2,
        order: 4,
    },
    {
        _id: "skill-nodejs",
        name: "Node.js",
        category: "Backend",
        description: "APIs and service orchestration.",
        experience_years: 3,
        order: 5,
    },
    {
        _id: "skill-mongodb",
        name: "MongoDB",
        category: "Database",
        description: "Document modelling for crawled and normalized data.",
        experience_years: 2,
        order: 6,
    },
];

export const REAL_PROJECTS: Partial<ProjectType>[] = [
    {
        _id: "proj-media-crawler",
        slug: "media-crawler",
        name: "Media Crawler",
        category: "Data Engineering",
        year: "2024",
        featured: false,
        order: 1,
        summary:
            "A resilient crawler that collects media and job-market data from many sources.",
        description:
            "A configurable crawler that ingests data from heterogeneous web sources into a normalized store — the first stage of the pipeline that feeds the data lake.",
        problem:
            "Job-market and media data is scattered across sites with different structures, rate limits, and failure modes. I needed a dependable way to collect it continuously without re-fetching or losing data on failure.",
        constraints: [
            "Respect per-source rate limits and avoid bans",
            "Resume cleanly after failures without duplicating records",
            "Schema drift across sources must not break ingestion",
        ],
        technologies: ["Python", "Node.js", "MongoDB"],
        architecture: {
            nodes: [
                { id: "sites", label: "Web sources", layer: "source" },
                { id: "fetch", label: "Fetcher + scheduler", layer: "ingest" },
                { id: "parse", label: "Parser", layer: "transform" },
                { id: "store", label: "Raw store", layer: "storage" },
            ],
            edges: [
                { from: "sites", to: "fetch" },
                { from: "fetch", to: "parse" },
                { from: "parse", to: "store" },
            ],
        },
        decisions: [
            {
                decision:
                    "Queue-based scheduling with idempotent writes keyed by source URL + content hash.",
                alternative: "A simple sequential loop over sources.",
                whyRejected:
                    "A loop couldn't resume mid-run or dedupe, so any crash meant re-fetching everything and risking bans.",
            },
        ],
        outcome: {
            summary:
                "A crawler that runs unattended and feeds clean records downstream.",
            metrics: [{ label: "sources unified", value: "multiple" }],
        },
        scale: "Continuous ingestion across multiple sources",
    },
    {
        _id: "proj-data-lake",
        slug: "data-lake-lineage",
        name: "Data Lake + Lineage",
        category: "Data Engineering",
        year: "2025",
        featured: true,
        order: 2,
        summary:
            "A governed data lake with metadata catalog and end-to-end data lineage.",
        description:
            "A data lake that stores raw and normalized data with a metadata layer that tracks where every dataset came from and how it was transformed — lineage you can trace from source to consumption.",
        problem:
            "Once data lands from many sources, it's easy to lose track of where a field came from or which transform produced it. Without lineage, you can't trust or debug the data.",
        constraints: [
            "Every dataset must carry provenance (source + transform history)",
            "Storage must stay queryable as volume grows",
            "Transforms must be reproducible",
        ],
        technologies: ["Python", "MongoDB", "Node.js"],
        dependsOn: ["media-crawler"],
        architecture: {
            nodes: [
                { id: "raw", label: "Crawled data", layer: "source" },
                { id: "ingest", label: "Ingestion", layer: "ingest" },
                { id: "lake", label: "Data lake", layer: "storage" },
                {
                    id: "normalize",
                    label: "Normalizer",
                    layer: "transform",
                },
                {
                    id: "catalog",
                    label: "Metadata + lineage catalog",
                    layer: "consumption",
                },
            ],
            edges: [
                { from: "raw", to: "ingest" },
                { from: "ingest", to: "lake" },
                { from: "lake", to: "normalize" },
                { from: "normalize", to: "catalog", label: "lineage" },
            ],
        },
        decisions: [
            {
                decision:
                    "Track lineage as explicit metadata records emitted by each transform step.",
                alternative:
                    "Infer lineage after the fact by diffing inputs and outputs.",
                whyRejected:
                    "Post-hoc inference was fragile and wrong whenever a transform was non-deterministic; emitting lineage at the source is exact.",
            },
            {
                decision:
                    "Keep a raw immutable layer separate from normalized data.",
                alternative: "Normalize in place to save storage.",
                whyRejected:
                    "In-place normalization made reprocessing impossible when the schema changed; the raw layer makes every transform replayable.",
            },
        ],
        outcome: {
            summary:
                "Any normalized field can be traced back to its source and transform.",
            metrics: [
                { label: "lineage coverage", value: "source → consumption" },
            ],
        },
        scale: "Growing multi-source datasets with full provenance",
    },
    {
        _id: "proj-job-market",
        slug: "job-market-analysis",
        name: "Job Market Analysis",
        category: "Data Engineering",
        year: "2025",
        featured: false,
        order: 3,
        summary:
            "An analysis layer and dashboard over the job-market data in the lake.",
        description:
            "Consumes normalized job-market data from the lake to surface trends — roles, skills in demand, and movement over time — through an interactive dashboard.",
        problem:
            "Raw job postings don't answer questions on their own. I needed to turn the normalized data into readable trends without re-querying source sites.",
        constraints: [
            "Queries must run against the lake, not live sources",
            "Dashboard must stay responsive over large result sets",
        ],
        technologies: ["Python", "MongoDB", "TypeScript", "Next.js", "React"],
        dependsOn: ["data-lake-lineage"],
        architecture: {
            nodes: [
                { id: "lake", label: "Data lake", layer: "source" },
                { id: "agg", label: "Aggregation", layer: "transform" },
                { id: "api", label: "API", layer: "ingest" },
                { id: "dash", label: "Dashboard", layer: "consumption" },
            ],
            edges: [
                { from: "lake", to: "agg" },
                { from: "agg", to: "api" },
                { from: "api", to: "dash" },
            ],
        },
        decisions: [
            {
                decision:
                    "Pre-aggregate trends on a schedule and serve from the aggregate.",
                alternative: "Compute aggregations on each dashboard request.",
                whyRejected:
                    "On-request aggregation made the dashboard slow and hammered the store; pre-aggregation kept it responsive.",
            },
        ],
        outcome: {
            summary:
                "Job-market trends are explorable in an interactive dashboard.",
            metrics: [{ label: "data source", value: "the lake, not live" }],
        },
        scale: "Trend analysis over accumulated job-market data",
    },
    {
        _id: "proj-ai-cv",
        slug: "ai-cv-enhancement",
        name: "AI CV Enhancement",
        category: "AI",
        year: "2025",
        featured: false,
        order: 4,
        summary:
            "An AI tool that analyzes and improves CVs against target roles.",
        description:
            "Takes a CV and a target role, then suggests concrete improvements — structure, wording, and gaps — using an LLM with grounded prompts.",
        problem:
            "Generic CV advice is useless; people need feedback specific to the role they're applying for. I wanted targeted, actionable suggestions rather than vague tips.",
        constraints: [
            "Suggestions must be specific and grounded, not generic",
            "Keep latency acceptable for an interactive flow",
        ],
        technologies: ["Python", "TypeScript", "Next.js", "React"],
        architecture: {
            nodes: [
                { id: "cv", label: "CV + target role", layer: "source" },
                { id: "extract", label: "Parser", layer: "transform" },
                { id: "llm", label: "LLM analysis", layer: "transform" },
                { id: "ui", label: "Suggestions UI", layer: "consumption" },
            ],
            edges: [
                { from: "cv", to: "extract" },
                { from: "extract", to: "llm" },
                { from: "llm", to: "ui" },
            ],
        },
        decisions: [
            {
                decision:
                    "Ground the model on the parsed CV and role rather than free-form prompting.",
                alternative: "Send the raw CV text straight to the model.",
                whyRejected:
                    "Raw prompting produced generic, sometimes hallucinated advice; grounding on structured fields kept suggestions specific.",
            },
        ],
        outcome: {
            summary: "Role-specific, actionable CV feedback in one pass.",
            metrics: [{ label: "feedback", value: "role-targeted" }],
        },
        scale: "Interactive, single-CV analysis",
    },
];
