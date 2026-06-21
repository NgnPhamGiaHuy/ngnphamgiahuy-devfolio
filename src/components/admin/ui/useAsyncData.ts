"use client";

// ============================================================
// Hook: useAsyncData
// Purpose: Minimal client loader for admin reads (load once + reload).
// ============================================================
import { useCallback, useEffect, useState } from "react";

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    reload: () => void;
}

export function useAsyncData<T>(loader: () => Promise<T>): AsyncState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const run = useCallback(() => {
        setLoading(true);
        loader()
            .then((d) => {
                setData(d);
                setError(null);
            })
            .catch((e: unknown) =>
                setError(e instanceof Error ? e.message : String(e))
            )
            .finally(() => setLoading(false));
        // loader is expected to be stable; intentionally not a dep.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => run(), [run]);

    return { data, loading, error, reload: run };
}
