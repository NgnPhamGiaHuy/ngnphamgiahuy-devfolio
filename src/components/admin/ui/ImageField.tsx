"use client";

// ============================================================
// Component: ImageField
// Purpose: Image management field for admin editors.
//   - Tab 1 "Upload": drag-and-drop / click-to-select file → Firebase Storage
//   - Tab 2 "URL": paste an external or self-hosted URL directly
//   Shows preview, progress bar, Replace and Remove actions.
//   Controlled via react-hook-form Controller.
// ============================================================
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import clsx from "clsx";

import type { StoredImage } from "@/schemas";
import {
    validateImageFile,
    sanitizeFileName,
    uploadImageFile,
    deleteStorageFile,
    ImageUploadError,
} from "@/infrastructure/persistence/firebase";

// ---- Types -----------------------------------------------------------------

interface ImageFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    storagePath: string;
    hint?: string;
}

type UploadState =
    | { status: "idle" }
    | { status: "uploading"; progress: number }
    | { status: "error"; message: string };

// ---- Sub-components --------------------------------------------------------

const ImagePreviewBlock: React.FC<{
    value: StoredImage;
    onReplace: () => void;
    onRemove: () => void;
}> = ({ value, onReplace, onRemove }) => (
    <div className="flex items-start gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={value.url}
                alt="current"
                className="h-full w-full object-cover"
            />
        </div>
        <div className="min-w-0 flex-1">
            {value.fileName && (
                <p className="mb-1 truncate font-mono text-xs text-[var(--color-muted)]">
                    {value.fileName}
                </p>
            )}
            {value.uploadedAt && (
                <p className="mb-3 text-xs text-[var(--color-muted)]">
                    {new Date(value.uploadedAt).toLocaleDateString()}
                </p>
            )}
            {!value.fileName && !value.uploadedAt && (
                <p className="mb-3 truncate text-xs text-[var(--color-muted)]">
                    {value.path ? "Stored in Firebase" : "External URL"}
                </p>
            )}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onReplace}
                    className="rounded-[var(--radius-xs)] border border-[var(--color-hairline)] bg-white inline-flex items-center justify-center min-h-[44px] px-3 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                    Replace
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    className="rounded-[var(--radius-xs)] inline-flex items-center justify-center min-h-[44px] px-3 text-xs font-medium text-[var(--color-error)] transition-colors hover:bg-[var(--color-error)]/10"
                >
                    Remove
                </button>
            </div>
        </div>
    </div>
);

// ---- Main component --------------------------------------------------------

function ImageField<T extends FieldValues>({
    control,
    name,
    label,
    storagePath,
    hint,
}: ImageFieldProps<T>) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [tab, setTab] = useState<"upload" | "url">("upload");
    const [uploadState, setUploadState] = useState<UploadState>({ status: "idle" });
    const [isDragging, setIsDragging] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                const current = field.value as StoredImage | null | undefined;
                const hasImage = Boolean(current?.url);

                const handleFile = async (file: File) => {
                    try {
                        validateImageFile(file);
                    } catch (e) {
                        setUploadState({
                            status: "error",
                            message: e instanceof ImageUploadError ? e.message : String(e),
                        });
                        return;
                    }

                    // Delete old Storage file if present
                    if (current?.path) {
                        await deleteStorageFile(current.path);
                    }

                    setUploadState({ status: "uploading", progress: 0 });
                    try {
                        const cleanName = sanitizeFileName(file.name);
                        const { url, path } = await uploadImageFile(
                            storagePath,
                            file,
                            (pct) => setUploadState({ status: "uploading", progress: pct })
                        );
                        const stored: StoredImage = {
                            url,
                            path,
                            fileName: cleanName,
                            uploadedAt: new Date().toISOString(),
                        };
                        field.onChange(stored);
                        setUploadState({ status: "idle" });
                        setShowPicker(false);
                    } catch (e) {
                        setUploadState({
                            status: "error",
                            message: e instanceof Error ? e.message : "Upload failed.",
                        });
                    }
                };

                const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file) handleFile(file);
                };

                const handleRemove = async () => {
                    if (current?.path) await deleteStorageFile(current.path);
                    field.onChange(null);
                };

                const handleSetUrl = () => {
                    if (!urlInput.trim()) return;
                    const stored: StoredImage = {
                        url: urlInput.trim(),
                        path: "",
                        fileName: "",
                    };
                    field.onChange(stored);
                    setUrlInput("");
                    setShowPicker(false);
                };

                const openPicker = () => {
                    setShowPicker(true);
                    setUploadState({ status: "idle" });
                };

                return (
                    <div className="mb-5">
                        {/* Label */}
                        <label className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                            {label}
                        </label>
                        {hint && (
                            <p className="mb-2 text-xs text-[var(--color-muted)]">{hint}</p>
                        )}

                        {/* Current image preview */}
                        {hasImage && !showPicker ? (
                            <ImagePreviewBlock
                                value={current!}
                                onReplace={openPicker}
                                onRemove={handleRemove}
                            />
                        ) : (
                            /* Upload / URL picker */
                            <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-hairline)]">
                                {/* Tabs */}
                                <div className="flex border-b border-[var(--color-hairline)] bg-[var(--color-surface-soft)]">
                                    {(["upload", "url"] as const).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setTab(t)}
                                            className={clsx(
                                                "inline-flex min-h-[44px] items-center px-4 text-xs font-medium capitalize transition-colors",
                                                tab === t
                                                    ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                                                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                                            )}
                                        >
                                            {t === "upload" ? "Upload File" : "Paste URL"}
                                        </button>
                                    ))}
                                    {hasImage && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPicker(false)}
                                            className="ml-auto px-3 text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>

                                <div className="p-4">
                                    {tab === "upload" ? (
                                        <>
                                            {/* Drop zone */}
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    setIsDragging(true);
                                                }}
                                                onDragLeave={() => setIsDragging(false)}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        fileInputRef.current?.click();
                                                    }
                                                }}
                                                className={clsx(
                                                    "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-sm)] border-2 border-dashed py-8 transition-colors",
                                                    isDragging
                                                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                                        : "border-[var(--color-hairline)] hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-surface-soft)]"
                                                )}
                                            >
                                                <svg
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    className="text-[var(--color-muted)]"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="17 8 12 3 7 8" />
                                                    <line x1="12" y1="3" x2="12" y2="15" />
                                                </svg>
                                                <p className="text-sm text-[var(--color-muted)]">
                                                    <span className="font-medium text-[var(--color-ink)]">
                                                        Click to upload
                                                    </span>{" "}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs text-[var(--color-muted)]">
                                                    PNG, JPEG, WEBP, AVIF — max 5 MB
                                                </p>
                                            </div>

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp,image/avif"
                                                className="sr-only"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleFile(file);
                                                    e.target.value = "";
                                                }}
                                            />

                                            {/* Progress */}
                                            {uploadState.status === "uploading" && (
                                                <div className="mt-3">
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <span className="text-xs text-[var(--color-muted)]">
                                                            Uploading…
                                                        </span>
                                                        <span className="font-mono text-xs text-[var(--color-muted)]">
                                                            {uploadState.progress}%
                                                        </span>
                                                    </div>
                                                    <div className="h-1 overflow-hidden rounded-full bg-[var(--color-hairline)]">
                                                        <div
                                                            className="h-full bg-[var(--color-primary)] transition-all duration-200"
                                                            style={{ width: `${uploadState.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        /* URL tab */
                                        <div className="flex gap-2">
                                            <input
                                                type="url"
                                                placeholder="https://example.com/image.jpg"
                                                value={urlInput}
                                                onChange={(e) => setUrlInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        handleSetUrl();
                                                    }
                                                }}
                                                className="form-input-field flex-1"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleSetUrl}
                                                disabled={!urlInput.trim()}
                                                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-primary)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-active)] disabled:opacity-40"
                                            >
                                                Set
                                            </button>
                                        </div>
                                    )}

                                    {/* Error */}
                                    {uploadState.status === "error" && (
                                        <p
                                            role="alert"
                                            className="mt-2 text-xs text-[var(--color-error)]"
                                        >
                                            {uploadState.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Form validation error */}
                        {fieldState.error && (
                            <p role="alert" className="mt-1 text-xs text-[var(--color-error)]">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                );
            }}
        />
    );
}

ImageField.displayName = "ImageField";

export default ImageField;
