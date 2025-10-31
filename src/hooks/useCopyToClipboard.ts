"use client";

import React from "react";

import { copyTextWithFallback } from "@/utils";

interface UseCopyToClipboardOptions {
    resetAfterMs?: number;
}

interface UseCopyToClipboardReturn {
    copied: boolean;
    error: string | null;
    copy: (text: string) => Promise<void>;
}

const useCopyToClipboard = (
    options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn => {
    const { resetAfterMs = 1500 } = options;

    const [copied, setCopied] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = React.useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const scheduleReset = React.useCallback(() => {
        clearTimer();
        timerRef.current = setTimeout(() => {
            setCopied(false);
            setError(null);
            timerRef.current = null;
        }, resetAfterMs);
    }, [clearTimer, resetAfterMs]);

    const copy = React.useCallback(
        async (text: string) => {
            // Prepare for a new copy attempt; cancel any pending resets
            clearTimer();
            setCopied(false);
            setError(null);
            try {
                await copyTextWithFallback(text);
                setCopied(true);
                scheduleReset();
            } catch (err) {
                const message =
                    (err as Error)?.message ||
                    "Failed to copy. Please copy the text manually.";
                setError(message);
                scheduleReset();
            }
        },
        [clearTimer, scheduleReset]
    );

    React.useEffect(() => () => clearTimer(), [clearTimer]);

    return { copied, error, copy };
};

export default useCopyToClipboard;
