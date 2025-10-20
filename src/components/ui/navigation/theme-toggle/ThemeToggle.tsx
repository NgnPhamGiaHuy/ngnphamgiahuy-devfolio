"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import type { ThemeToggleProps } from "@/types";

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const lastToggleTimeRef = useRef<number>(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = useCallback(() => {
        const now = Date.now();
        if (now - lastToggleTimeRef.current < 200) {
            return;
        }
        lastToggleTimeRef.current = now;
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme, setTheme]);

    const nextModeLabel = useMemo(
        () => (resolvedTheme === "dark" ? "light" : "dark"),
        [resolvedTheme]
    );

    if (!mounted) {
        return (
            <button
                type={"button"}
                className={`mr-10 size-8 flex-center align-middle cursor-pointer text-inverse transition-all relative ${className || ""}`}
                aria-label={"Theme toggle"}
                aria-pressed={false}
                title={"Toggle theme"}
                disabled
            >
                <div className={"size-7"} />
            </button>
        );
    }

    return (
        <button
            type={"button"}
            className={`mr-10 size-8 flex-center align-middle cursor-pointer text-inverse transition-all relative ${className || ""}`}
            onClick={handleToggle}
            aria-label={`Switch to ${nextModeLabel} mode`}
            aria-pressed={resolvedTheme === "dark"}
            title={`Switch to ${nextModeLabel} mode`}
        >
            {resolvedTheme === "dark" ? (
                <SunIcon className={"size-7"} />
            ) : (
                <MoonIcon className={"size-7"} />
            )}
        </button>
    );
};

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
