"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

interface Params {
    origin: string | null;
    url?: string;
    title?: string;
}

const useResolvedShare = ({ origin, url, title }: Params) => {
    const pathname = usePathname();

    const currentUrl = useMemo(() => {
        if (url) return url;
        if (!origin) return "";
        return `${origin}${pathname || ""}`;
    }, [origin, pathname, url]);

    const currentTitle = useMemo(() => {
        if (title) return title;
        if (typeof document !== "undefined" && document.title)
            return document.title;
        return "";
    }, [title]);

    return { currentUrl, currentTitle } as const;
};

export default useResolvedShare;
