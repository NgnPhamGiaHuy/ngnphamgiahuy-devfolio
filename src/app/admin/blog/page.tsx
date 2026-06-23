"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import {
    COLLECTIONS,
    readCollectionRaw,
} from "@/infrastructure/persistence/firebase";
import { useAsyncData } from "@/components/admin/ui/useAsyncData";
import { EditorScaffold } from "@/components/admin/ui/EditorScaffold";

type PostRow = {
    _id: string;
    title?: string;
    slug?: string;
    published?: boolean;
    publishedAt?: string;
};

const loader = () =>
    readCollectionRaw(COLLECTIONS.blogPosts, "blogPost") as Promise<PostRow[]>;

const AdminBlogPage: React.FC = () => {
    const { data, loading, error } = useAsyncData(loader);

    const sorted = useMemo(
        () =>
            data
                ? [...(data as PostRow[])].sort((a, b) =>
                      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
                  )
                : [],
        [data]
    );

    return (
        <EditorScaffold
            title="Blog"
            description="All posts — published and draft. Slug is the Firestore document ID."
            actions={
                <Link href="/admin/blog/new">
                    <span className="primary-button">+ New</span>
                </Link>
            }
        >
            {loading && (
                <p className="text-sm text-[var(--color-muted)]">Loading…</p>
            )}
            {error && (
                <p className="text-sm text-[var(--color-error)]">{error}</p>
            )}

            {!loading && !error && (
                <ul className="divide-y divide-[var(--color-hairline)] rounded-lg border border-[var(--color-hairline)]">
                    {sorted.length === 0 && (
                        <li className="p-4 text-sm text-[var(--color-muted)]">
                            No posts yet. Use &quot;+ New&quot; to write one.
                        </li>
                    )}
                    {sorted.map((p) => (
                        <li key={p._id} className="flex items-center gap-3 p-3">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-[var(--color-ink)]">
                                    {p.title || "(untitled)"}
                                </p>
                                <p className="truncate font-mono text-xs text-[var(--color-muted)]">
                                    {p._id}
                                </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs ${
                                        p.published
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-[var(--color-hairline)] text-[var(--color-muted)]"
                                    }`}
                                >
                                    {p.published ? "live" : "draft"}
                                </span>
                                <Link
                                    href={`/admin/blog/${p._id}`}
                                    className="text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
                                >
                                    Edit
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </EditorScaffold>
    );
};

export default AdminBlogPage;
