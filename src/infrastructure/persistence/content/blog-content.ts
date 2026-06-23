// ============================================================
// Module: Static blog content (demo / fallback)
// Purpose: Seed posts so the blog is demoable before Firestore has content —
//          the same mock-fallback contract the rest of the site uses. Once the
//          owner authors posts in the control center, Firestore wins.
// ============================================================
type SeedPost = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author?: string;
    category?: string;
    tags?: string[];
    publishedAt?: string;
    published?: boolean;
};

export const REAL_BLOG_POSTS: SeedPost[] = [
    {
        title: "Drawing a Career as a Dependency Graph",
        slug: "career-as-a-dependency-graph",
        excerpt:
            "Why my portfolio opens on a self-building SVG lineage graph instead of a wall of project cards — and how the layout stays crossing-free.",
        author: "Nguyen Gia Huy",
        category: "Engineering",
        tags: ["SVG", "Data Viz", "Next.js"],
        publishedAt: "2026-05-12",
        published: true,
        content: `Most portfolios are a card gallery. Mine opens on a **career lineage graph** — education and skills flowing into roles and projects — because the most honest thing I can show is *how the work connects*.

## The layout problem

A naive graph fans every skill edge across the canvas and turns into spaghetti. The fix is to sort projects by their most **distinctive** skill's vertical position, so edges travel horizontally:

\`\`\`ts
// lower cross-project frequency = more distinctive = primary edge
const primary = technologies
  .map((t) => ({ t, freq: skillFreq.get(t) ?? 1 }))
  .sort((a, b) => a.freq - b.freq)[0];
\`\`\`

The result is roughly **zero crossings** without a physics simulation — just arithmetic on column positions.

## What it buys

- The graph ships in the SSR HTML, so it's legible with no JavaScript.
- Relationships are mirrored as a screen-reader list.
- Each project node opens a deep case study.

> A portfolio should argue for your judgment, not just list your output.

Next up: making each case study its own crawlable page.`,
    },
    {
        title: "I Deleted My Skill Bars",
        slug: "i-deleted-my-skill-bars",
        excerpt:
            "Percentage skill bars are fiction. Here's the honest replacement: a dependency view that shows which shipped systems prove each skill.",
        author: "Nguyen Gia Huy",
        category: "Design",
        tags: ["Portfolio", "Design"],
        publishedAt: "2026-06-02",
        published: true,
        content: `"React — 90%." Ninety percent of *what?* Skill bars are a confidence trick: an un-falsifiable number dressed up as a metric.

## A skill is where it was used

So I replaced the bars with a **dependency view**. Select a skill and it reveals the projects that prove it — derived automatically from each project's \`technologies[]\`:

\`\`\`ts
const provenBy = projects.filter((p) =>
  (p.technologies ?? []).some((t) => t.toLowerCase() === skill)
);
\`\`\`

If a skill isn't wired into a shipped system, it shows nothing. That's the point — it can't be faked.

## Why this is better

1. **Honest** — evidence, not self-assessment.
2. **Navigable** — every skill is a path into the work.
3. **Maintainable** — no numbers to invent or keep updating.

The lesson generalizes: prefer **derived** truth over **declared** truth wherever you can.`,
    },
];

export default REAL_BLOG_POSTS;
