"use client";

// ============================================================
// Component: SettingsEditor (singleton → settings/site)
// Purpose: Edit section visibility toggles, logo, and site SEO.
// ============================================================
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import type { SettingsType, StoredImage } from "@/schemas";
import SettingsSchema from "@/schemas/setting/settings.schema";
import {
    COLLECTIONS,
    SINGLETON_IDS,
    readDocRaw,
    saveDoc,
} from "@/infrastructure/persistence/firebase";
import { createMockData } from "@/infrastructure/persistence/mocks";
import { revalidatePublic } from "@/application/use-cases/admin";

import AdminField from "../ui/AdminField";
import ImageField from "../ui/ImageField";
import Toggle from "../ui/Toggle";
import { EditorScaffold, SaveBar } from "../ui/EditorScaffold";
import { useAsyncData } from "../ui/useAsyncData";

type Status = { type: "success" | "error"; message: string } | null;

const ACTIVE_SECTIONS = [
    { key: "hero" as const, label: "Hero" },
    { key: "projects" as const, label: "Projects" },
    { key: "skills" as const, label: "Skills" },
    { key: "now" as const, label: "Now" },
    { key: "contact" as const, label: "Contact" },
] as const;

type SectionKey = (typeof ACTIVE_SECTIONS)[number]["key"];

const EMPTY_IMAGE: StoredImage = { url: "", path: "", fileName: "" };

type FormValues = {
    logo: string;
    metaTitle: string;
    metaDescription: string;
    ogImage: StoredImage;
    sections: Record<SectionKey, { enabled: boolean; resetAnimationOnView: boolean }>;
};

const loadSettings = () =>
    readDocRaw(COLLECTIONS.settings, SINGLETON_IDS.settings, "settings");

const SettingsForm: React.FC<{ initial: SettingsType }> = ({ initial }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            logo: initial.logo ?? "",
            metaTitle: initial.metaTitle ?? "",
            metaDescription: initial.metaDescription ?? "",
            ogImage: initial.ogImage ?? EMPTY_IMAGE,
            sections: Object.fromEntries(
                ACTIVE_SECTIONS.map(({ key }) => [
                    key,
                    {
                        enabled: initial[key]?.enabled ?? true,
                        resetAnimationOnView:
                            initial[key]?.resetAnimationOnView ?? false,
                    },
                ])
            ) as FormValues["sections"],
        },
    });
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<Status>(null);

    const onSubmit = handleSubmit(async (values) => {
        setSaving(true);
        setStatus(null);

        const candidate: Record<string, unknown> = {
            ...initial,
            logo: values.logo,
            metaTitle: values.metaTitle || undefined,
            metaDescription: values.metaDescription || undefined,
            ogImage: values.ogImage?.url ? values.ogImage : undefined,
            _id: "settings-site",
            _type: "settings",
        };
        for (const { key } of ACTIVE_SECTIONS) {
            (candidate as Record<string, unknown>)[key] = {
                ...(initial[key] ?? {}),
                enabled: values.sections[key].enabled,
                resetAnimationOnView: values.sections[key].resetAnimationOnView,
            };
        }

        const parsed = SettingsSchema.safeParse(candidate);
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
                COLLECTIONS.settings,
                SINGLETON_IDS.settings,
                parsed.data as Record<string, unknown>
            );
            await revalidatePublic();
            reset(values);
            setStatus({ type: "success", message: "Saved." });
        } catch (e) {
            setStatus({
                type: "error",
                message: e instanceof Error ? e.message : "Save failed.",
            });
        } finally {
            setSaving(false);
        }
    });

    return (
        <EditorScaffold
            title="Settings"
            description="Site-wide settings — logo, SEO defaults, and section visibility."
        >
            <form onSubmit={onSubmit} noValidate>
                <AdminField
                    id="logo"
                    label="Logo text"
                    mono
                    registration={register("logo")}
                />

                <h3 className="mb-4 mt-6 border-b border-[var(--color-hairline)] pb-2 font-[family-name:var(--font-display)] text-base font-medium text-[var(--color-ink)]">
                    SEO defaults
                </h3>
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
                    storagePath="images/site"
                    hint="Used for social sharing previews (Twitter, Open Graph). Ideally 1200×630."
                />

                <h3 className="mb-4 mt-6 border-b border-[var(--color-hairline)] pb-2 font-[family-name:var(--font-display)] text-base font-medium text-[var(--color-ink)]">
                    Section visibility
                </h3>

                {ACTIVE_SECTIONS.map(({ key, label }) => (
                    <div
                        key={key}
                        className="mb-5 rounded-lg border border-[var(--color-hairline)] p-4"
                    >
                        <p className="mb-3 font-medium text-[var(--color-ink)]">
                            {label}
                        </p>
                        <Controller
                            name={`sections.${key}.enabled`}
                            control={control}
                            render={({ field }) => (
                                <Toggle
                                    checked={Boolean(field.value)}
                                    onChange={field.onChange}
                                    label="Enabled"
                                    hint="Show this section on the public site."
                                />
                            )}
                        />
                        <Controller
                            name={`sections.${key}.resetAnimationOnView`}
                            control={control}
                            render={({ field }) => (
                                <Toggle
                                    checked={Boolean(field.value)}
                                    onChange={field.onChange}
                                    label="Reset animation on view"
                                    hint="Re-trigger the entrance animation each time the section scrolls into view."
                                />
                            )}
                        />
                    </div>
                ))}

                <SaveBar saving={saving} dirty={isDirty} status={status} />
            </form>
        </EditorScaffold>
    );
};

const SettingsEditor: React.FC = () => {
    const { data, loading, error } = useAsyncData(loadSettings);

    if (loading) {
        return (
            <EditorScaffold title="Settings">
                <p className="text-sm text-[var(--color-muted)]">Loading…</p>
            </EditorScaffold>
        );
    }
    if (error) {
        return (
            <EditorScaffold title="Settings">
                <p className="text-sm text-[var(--color-error)]">{error}</p>
            </EditorScaffold>
        );
    }

    const defaults = createMockData().settings;
    const initial = (
        data ? { ...defaults, ...data } : defaults
    ) as SettingsType;

    return <SettingsForm initial={initial} />;
};

SettingsEditor.displayName = "SettingsEditor";

export default SettingsEditor;
