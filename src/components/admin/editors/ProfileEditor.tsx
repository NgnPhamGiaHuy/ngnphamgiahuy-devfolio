"use client";

// ============================================================
// Component: ProfileEditor (singleton -> profile/main)
// ============================================================
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import type { ProfileType } from "@/schemas";
import ProfileSchema from "@/schemas/content/profile.schema";
import { readDocRaw, saveDoc } from "@/infrastructure/persistence/firebase";
import { createMockData } from "@/infrastructure/persistence/mocks";
import { revalidatePublic } from "@/application/use-cases/admin";

import AdminField from "../ui/AdminField";
import FileUploadField from "../ui/FileUploadField";
import IconPicker from "../ui/IconPicker";
import ImageField from "../ui/ImageField";
import { EditorScaffold, SaveBar } from "../ui/EditorScaffold";
import { useAsyncData } from "../ui/useAsyncData";

type Status = { type: "success" | "error"; message: string } | null;

const loadProfile = () => readDocRaw("profile", "main", "profile");

const ProfileForm: React.FC<{ initial: ProfileType }> = ({ initial }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isDirty },
    } = useForm<ProfileType>({ defaultValues: initial });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "social_links",
    });
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<Status>(null);

    const onSubmit = handleSubmit(async (values) => {
        setSaving(true);
        setStatus(null);
        const candidate = { ...values, _id: "profile-main", _type: "profile" };
        const parsed = ProfileSchema.safeParse(candidate);
        if (!parsed.success) {
            setStatus({
                type: "error",
                message: parsed.error.issues[0]?.message ?? "Validation failed",
            });
            setSaving(false);
            return;
        }
        try {
            await saveDoc("profile", "main", parsed.data as Record<string, unknown>);
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
            title="Profile"
            description="The single profile/main document — drives the hero, now, and contact sections."
        >
            <form onSubmit={onSubmit} noValidate>
                <AdminField id="name" label="Name" registration={register("name")} error={errors.name?.message} />
                <AdminField id="job_title" label="Job title" registration={register("job_title")} error={errors.job_title?.message} />
                <AdminField id="description" label="Description" multiline rows={4} registration={register("description")} error={errors.description?.message} />
                <AdminField id="location" label="Location" registration={register("location")} error={errors.location?.message} />
                <AdminField id="email" label="Email" type="email" registration={register("email")} error={errors.email?.message} />
                <AdminField id="phone" label="Phone" registration={register("phone")} error={errors.phone?.message} />
                <AdminField id="experience_years" label="Years of experience" type="number" registration={register("experience_years", { valueAsNumber: true })} error={errors.experience_years?.message} />
                <ImageField
                    control={control}
                    name="profile_image"
                    label="Profile image"
                    storagePath="images/profile"
                    hint="Shown in the hero section. Upload (PNG/JPEG/WEBP) or paste a URL."
                />
                <FileUploadField
                    control={control}
                    name="resume"
                    label="Resume / CV"
                    storagePath="resume"
                    hint="Upload PDF or paste a Google Drive / Dropbox link."
                />

                <fieldset className="mb-5 rounded-lg border border-[var(--color-hairline)] p-4">
                    <legend className="px-1 text-sm font-medium text-[var(--color-ink)]">
                        Social links
                    </legend>

                    <div className="space-y-3">
                        {fields.map((field, i) => (
                            <div key={field.id} className="grid grid-cols-1 gap-2 sm:grid-cols-[7rem_1fr_auto_auto] sm:items-center">
                                <input
                                    placeholder="Platform"
                                    className="form-input-field"
                                    {...register(`social_links.${i}.platform`)}
                                />
                                <input
                                    placeholder="https://…"
                                    className="form-input-field font-mono text-xs"
                                    {...register(`social_links.${i}.url`)}
                                />
                                <div className="flex items-center gap-2 sm:contents">
                                    <div>
                                        <IconPicker
                                            control={control}
                                            name={`social_links.${i}.icon`}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(i)}
                                        aria-label="Remove"
                                        className="min-h-[44px] min-w-[44px] rounded flex items-center justify-center text-[var(--color-muted)] transition-colors hover:text-[var(--color-error)]"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => append({ platform: "", url: "", icon: undefined })}
                        className="mt-3 text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
                    >
                        + Add link
                    </button>
                </fieldset>

                <SaveBar saving={saving} dirty={isDirty} status={status} />
            </form>
        </EditorScaffold>
    );
};

const ProfileEditor: React.FC = () => {
    const { data, loading, error } = useAsyncData(loadProfile);

    if (loading) {
        return (
            <EditorScaffold title="Profile">
                <p className="text-sm text-[var(--color-muted)]">Loading…</p>
            </EditorScaffold>
        );
    }
    if (error) {
        return (
            <EditorScaffold title="Profile">
                <p className="text-sm text-[var(--color-error)]">{error}</p>
            </EditorScaffold>
        );
    }

    // Merge the raw doc over the static defaults so missing/partial fields are
    // editable (no doc yet -> full mock template; saving creates/repairs it).
    const initial = (
        data ? { ...createMockData().profile, ...data } : createMockData().profile
    ) as ProfileType;
    return <ProfileForm initial={initial} />;
};

ProfileEditor.displayName = "ProfileEditor";

export default ProfileEditor;
