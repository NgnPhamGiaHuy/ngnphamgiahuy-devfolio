"use client";

// ============================================================
// Component: BlogEditor
// Purpose: Create/edit a Markdown blog post. The Firestore doc id == slug, so
//          slug is entered once on create and shown read-only on edit (mirrors
//          ProjectEditor). Validates against BlogPostSchema before write.
// ============================================================
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import type { StoredImage } from "@/schemas";
import BlogPostSchema from "@/schemas/content/blog-post.schema";
import {
    COLLECTIONS,
    readDocRaw,
    removeDoc,
    saveDoc,
} from "@/infrastructure/persistence/firebase";
import { revalidatePublic } from "@/application/use-cases/admin";

import AdminField from "../ui/AdminField";
import ImageField from "../ui/ImageField";
import TagInput from "../ui/TagInput";
import Toggle from "../ui/Toggle";
import { EditorScaffold, SaveBar } from "../ui/EditorScaffold";
import { useAsyncData } from "../ui/useAsyncData";

type FormValues = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: StoredImage | null;
    author: string;
    category: string;
    tags: string[];
    publishedAt: string;
    published: boolean;
    metaTitle: string;
    metaDescription: string;
};

const EMPTY: FormValues = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: null,
    author: "",
    category: "",
    tags: [],
    publishedAt: "",
    published: false,
    metaTitle: "",
    metaDescription: "",
};

type Status = { type: "success" | "error"; message: string } | null;

const mergeRaw = (raw: Record<string, unknown>): FormValues => ({
    ...EMPTY,
    ...(raw as Partial<FormValues>),
    coverImage: (raw.coverImage as StoredImage) ?? null,
    tags: (raw.tags as string[]) ?? [],
    published: Boolean(raw.published),
});

interface BlogEditorProps {
    docId: string;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ docId }) => {
    const isNew = docId === "new";

    const loader = useMemo(
        () => async (): Promise<FormValues> => {
            if (isNew) return EMPTY;
            const raw = await readDocRaw(
                COLLECTIONS.blogPosts,
                docId,
                "blogPost"
            );
            return raw ? mergeRaw(raw) : EMPTY;
        },
        [docId, isNew]
    );

    const { data, loading, error } = useAsyncData(loader);

    return (
        <EditorScaffold
            title={isNew ? "New post" : "Edit post"}
            description="Markdown body. Drafts stay private until you toggle Published."
        >
            {loading && (
                <p className="text-sm text-[var(--color-muted)]">Loading…</p>
            )}
            {error && (
                <p className="text-sm text-[var(--color-error)]">{error}</p>
            )}
            {!loading && !error && (
                <BlogForm
                    key={docId}
                    isNew={isNew}
                    docId={docId}
                    initial={data ?? EMPTY}
                />
            )}
        </EditorScaffold>
    );
};

interface BlogFormProps {
    isNew: boolean;
    docId: string;
    initial: FormValues;
}

const BlogForm: React.FC<BlogFormProps> = ({ isNew, docId, initial }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { isDirty },
    } = useForm<FormValues>({ defaultValues: initial });
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<Status>(null);

    const published = watch("published");

    const onSubmit = handleSubmit(async (values) => {
        setSaving(true);
        setStatus(null);

        const candidate = {
            _type: "blogPost",
            _id: values.slug || "pending",
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt,
            content: values.content,
            coverImage: values.coverImage || undefined,
            author: values.author || undefined,
            category: values.category || undefined,
            tags: values.tags?.length ? values.tags : undefined,
            publishedAt: values.publishedAt || undefined,
            published: values.published,
            metaTitle: values.metaTitle || undefined,
            metaDescription: values.metaDescription || undefined,
        };

        const parsed = BlogPostSchema.safeParse(candidate);
        if (!parsed.success) {
            setStatus({
                type: "error",
                message:
                    parsed.error.issues[0]?.message ?? "Validation failed.",
            });
            setSaving(false);
            return;
        }

        try {
            await saveDoc(
                COLLECTIONS.blogPosts,
                values.slug,
                parsed.data as Record<string, unknown>
            );
            await revalidatePublic();
            router.push("/admin/blog");
        } catch (e) {
            setStatus({
                type: "error",
                message: e instanceof Error ? e.message : "Save failed.",
            });
            setSaving(false);
        }
    });

    const onDelete = async () => {
        if (!window.confirm("Delete this post? This cannot be undone.")) return;
        setSaving(true);
        try {
            await removeDoc(COLLECTIONS.blogPosts, docId);
            await revalidatePublic();
            router.push("/admin/blog");
        } catch (e) {
            setStatus({
                type: "error",
                message: e instanceof Error ? e.message : "Delete failed.",
            });
            setSaving(false);
        }
    };

    return (
        <form onSubmit={onSubmit} noValidate>
            <AdminField
                id="title"
                label="Title"
                registration={register("title")}
            />

            <AdminField
                id="slug"
                label="Slug (URL + document id)"
                mono
                hint={
                    isNew
                        ? "Lowercase words separated by hyphens, e.g. my-first-post."
                        : "Immutable — it's the document id."
                }
                registration={register("slug", { disabled: !isNew })}
            />

            <AdminField
                id="excerpt"
                label="Excerpt"
                multiline
                rows={2}
                hint="One-line summary for the index + SEO description fallback."
                registration={register("excerpt")}
            />

            <AdminField
                id="content"
                label="Content (Markdown)"
                multiline
                rows={18}
                mono
                hint="Markdown — headings, lists, **bold**, `code`, and ```fenced``` code blocks."
                registration={register("content")}
            />

            <ImageField
                control={control}
                name="coverImage"
                label="Cover image"
                storagePath="images/blog"
                hint="Optional. Shown at the top of the post and as the OG image."
            />

            <div className="grid gap-x-6 sm:grid-cols-2">
                <AdminField
                    id="author"
                    label="Author"
                    registration={register("author")}
                />
                <AdminField
                    id="category"
                    label="Category"
                    registration={register("category")}
                />
            </div>

            <TagInput
                control={control}
                name="tags"
                label="Tags"
                hint="Press Enter to add. Drives the post footer + keywords."
            />

            <AdminField
                id="publishedAt"
                label="Publish date"
                type="date"
                hint="Used for ordering (newest first) and display."
                registration={register("publishedAt")}
            />

            <div className="mt-2 rounded-[var(--radius-md)] border border-[var(--color-hairline)] p-4">
                <Toggle
                    label="Published"
                    hint="Off = draft (hidden from the public site)."
                    checked={published}
                    onChange={(next) =>
                        setValue("published", next, { shouldDirty: true })
                    }
                />
            </div>

            <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-[var(--color-body)]">
                    SEO overrides
                </summary>
                <div className="mt-4">
                    <AdminField
                        id="metaTitle"
                        label="Meta title"
                        hint="Defaults to the post title."
                        registration={register("metaTitle")}
                    />
                    <AdminField
                        id="metaDescription"
                        label="Meta description"
                        multiline
                        rows={2}
                        hint="Defaults to the excerpt."
                        registration={register("metaDescription")}
                    />
                </div>
            </details>

            {!isNew && (
                <button
                    type="button"
                    onClick={onDelete}
                    disabled={saving}
                    className="mt-6 text-sm text-[var(--color-error)]"
                >
                    Delete post
                </button>
            )}

            <SaveBar
                saving={saving}
                dirty={isDirty}
                status={status}
                onDiscard={() => reset(initial)}
            />
        </form>
    );
};

export default BlogEditor;
