"use client";

// ============================================================
// Component: AdminChrome
// Purpose: Authed admin frame — nav rail (desktop) / scrollable strip (mobile)
//          + topbar (sign out, view site). Renders inside AdminGate, so it only
//          mounts for an allowlisted owner.
// ============================================================
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { useAuth } from "@/components/providers/AuthProvider";

type NavEntry =
    | { group: string }
    | { href: string; label: string };

const NAV: NavEntry[] = [
    { href: "/admin", label: "Dashboard" },
    { group: "Content" },
    { href: "/admin/profile", label: "Profile" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/skills", label: "Skills" },
    { group: "Career" },
    { href: "/admin/education", label: "Education" },
    { href: "/admin/experience", label: "Experience" },
    { group: "Site" },
    { href: "/admin/settings", label: "Settings" },
];

const isGroup = (e: NavEntry): e is { group: string } => "group" in e;

const NavLinks: React.FC<{ pathname: string }> = ({ pathname }) => (
    <>
        {NAV.map((entry, i) =>
            isGroup(entry) ? (
                <p
                    key={`g-${i}`}
                    className="mt-5 mb-1 px-3 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] max-md:hidden"
                >
                    {entry.group}
                </p>
            ) : (
                <Link
                    key={entry.href}
                    href={entry.href}
                    className={clsx(
                        "shrink-0 rounded-md px-3 py-2 text-sm transition-colors",
                        pathname === entry.href
                            ? "bg-[var(--color-surface-card)] font-medium text-[var(--color-ink)]"
                            : "text-[var(--color-body)] hover:text-[var(--color-ink)]"
                    )}
                >
                    {entry.label}
                </Link>
            )
        )}
    </>
);

const AdminChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-[var(--background)] md:flex">
            {/* Desktop rail */}
            <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-4 md:flex">
                <p className="mb-6 px-3 font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                    control center
                </p>
                <nav className="flex flex-1 flex-col gap-0.5">
                    <NavLinks pathname={pathname} />
                </nav>
                <div className="mt-4 border-t border-[var(--color-hairline)] pt-4">
                    <p className="mb-2 truncate px-3 font-mono text-xs text-[var(--color-muted)]">
                        {user?.email}
                    </p>
                    <button
                        type="button"
                        onClick={() => void signOut()}
                        className="w-full rounded-md px-3 py-2 text-left text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
                    >
                        Sign out
                    </button>
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-md px-3 py-2 text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
                    >
                        View site ↗
                    </a>
                </div>
            </aside>

            {/* Mobile top strip — horizontally scrollable pill nav */}
            <div className="relative sticky top-0 z-10 border-b border-[var(--color-hairline)] bg-[var(--color-surface-soft)] md:hidden">
                <div className="flex items-center gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <NavLinks pathname={pathname} />
                    <button
                        type="button"
                        onClick={() => void signOut()}
                        className="ml-auto shrink-0 rounded-md px-3 py-2 text-sm text-[var(--color-body)]"
                    >
                        Sign out
                    </button>
                </div>
                {/* Right fade — indicates more content to scroll */}
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--color-surface-soft)]"
                    aria-hidden="true"
                />
            </div>

            <main className="min-w-0 flex-1">{children}</main>
        </div>
    );
};

AdminChrome.displayName = "AdminChrome";

export default AdminChrome;
