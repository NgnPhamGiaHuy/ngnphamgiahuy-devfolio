"use client";

// ============================================================
// Component: CodeBlock
// Purpose: Syntax-highlighted code snippet with copy-to-clipboard support
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import type { CodeValue } from "@/types";

import { useCopyToClipboard } from "@/hooks";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "code-block",
    copyButton: "code-copy-button",
    code: "code-content",
} as const;

// ============================================================
// Types
// ============================================================
interface CodeBlockProps {
    value: CodeValue;
}

// ============================================================
// Component Definition
// ============================================================
/**
 * CodeBlock renders a syntax-highlighted code snippet with a copy button.
 * Designed for client-side interactivity and accessible feedback.
 *
 * @param props - Component props
 * @param props.value - Code and language metadata to render
 * @returns JSX.Element - Rendered component
 */
const CodeBlock = ({ value }: CodeBlockProps) => {
    const code = value?.code || "";
    const language = (value?.language || "text").toLowerCase();

    const [isSmallScreen, setIsSmallScreen] = React.useState(false);

    const { copied, error, copy } = useCopyToClipboard();

    React.useEffect(() => {
        const checkScreen = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const handleCopy = React.useCallback(() => copy(code), [copy, code]);

    if (!code) {
        return (
            <pre className="my-[35px] overflow-x-auto rounded-lg font-mono text-[15px] leading-[1.7] text-neutral-800 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-900 p-4 md:p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <code className="whitespace-pre">No code provided</code>
            </pre>
        );
    }

    return (
        <figure
            className="group my-[35px] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-50 dark:bg-neutral-900"
            aria-label={`Code snippet in ${language}`}
            data-testid={TEST_IDS.root}
        >
            <div className="h-[36px] flex items-center justify-between px-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60">
                <div className="flex items-center gap-1.5" aria-hidden>
                    <span className="size-[10px] rounded-full bg-red-400/80" />
                    <span className="size-[10px] rounded-full bg-yellow-300/80" />
                    <span className="size-[10px] rounded-full bg-green-400/80" />
                </div>
                <div className="text-[12px] px-2 py-0.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 font-medium">
                    {language}
                </div>
            </div>
            <div className="relative">
                <div
                    className="overflow-x-auto p-4 md:p-5"
                    data-testid={TEST_IDS.code}
                >
                    <SyntaxHighlighter
                        language={language}
                        style={oneDark as any}
                        customStyle={{
                            margin: 0,
                            background: "transparent",
                            padding: 0,
                        }}
                        wrapLongLines={isSmallScreen}
                        showLineNumbers={false}
                        codeTagProps={{
                            style: {
                                fontFamily:
                                    "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace)",
                                fontSize: "clamp(12px, 2.2vw, 15px)",
                                lineHeight: 1.7,
                                whiteSpace: isSmallScreen ? "pre-wrap" : "pre",
                            },
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
                <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={
                        error
                            ? "Copy failed"
                            : copied
                              ? "Code copied"
                              : "Copy code"
                    }
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[12px] px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-800"
                    data-testid={TEST_IDS.copyButton}
                >
                    {error ? "Failed" : copied ? "Copied" : "Copy"}
                </button>
                <span className="sr-only" aria-live="polite">
                    {error
                        ? "Copy failed"
                        : copied
                          ? "Code copied"
                          : "Copy code"}
                </span>
            </div>
        </figure>
    );
};

// ============================================================
// Export
// ============================================================
export default CodeBlock;

// DX: Explicit display name for clearer React DevTools identification
CodeBlock.displayName = "CodeBlock";
