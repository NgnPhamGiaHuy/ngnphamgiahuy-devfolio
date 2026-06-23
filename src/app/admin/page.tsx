import React from "react";
import Link from "next/link";

// Dashboard. Renders inside AdminChrome (rail + main) only when AdminGate
// confirms an allowlisted owner.
const CARDS = [
    { href: "/admin/profile", label: "Profile", note: "Name, bio, socials, SEO" },
    { href: "/admin/projects", label: "Projects", note: "Case studies + lineage" },
    { href: "/admin/blog", label: "Blog", note: "Posts (Markdown)" },
    { href: "/admin/skills", label: "Skills", note: "The graph join keys" },
    { href: "/admin/education", label: "Education", note: "Career spine" },
    { href: "/admin/experience", label: "Experience", note: "Roles + Now" },
    { href: "/admin/settings", label: "Settings", note: "Sections + SEO" },
];

const AdminDashboardPage: React.FC = () => (
    <div className="px-6 py-10 md:px-10">
        <div className="mx-auto max-w-[900px]">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                control center
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-[var(--color-ink)]">
                Dashboard
            </h1>
            <p className="mt-2 mb-8 text-[var(--color-body)]">
                Edit the content that powers the portfolio. Changes write to
                Firestore and revalidate the public site.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CARDS.map((c) => (
                    <Link
                        key={c.href}
                        href={c.href}
                        className="rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface-card)] p-5 transition-shadow hover:shadow-[var(--shadow-soft)]"
                    >
                        <p className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--color-ink)]">
                            {c.label}
                        </p>
                        <p className="mt-1 text-sm text-[var(--color-muted)]">
                            {c.note}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default AdminDashboardPage;
