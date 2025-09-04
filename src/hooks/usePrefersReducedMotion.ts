"use client"

import { useEffect, useState } from "react";

const usePrefersReducedMotion = (): boolean => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

    useEffect((): (() => void) | undefined => {
        if (typeof window === "undefined") return undefined;

        const mediaQuery: MediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent): void => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        return (): void => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
};

export default usePrefersReducedMotion;