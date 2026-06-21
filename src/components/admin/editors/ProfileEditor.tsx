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
                <AdminField id="profile_image" label="Profile image (path or URL)" mono registration={register("profile_image")} error={errors.profile_image?.message} hint="Upload-to-Storage field comes later; a /public path or absolute URL works." />
                <AdminField id="cv_link" label="CV link" registration={register("cv_link")} error={errors.cv_link?.message} />

                <fieldset className="mb-5 rounded-lg border border-[var(--color-hairline)] p-4">
                    <legend className="px-1 text-sm font-medium text-[var(--color-ink)]">
                        Social links
                    </legend>
                    {fields.map((field, i) => (
                        <div
                            key={field.id}
                            className="mb-3 grid grid-cols-1 gap-2 border-b border-[var(--color-hairline-soft)] pb-3 last:border-0 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
                        >
                            <AdminField id={`sl-platform-${i}`} label="Platform" registration={register(`social_links.${i}.platform`)} />
                            <AdminField id={`sl-url-${i}`} label="URL" mono registration={register(`social_links.${i}.url`)} />
                            <AdminField id={`sl-icon-${i}`} label="Icon" mono registration={register(`social_links.${i}.icon`)} />
                            <button
                                type="button"
                                onClick={() => remove(i)}
                                className="mb-5 rounded-md px-3 py-2 text-sm text-[var(--color-error)]"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ platform: "", url: "", icon: "" })}
                        className="text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
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
