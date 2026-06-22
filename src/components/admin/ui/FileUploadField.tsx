"use client";

// ============================================================
// Component: FileUploadField
// Purpose: Managed file upload (PDF + other allowed types) for admin editors.
//   - Drag-and-drop / click-to-select → Firebase Storage
//   - "Paste URL" tab for external links (Google Drive, Dropbox, etc.)
//   - File card preview: icon, name, size, upload date, download, replace, remove
//   Controlled via react-hook-form Controller.
// ============================================================
import React, { useCallback, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import clsx from "clsx";

import type { StoredFile } from "@/schemas";
import {
    validateFile,
    sanitizeFileName,
    uploadFile,
    deleteStorageFile,
    ImageUploadError,
} from "@/infrastructure/persistence/firebase";

// ---- Types -----------------------------------------------------------------

interface FileUploadFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    storagePath: string;
    allowedTypes?: readonly string[];
    hint?: string;
    accept?: string;
}

type UploadState =
    | { status: "idle" }
    | { status: "uploading"; progress: number }
    | { status: "error"; message: string };

// ---- Helpers ---------------------------------------------------------------

const formatBytes = (bytes: number): string => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const PDF_TYPES = ["application/pdf"] as const;

// ---- Sub-component: FileCard -----------------------------------------------

const FileCard: React.FC<{
    value: StoredFile;
    onReplace: () => void;
    onRemove: () => void;
}> = ({ value, onReplace, onRemove }) => (
    <div className="flex items-start gap-4 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-4">
        {/* File icon */}
        <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-primary)]/10">
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--color-primary)]"
                aria-hidden="true"
            >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
            </svg>
        </div>

        {/* File info */}
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[var(--color-ink)]">
                {value.fileName || "File"}
            </p>
            <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[var(--color-muted)]">
                {value.fileSize > 0 && <span>{formatBytes(value.fileSize)}</span>}
                {value.mimeType && (
                    <span className="uppercase">{value.mimeType.split("/")[1]}</span>
                )}
                {value.uploadedAt && (
                    <span>{new Date(value.uploadedAt).toLocaleDateString()}</span>
                )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {value.url && (
                    <a
                        href={value.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[var(--radius-xs)] border border-[var(--color-hairline)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                        Download
                    </a>
                )}
                <button
                    type="button"
                    onClick={onReplace}
                    className="rounded-[var(--radius-xs)] border border-[var(--color-hairline)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                    Replace
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    className="rounded-[var(--radius-xs)] px-3 py-1.5 text-xs font-medium text-[var(--color-error)] transition-colors hover:bg-[var(--color-error)]/10"
                >
                    Remove
                </button>
            </div>
        </div>
    </div>
);

// ---- Main component --------------------------------------------------------

function FileUploadField<T extends FieldValues>({
    control,
    name,
    label,
    storagePath,
    allowedTypes = PDF_TYPES,
    hint,
    accept = "application/pdf",
}: FileUploadFieldProps<T>) {
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
                const current = field.value as StoredFile | null | undefined;
                const hasFile = Boolean(current?.url);

                const handleFile = async (file: File) => {
                    try {
                        validateFile(file, allowedTypes);
                    } catch (e) {
                        setUploadState({
                            status: "error",
                            message: e instanceof ImageUploadError ? e.message : String(e),
                        });
                        return;
                    }

                    if (current?.path) await deleteStorageFile(current.path);

                    setUploadState({ status: "uploading", progress: 0 });
                    try {
                        const cleanName = sanitizeFileName(file.name);
                        const { url, path, fileSize } = await uploadFile(
                            storagePath,
                            file,
                            (pct) => setUploadState({ status: "uploading", progress: pct })
                        );
                        const stored: StoredFile = {
                            url,
                            path,
                            fileName: cleanName,
                            fileSize,
                            mimeType: file.type,
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

                const handleDrop = useCallback(
                    (e: React.DragEvent<HTMLDivElement>) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files[0];
                        if (file) handleFile(file);
                    },
                    [current] // eslint-disable-line react-hooks/exhaustive-deps
                );

                const handleRemove = async () => {
                    if (current?.path) await deleteStorageFile(current.path);
                    field.onChange(null);
                };

                const handleSetUrl = () => {
                    if (!urlInput.trim()) return;
                    const stored: StoredFile = {
                        url: urlInput.trim(),
                        path: "",
                        fileName: urlInput.trim().split("/").pop() || "file",
                        fileSize: 0,
                        mimeType: "",
                    };
                    field.onChange(stored);
                    setUrlInput("");
                    setShowPicker(false);
                };

                return (
                    <div className="mb-5">
                        <label className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                            {label}
                        </label>
                        {hint && (
                            <p className="mb-2 text-xs text-[var(--color-muted)]">{hint}</p>
                        )}

                        {hasFile && !showPicker ? (
                            <FileCard
                                value={current!}
                                onReplace={() => setShowPicker(true)}
                                onRemove={handleRemove}
                            />
                        ) : (
                            <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-hairline)]">
                                {/* Tabs */}
                                <div className="flex border-b border-[var(--color-hairline)] bg-[var(--color-surface-soft)]">
                                    {(["upload", "url"] as const).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setTab(t)}
                                            className={clsx(
                                                "px-4 py-2 text-xs font-medium capitalize transition-colors",
                                                tab === t
                                                    ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                                                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                                            )}
                                        >
                                            {t === "upload" ? "Upload File" : "Paste URL"}
                                        </button>
                                    ))}
                                    {hasFile && (
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
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                                onDragLeave={() => setIsDragging(false)}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
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
                                                    PDF — max 5 MB
                                                </p>
                                            </div>

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept={accept}
                                                className="sr-only"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleFile(file);
                                                    e.target.value = "";
                                                }}
                                            />

                                            {uploadState.status === "uploading" && (
                                                <div className="mt-3">
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <span className="text-xs text-[var(--color-muted)]">Uploading…</span>
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
                                        <div>
                                            <p className="mb-2 text-xs text-[var(--color-muted)]">
                                                Google Drive, Dropbox, or any direct link
                                            </p>
                                            <div className="flex gap-2">
                                                <input
                                                    type="url"
                                                    placeholder="https://drive.google.com/..."
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
                                                    className="rounded-[var(--radius-xs)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-active)] disabled:opacity-40"
                                                >
                                                    Set
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {uploadState.status === "error" && (
                                        <p role="alert" className="mt-2 text-xs text-[var(--color-error)]">
                                            {uploadState.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

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

FileUploadField.displayName = "FileUploadField";

export default FileUploadField;
