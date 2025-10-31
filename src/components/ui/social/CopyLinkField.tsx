"use client";

// ============================================================
// Component: CopyLinkField
// Purpose: Read-only URL input with a copy-to-clipboard button
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";
import { Link2, Copy, Check } from "lucide-react";

import { useCopyToClipboard } from "@/hooks";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "copy-link-field",
    input: "copy-link-input",
    button: "copy-link-button",
    status: "copy-link-status",
} as const;

// ============================================================
// Types
// ============================================================
interface CopyLinkFieldProps {
    url: string;
}

// ============================================================
// Component Definition
// ============================================================
/**
 * CopyLinkField renders a labeled, read-only URL with a copy action.
 * Provides accessible feedback for copied/error states.
 *
 * @param props - Component props
 * @param props.url - The absolute or shareable URL to copy
 * @returns JSX.Element - Rendered component
 */
const CopyLinkField: React.FC<CopyLinkFieldProps> = ({ url }) => {
    const { copied, error, copy } = useCopyToClipboard({ resetAfterMs: 1500 });
    const onCopy = React.useCallback(() => copy(url), [copy, url]);

    return (
        <div className="w-full max-w-md" data-testid={TEST_IDS.root}>
            <label
                className="mb-1 block text-xs text-muted-foreground"
                htmlFor="share-url"
            >
                Copy link
            </label>
            <div className="px-4 py-2 flex items-center gap-2 rounded-lg border border-border bg-transparent">
                <span className="size-7 inline-flex items-center justify-center">
                    <Link2 className="size-4 text-inverse" aria-hidden="true" />
                </span>

                <input
                    id="share-url"
                    type="text"
                    readOnly
                    value={url}
                    dir="ltr"
                    title={url}
                    className="min-w-0 flex-1 text-xs text-inverse/80! truncate bg-transparent outline-none"
                    onFocus={(e) => e.currentTarget.select()}
                    data-testid={TEST_IDS.input}
                />

                <button
                    type="button"
                    onClick={onCopy}
                    aria-label={
                        copied
                            ? "Link copied to clipboard"
                            : "Copy link to clipboard"
                    }
                    className="w-20 h-8 px-2.5 inline-flex items-center justify-center gap-1 text-xs text-inverse! hover:text-primary! font-medium border border-inverse! hover:border-primary! rounded-md transition-all duration-300 active:scale-95 cursor-pointer"
                    data-copied={copied ? "true" : "false"}
                    data-testid={TEST_IDS.button}
                >
                    {copied ? (
                        <>
                            <Check className="size-4" aria-hidden="true" />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="size-4" aria-hidden="true" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            {/* Live region for async copy status messages */}
            <p
                className="sr-only"
                role="status"
                aria-live="polite"
                data-testid={TEST_IDS.status}
            >
                {error ? error : copied ? "Link copied to clipboard" : "Ready"}
            </p>
            {error && (
                <p
                    className="mt-2 text-xs text-red-500"
                    role="status"
                    aria-live="polite"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

// ============================================================
// Export
// ============================================================
export default CopyLinkField;

// DX: Explicit display name for clearer React DevTools identification
CopyLinkField.displayName = "CopyLinkField";
