"use client";

// ============================================================
// Component: ProjectEditor
// Purpose: Full project editor — core fields, case-study depth, architecture
//          DAG, lineage pickers. The Firestore doc ID == project slug so slug
//          is entered once on create and shown readonly on edit.
//
// 5 zero-transformation guards (UI enforces correct types for the graph):
//   1. technologies[] — free-text tags (skill names)
//   2. dependsOn[]    — free-text tags (other project slugs)
//   3. slug           — entered once on create, doc-ID, immutable on edit
//   4. architecture.nodes[].layer — Select over the ArchitectureLayer enum
//   5. architecture.edges[].from/to — Select over this project's node ids
// ============================================================
import React, { useState } from "react";
import {
    Controller,
    useFieldArray,
    useForm,
    useWatch,
} from "react-hook-form";
import { useRouter } from "next/navigation";

import type { StoredImage } from "@/schemas";
import ProjectSchema from "@/schemas/content/project.schema";
import {
    COLLECTIONS,
    readDocRaw,
    saveDoc,
} from "@/infrastructure/persistence/firebase";
import { revalidatePublic } from "@/application/use-cases/admin";

import AdminField from "../ui/AdminField";
import ImageField from "../ui/ImageField";
import Select from "../ui/Select";
import TagInput from "../ui/TagInput";
import Toggle from "../ui/Toggle";
import { EditorScaffold, SaveBar } from "../ui/EditorScaffold";
import { useAsyncData } from "../ui/useAsyncData";

// ---- Types ----------------------------------------------------------------

type NodeRow = { id: string; label: string; layer: string };
type EdgeRow = { from: string; to: string; label: string };
type DecisionRow = { decision: string; alternative: string; whyRejected: string };
type MetricRow = { label: string; value: string };

const EMPTY_IMAGE: StoredImage = { url: "", path: "", fileName: "" };

type FormValues = {
    name: string;
    category: string;
    description: string;
    image: StoredImage;
    link: string;
    slug: string;
    year: string;
    summary: string;
    problem: string;
    scale: string;
    featured: boolean;
    published: boolean;
    order: number;
    constraints: string[];
    technologies: string[];
    dependsOn: string[];
    decisions: DecisionRow[];
    architecture: { nodes: NodeRow[]; edges: EdgeRow[] };
    outcome: { summary: string; metrics: MetricRow[] };
    metaTitle: string;
    metaDescription: string;
    ogImage: StoredImage;
};

const LAYER_OPTIONS = [
    { value: "source", label: "Source" },
    { value: "ingest", label: "Ingest" },
    { value: "storage", label: "Storage" },
    { value: "transform", label: "Transform" },
    { value: "consumption", label: "Consumption" },
];

const EMPTY: FormValues = {
    name: "",
    category: "",
    description: "",
    image: EMPTY_IMAGE,
    link: "",
    slug: "",
    year: "",
    summary: "",
    problem: "",
    scale: "",
    featured: false,
    published: false,
    order: 0,
    constraints: [],
    technologies: [],
    dependsOn: [],
    decisions: [],
    architecture: { nodes: [], edges: [] },
    outcome: { summary: "", metrics: [] },
    metaTitle: "",
    metaDescription: "",
    ogImage: EMPTY_IMAGE,
};

// ---- Helpers ---------------------------------------------------------------

const toFormValues = (raw: Record<string, unknown>): FormValues => ({
    ...EMPTY,
    name: String(raw.name ?? ""),
    category: String(raw.category ?? ""),
    description: String(raw.description ?? ""),
    image: (raw.image && typeof raw.image === "object" && "url" in (raw.image as object))
        ? (raw.image as StoredImage)
        : typeof raw.image === "string" && raw.image
            ? { url: raw.image as string, path: "", fileName: "" }
            : EMPTY_IMAGE,
    link: String(raw.link ?? ""),
    slug: String(raw.slug ?? raw._id ?? ""),
    year: String(raw.year ?? ""),
    summary: String(raw.summary ?? ""),
    problem: String(raw.problem ?? ""),
    scale: String(raw.scale ?? ""),
    featured: Boolean(raw.featured),
    published: Boolean(raw.published),
    order: Number(raw.order ?? 0),
    constraints: Array.isArray(raw.constraints)
        ? (raw.constraints as string[])
        : [],
    technologies: Array.isArray(raw.technologies)
        ? (raw.technologies as string[])
        : [],
    dependsOn: Array.isArray(raw.dependsOn)
        ? (raw.dependsOn as string[])
        : [],
    decisions: Array.isArray(raw.decisions)
        ? (raw.decisions as DecisionRow[]).map((d) => ({
              decision: String(d.decision ?? ""),
              alternative: String(d.alternative ?? ""),
              whyRejected: String(d.whyRejected ?? ""),
          }))
        : [],
    architecture: {
        nodes: Array.isArray((raw.architecture as { nodes?: NodeRow[] })?.nodes)
            ? ((raw.architecture as { nodes: NodeRow[] }).nodes).map((n) => ({
                  id: String(n.id ?? ""),
                  label: String(n.label ?? ""),
                  layer: String(n.layer ?? "source"),
              }))
            : [],
        edges: Array.isArray((raw.architecture as { edges?: EdgeRow[] })?.edges)
            ? ((raw.architecture as { edges: EdgeRow[] }).edges).map((e) => ({
                  from: String(e.from ?? ""),
                  to: String(e.to ?? ""),
                  label: String(e.label ?? ""),
              }))
            : [],
    },
    outcome: {
        summary: String(
            (raw.outcome as { summary?: string } | undefined)?.summary ?? ""
        ),
        metrics: Array.isArray(
            (raw.outcome as { metrics?: MetricRow[] } | undefined)?.metrics
        )
            ? (
                  (raw.outcome as { metrics: MetricRow[] }).metrics
              ).map((m) => ({
                  label: String(m.label ?? ""),
                  value: String(m.value ?? ""),
              }))
            : [],
    },
    metaTitle: String(raw.metaTitle ?? ""),
    metaDescription: String(raw.metaDescription ?? ""),
    ogImage: (raw.ogImage && typeof raw.ogImage === "object" && "url" in (raw.ogImage as object))
        ? (raw.ogImage as StoredImage)
        : typeof raw.ogImage === "string" && raw.ogImage
            ? { url: raw.ogImage as string, path: "", fileName: "" }
            : EMPTY_IMAGE,
});

const toDoc = (values: FormValues): Record<string, unknown> => ({
    name: values.name,
    category: values.category,
    description: values.description,
    image: values.image?.url ? values.image : undefined,
    link: values.link || undefined,
    slug: values.slug,
    year: values.year || undefined,
    summary: values.summary || undefined,
    problem: values.problem || undefined,
    scale: values.scale || undefined,
    featured: values.featured,
    published: values.published,
    order: values.order,
    constraints: values.constraints.length ? values.constraints : undefined,
    technologies: values.technologies.length ? values.technologies : undefined,
    dependsOn: values.dependsOn.length ? values.dependsOn : undefined,
    decisions: values.decisions.length
        ? values.decisions.map((d) => ({
              decision: d.decision,
              alternative: d.alternative || undefined,
              whyRejected: d.whyRejected || undefined,
          }))
        : undefined,
    architecture:
        values.architecture.nodes.length ||
        values.architecture.edges.length
            ? {
                  nodes: values.architecture.nodes.map((n) => ({
                      id: n.id,
                      label: n.label,
                      layer: n.layer,
                  })),
                  edges: values.architecture.edges.map((e) => ({
                      from: e.from,
                      to: e.to,
                      label: e.label || undefined,
                  })),
              }
            : undefined,
    outcome:
        values.outcome.summary || values.outcome.metrics.length
            ? {
                  summary: values.outcome.summary || undefined,
                  metrics: values.outcome.metrics.length
                      ? values.outcome.metrics
                      : undefined,
              }
            : undefined,
    metaTitle: values.metaTitle || undefined,
    metaDescription: values.metaDescription || undefined,
    ogImage: values.ogImage?.url ? values.ogImage : undefined,
});

// ---- Section header --------------------------------------------------------

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h3 className="mb-4 mt-8 border-b border-[var(--color-hairline)] pb-2 font-[family-name:var(--font-display)] text-base font-medium text-[var(--color-ink)]">
        {title}
    </h3>
);

// ---- Project form ----------------------------------------------------------

interface ProjectFormProps {
    initial: FormValues;
    docId: string;
    isNew: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initial, docId, isNew }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { isDirty },
    } = useForm<FormValues>({ defaultValues: initial });

    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    // ---- Field arrays -------------------------------------------------------
    const {
        fields: decisionFields,
        append: appendDecision,
        remove: removeDecision,
    } = useFieldArray({ control, name: "decisions" });

    const {
        fields: nodeFields,
        append: appendNode,
        remove: removeNode,
    } = useFieldArray({ control, name: "architecture.nodes" });

    const {
        fields: edgeFields,
        append: appendEdge,
        remove: removeEdge,
    } = useFieldArray({ control, name: "architecture.edges" });

    const {
        fields: metricFields,
        append: appendMetric,
        remove: removeMetric,
    } = useFieldArray({ control, name: "outcome.metrics" });

    const watchedSlug = useWatch({ control, name: "slug" }) as string;

    // Guard 5: edge from/to options are derived from the current nodes
    const watchedNodes = useWatch({
        control,
        name: "architecture.nodes",
    }) as NodeRow[];
    const nodeOptions = [
        { value: "", label: "— select node —" },
        ...(watchedNodes ?? []).map((n) => ({
            value: n.id,
            label: n.id || "(no id)",
        })),
    ];

    // ---- Submit -------------------------------------------------------------
    const onSubmit = handleSubmit(async (values) => {
        setSaving(true);
        setStatus(null);

        const slug = isNew ? values.slug.trim() : docId;
        if (!slug) {
            setStatus({ type: "error", message: "Slug is required." });
            setSaving(false);
            return;
        }

        const candidate = {
            ...toDoc(values),
            slug,
            _id: slug,
            _type: "project",
        };

        const parsed = ProjectSchema.safeParse(candidate);
        if (!parsed.success) {
            setStatus({
                type: "error",
                message: parsed.error.issues[0]?.message ?? "Validation failed",
            });
            setSaving(false);
            return;
        }

        try {
            await saveDoc(
                COLLECTIONS.projects,
                slug,
                parsed.data as Record<string, unknown>
            );
            await revalidatePublic();
            reset(values);
            setStatus({ type: "success", message: "Saved." });
            if (isNew) {
                router.push(`/admin/projects/${slug}`);
            }
        } catch (e) {
            setStatus({
                type: "error",
                message: e instanceof Error ? e.message : "Save failed.",
            });
        } finally {
            setSaving(false);
        }
    });

    // ---- Delete -------------------------------------------------------------
    const onDelete = async () => {
        if (!window.confirm("Delete this project permanently?")) return;
        setSaving(true);
        const { removeDoc } = await import(
            "@/infrastructure/persistence/firebase"
        );
        try {
            await removeDoc(COLLECTIONS.projects, docId);
            await revalidatePublic();
            router.push("/admin/projects");
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
            {/* ---- Core ---- */}
            <SectionHeader title="Core" />
            <AdminField
                id="name"
                label="Name"
                registration={register("name")}
            />
            <AdminField
                id="category"
                label="Category"
                registration={register("category")}
            />
            <AdminField
                id="description"
                label="Description"
                multiline
                rows={3}
                registration={register("description")}
            />

            {/* Guard 3: slug is the Firestore doc ID — editable only on create */}
            <AdminField
                id="slug"
                label="Slug (doc ID — immutable after creation)"
                mono
                hint={
                    isNew
                        ? "Will become the Firestore document ID. Use kebab-case."
                        : "This is the document ID and cannot be changed here."
                }
                registration={
                    isNew
                        ? register("slug")
                        : { ...register("slug"), disabled: true }
                }
            />

            <div className="grid grid-cols-2 gap-4">
                <AdminField
                    id="year"
                    label="Year"
                    mono
                    registration={register("year")}
                />
                <AdminField
                    id="order"
                    label="Order"
                    type="number"
                    registration={register("order", { valueAsNumber: true })}
                />
            </div>

            <Controller
                name="published"
                control={control}
                render={({ field }) => (
                    <Toggle
                        checked={Boolean(field.value)}
                        onChange={field.onChange}
                        label="Published"
                        hint="Unpublished projects are hidden from the public site."
                    />
                )}
            />
            <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                    <Toggle
                        checked={Boolean(field.value)}
                        onChange={field.onChange}
                        label="Featured"
                        hint="Featured projects appear prominently in the portfolio."
                    />
                )}
            />

            {/* ---- Story ---- */}
            <SectionHeader title="Story" />
            <AdminField
                id="summary"
                label="Summary (one-line for graph node)"
                registration={register("summary")}
            />
            <AdminField
                id="problem"
                label="Problem"
                multiline
                rows={3}
                registration={register("problem")}
            />
            <AdminField
                id="scale"
                label="Scale (e.g. 1M records/day)"
                registration={register("scale")}
            />

            {/* ---- Lineage ---- */}
            <SectionHeader title="Lineage" />

            {/* Guard 1: technologies — skill names */}
            <TagInput
                control={control}
                name="technologies"
                label="Technologies (skill names)"
                hint="Drives skill→project edges in the career graph."
                placeholder="react, typescript, …"
            />

            {/* Guard 2: dependsOn — other project slugs */}
            <TagInput
                control={control}
                name="dependsOn"
                label="Depends on (project slugs)"
                hint="Other project slugs this one genuinely builds on."
                placeholder="slug-of-another-project"
            />

            <TagInput
                control={control}
                name="constraints"
                label="Constraints"
                hint="Hard design constraints (budget, scale, team size, etc.)."
                placeholder="Add constraint…"
            />

            {/* ---- Decisions ---- */}
            <SectionHeader title="Decisions" />
            {decisionFields.map((f, i) => (
                <div
                    key={f.id}
                    className="mb-4 rounded-lg border border-[var(--color-hairline)] p-4"
                >
                    <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-xs text-[var(--color-muted)]">
                            Decision {i + 1}
                        </span>
                        <button
                            type="button"
                            onClick={() => removeDecision(i)}
                            className="text-xs text-[var(--color-error)]"
                        >
                            Remove
                        </button>
                    </div>
                    <AdminField
                        id={`d-decision-${i}`}
                        label="Decision"
                        registration={register(`decisions.${i}.decision`)}
                    />
                    <AdminField
                        id={`d-alt-${i}`}
                        label="Alternative considered"
                        registration={register(`decisions.${i}.alternative`)}
                    />
                    <AdminField
                        id={`d-why-${i}`}
                        label="Why rejected"
                        multiline
                        rows={2}
                        registration={register(`decisions.${i}.whyRejected`)}
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    appendDecision({
                        decision: "",
                        alternative: "",
                        whyRejected: "",
                    })
                }
                className="mb-4 text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
            >
                + Add decision
            </button>

            {/* ---- Architecture ---- */}
            <SectionHeader title="Architecture" />

            <p className="mb-4 text-xs text-[var(--color-muted)]">
                Nodes define the system components; edges define data-flow
                between them. The node&nbsp;
                <strong>id</strong> must match the from/to values in edges.
            </p>

            {/* Guard 4: architecture.nodes[].layer — enum Select */}
            <p className="mb-2 text-sm font-medium text-[var(--color-ink)]">
                Nodes
            </p>
            {nodeFields.map((f, i) => (
                <div
                    key={f.id}
                    className="mb-3 grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2"
                >
                    <AdminField
                        id={`node-id-${i}`}
                        label="id"
                        mono
                        registration={register(`architecture.nodes.${i}.id`)}
                    />
                    <AdminField
                        id={`node-label-${i}`}
                        label="Label"
                        registration={register(
                            `architecture.nodes.${i}.label`
                        )}
                    />
                    {/* Guard 4 */}
                    <Select
                        id={`node-layer-${i}`}
                        label="Layer"
                        options={LAYER_OPTIONS}
                        registration={register(
                            `architecture.nodes.${i}.layer`
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => removeNode(i)}
                        className="mb-5 text-xs text-[var(--color-error)]"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    appendNode({ id: "", label: "", layer: "source" })
                }
                className="mb-4 text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
            >
                + Add node
            </button>

            {/* Guard 5: architecture.edges[].from/to — Select over node ids */}
            <p className="mt-4 mb-2 text-sm font-medium text-[var(--color-ink)]">
                Edges
            </p>
            {edgeFields.map((f, i) => (
                <div
                    key={f.id}
                    className="mb-3 grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2"
                >
                    {/* Guard 5 */}
                    <Select
                        id={`edge-from-${i}`}
                        label="From"
                        options={nodeOptions}
                        registration={register(`architecture.edges.${i}.from`)}
                    />
                    <Select
                        id={`edge-to-${i}`}
                        label="To"
                        options={nodeOptions}
                        registration={register(`architecture.edges.${i}.to`)}
                    />
                    <AdminField
                        id={`edge-label-${i}`}
                        label="Label (optional)"
                        registration={register(`architecture.edges.${i}.label`)}
                    />
                    <button
                        type="button"
                        onClick={() => removeEdge(i)}
                        className="mb-5 text-xs text-[var(--color-error)]"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => appendEdge({ from: "", to: "", label: "" })}
                className="mb-4 text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
            >
                + Add edge
            </button>

            {/* ---- Outcome ---- */}
            <SectionHeader title="Outcome" />
            <AdminField
                id="outcome-summary"
                label="Outcome summary"
                multiline
                rows={2}
                registration={register("outcome.summary")}
            />
            <p className="mb-2 text-sm font-medium text-[var(--color-ink)]">
                Metrics
            </p>
            {metricFields.map((f, i) => (
                <div
                    key={f.id}
                    className="mb-2 grid grid-cols-[1fr_1fr_auto] items-end gap-2"
                >
                    <AdminField
                        id={`metric-label-${i}`}
                        label="Label"
                        registration={register(`outcome.metrics.${i}.label`)}
                    />
                    <AdminField
                        id={`metric-value-${i}`}
                        label="Value"
                        mono
                        registration={register(`outcome.metrics.${i}.value`)}
                    />
                    <button
                        type="button"
                        onClick={() => removeMetric(i)}
                        className="mb-5 text-xs text-[var(--color-error)]"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => appendMetric({ label: "", value: "" })}
                className="mb-4 text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
            >
                + Add metric
            </button>

            {/* ---- Image & Links ---- */}
            <SectionHeader title="Image & Links" />
            <ImageField
                control={control}
                name="image"
                label="Cover image"
                storagePath={`images/projects/${watchedSlug || "project"}`}
                hint="Main project image shown in the case study. Upload or paste a URL."
            />
            <AdminField
                id="link"
                label="Live URL (optional)"
                mono
                registration={register("link")}
            />

            {/* ---- SEO ---- */}
            <SectionHeader title="SEO" />
            <AdminField
                id="metaTitle"
                label="Meta title"
                registration={register("metaTitle")}
            />
            <AdminField
                id="metaDescription"
                label="Meta description"
                multiline
                rows={2}
                registration={register("metaDescription")}
            />
            <ImageField
                control={control}
                name="ogImage"
                label="OG / social share image"
                storagePath={`images/projects/${watchedSlug || "project"}`}
                hint="Used for social sharing previews. Ideally 1200×630."
            />

            <SaveBar saving={saving} dirty={isDirty} status={status} />

            {!isNew && (
                <button
                    type="button"
                    onClick={onDelete}
                    disabled={saving}
                    className="mt-4 text-sm text-[var(--color-error)]"
                >
                    Delete project…
                </button>
            )}
        </form>
    );
};

// ---- Shell (loading / error / form) ----------------------------------------

interface ProjectEditorProps {
    docId: string;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ docId }) => {
    const isNew = docId === "new";

    const loader = React.useMemo(
        () =>
            isNew
                ? () => Promise.resolve(null)
                : () => readDocRaw(COLLECTIONS.projects, docId, "project"),
        [docId, isNew]
    );

    const { data, loading, error } = useAsyncData(loader);

    const initial = React.useMemo((): FormValues => {
        if (isNew) return { ...EMPTY };
        if (!data) return { ...EMPTY };
        return toFormValues(data);
    }, [data, isNew]);

    if (loading) {
        return (
            <EditorScaffold title="Project">
                <p className="text-sm text-[var(--color-muted)]">Loading…</p>
            </EditorScaffold>
        );
    }
    if (error) {
        return (
            <EditorScaffold title="Project">
                <p className="text-sm text-[var(--color-error)]">{error}</p>
            </EditorScaffold>
        );
    }

    return (
        <EditorScaffold
            title={isNew ? "New project" : (initial.name || docId)}
            description={
                isNew
                    ? "The slug you enter will become the permanent Firestore document ID."
                    : `projects/${docId}`
            }
        >
            <ProjectForm
                key={docId}
                initial={initial}
                docId={docId}
                isNew={isNew}
            />
        </EditorScaffold>
    );
};

ProjectEditor.displayName = "ProjectEditor";

export default ProjectEditor;
