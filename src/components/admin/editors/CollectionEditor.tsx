"use client";

// ============================================================
// Component: CollectionEditor (generic list + detail for a Firestore collection)
// Purpose: Drives the simple collection editors (skills/education/experience).
//          List with reorder + delete; a keyed detail form for create/edit.
//          Validates the assembled doc against the SAME Zod schema before write.
// ============================================================
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { ZodType } from "zod";

import {
    createDoc,
    readCollectionRaw,
    removeDoc,
    saveDoc,
    saveOrder,
} from "@/infrastructure/persistence/firebase";
import { revalidatePublic } from "@/application/use-cases/admin";

import AdminField from "../ui/AdminField";
import { EditorScaffold, SaveBar } from "../ui/EditorScaffold";
import { useAsyncData } from "../ui/useAsyncData";

export interface FieldDef {
    name: string;
    label: string;
    kind?: "text" | "textarea" | "number";
    mono?: boolean;
    hint?: string;
}

interface CollectionEditorProps {
    title: string;
    description?: string;
    collectionName: string;
    type: string;
    schema: ZodType<unknown>;
    fields: FieldDef[];
    titleField: string;
    subtitleField?: string;
    newItem: Record<string, unknown>;
}

type Row = Record<string, unknown> & { _id: string };
type Status = { type: "success" | "error"; message: string } | null;
type Editing = { mode: "new" | "edit"; item: Record<string, unknown> } | null;

const orderOf = (r: Row): number =>
    typeof r.order === "number" ? r.order : Number.MAX_SAFE_INTEGER;

const CollectionEditor: React.FC<CollectionEditorProps> = ({
    title,
    description,
    collectionName,
    type,
    schema,
    fields,
    titleField,
    subtitleField,
    newItem,
}) => {
    const loader = useMemo(
        () => () => readCollectionRaw(collectionName, type),
        [collectionName, type]
    );
    const { data, loading, error, reload } = useAsyncData(loader);
    const [editing, setEditing] = useState<Editing>(null);

    const items = useMemo(
        () => [...((data as Row[]) ?? [])].sort((a, b) => orderOf(a) - orderOf(b)),
        [data]
    );

    const move = async (index: number, dir: -1 | 1) => {
        const next = [...items];
        const j = index + dir;
        if (j < 0 || j >= next.length) return;
        [next[index], next[j]] = [next[j], next[index]];
        await saveOrder(
            collectionName,
            next.map((it) => ({ _id: it._id }))
        );
        await revalidatePublic();
        reload();
    };

    return (
        <EditorScaffold
            title={title}
            description={description}
            actions={
                <button
                    type="button"
                    onClick={() => setEditing({ mode: "new", item: { ...newItem } })}
                >
                    <span className="primary-button">+ New</span>
                </button>
            }
        >
            {loading && (
                <p className="text-sm text-[var(--color-muted)]">Loading…</p>
            )}
            {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}

            {!loading && !error && (
                <ul className="mb-8 divide-y divide-[var(--color-hairline)] rounded-lg border border-[var(--color-hairline)]">
                    {items.length === 0 && (
                        <li className="p-4 text-sm text-[var(--color-muted)]">
                            No items yet. Use “+ New” to create one.
                        </li>
                    )}
                    {items.map((item, i) => (
                        <li
                            key={item._id}
                            className="flex items-center gap-2 px-3 py-2"
                        >
                            <div className="flex flex-col">
                                <button
                                    type="button"
                                    aria-label="Move up"
                                    disabled={i === 0}
                                    onClick={() => move(i, -1)}
                                    className="flex h-6 w-6 items-center justify-center text-xs text-[var(--color-muted)] disabled:opacity-30"
                                >
                                    ▲
                                </button>
                                <button
                                    type="button"
                                    aria-label="Move down"
                                    disabled={i === items.length - 1}
                                    onClick={() => move(i, 1)}
                                    className="flex h-6 w-6 items-center justify-center text-xs text-[var(--color-muted)] disabled:opacity-30"
                                >
                                    ▼
                                </button>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-[var(--color-ink)]">
                                    {String(item[titleField] ?? "(untitled)")}
                                </p>
                                {subtitleField && (
                                    <p className="truncate text-xs text-[var(--color-muted)]">
                                        {String(item[subtitleField] ?? "")}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setEditing({ mode: "edit", item })
                                }
                                className="min-h-[44px] px-2 text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {editing && (
                <ItemForm
                    key={
                        editing.mode === "edit"
                            ? String(editing.item._id)
                            : "new"
                    }
                    mode={editing.mode}
                    initial={editing.item}
                    fields={fields}
                    schema={schema}
                    type={type}
                    collectionName={collectionName}
                    onDone={() => {
                        setEditing(null);
                        reload();
                    }}
                    onCancel={() => setEditing(null)}
                />
            )}
        </EditorScaffold>
    );
};

interface ItemFormProps {
    mode: "new" | "edit";
    initial: Record<string, unknown>;
    fields: FieldDef[];
    schema: ZodType<unknown>;
    type: string;
    collectionName: string;
    onDone: () => void;
    onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
    mode,
    initial,
    fields,
    schema,
    type,
    collectionName,
    onDone,
    onCancel,
}) => {
    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm<Record<string, unknown>>({ defaultValues: initial });
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<Status>(null);

    const onSubmit = handleSubmit(async (values) => {
        setSaving(true);
        setStatus(null);
        const candidate = {
            ...initial,
            ...values,
            _type: type,
            _id: (initial._id as string) || "pending",
        };
        const parsed = schema.safeParse(candidate);
        if (!parsed.success) {
            setStatus({
                type: "error",
                message: parsed.error.issues[0]?.message ?? "Validation failed",
            });
            setSaving(false);
            return;
        }
        try {
            if (mode === "edit") {
                await saveDoc(
                    collectionName,
                    String(initial._id),
                    parsed.data as Record<string, unknown>
                );
            } else {
                await createDoc(
                    collectionName,
                    parsed.data as Record<string, unknown>
                );
            }
            await revalidatePublic();
            onDone();
        } catch (e) {
            setStatus({
                type: "error",
                message: e instanceof Error ? e.message : "Save failed.",
            });
            setSaving(false);
        }
    });

    const onDelete = async () => {
        if (!window.confirm("Delete this item? This cannot be undone.")) return;
        setSaving(true);
        try {
            await removeDoc(collectionName, String(initial._id));
            await revalidatePublic();
            onDone();
        } catch (e) {
            setStatus({
                type: "error",
                message: e instanceof Error ? e.message : "Delete failed.",
            });
            setSaving(false);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface-card)] p-5"
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--color-ink)]">
                    {mode === "new" ? "New item" : "Edit item"}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-sm text-[var(--color-muted)]"
                >
                    Cancel
                </button>
            </div>

            {fields.map((f) => (
                <AdminField
                    key={f.name}
                    id={f.name}
                    label={f.label}
                    multiline={f.kind === "textarea"}
                    type={f.kind === "number" ? "number" : "text"}
                    mono={f.mono}
                    hint={f.hint}
                    registration={register(
                        f.name,
                        f.kind === "number" ? { valueAsNumber: true } : {}
                    )}
                />
            ))}

            <SaveBar saving={saving} dirty={isDirty} status={status} />

            {mode === "edit" && (
                <button
                    type="button"
                    onClick={onDelete}
                    disabled={saving}
                    className="mt-4 text-sm text-[var(--color-error)]"
                >
                    Delete
                </button>
            )}
        </form>
    );
};

export default CollectionEditor;
