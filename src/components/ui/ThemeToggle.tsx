// ============================================================
// Component: ThemeToggle
// Purpose: Theme toggle button with accessibility and debouncing
// ============================================================

"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useRef, useState } from "react";

import type { ThemeToggleProps } from "@/types";

// ============================================================
// Component Definition
// ============================================================

/**
 * ThemeToggle component renders a theme switching button.
 * Features accessibility, debouncing, and SSR-safe hydration.
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @returns Theme toggle component
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, ...props }) => {
    // ============================================================
    // State & Refs
    // ============================================================

    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const lastToggleTimeRef = useRef<number>(0);

    // ============================================================
    // Effects
    // ============================================================

    useEffect(() => {
        setMounted(true);
    }, []);

    // ============================================================
    // Event Handlers
    // ============================================================

    const handleToggle = useCallback(() => {
        const now = Date.now();
        // Debounce rapid clicks to prevent theme flickering
        if (now - lastToggleTimeRef.current < 200) {
            return;
        }
        lastToggleTimeRef.current = now;
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme, setTheme]);

    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple string operation doesn't need memoization
    const nextModeLabel = resolvedTheme === "dark" ? "light" : "dark";

    // ============================================================
    // Render
    // ============================================================

    // Prevent hydration mismatch by showing placeholder until mounted
    if (!mounted) {
        return (
            <button
                type="button"
                className={`mr-10 size-8 flex-center align-middle cursor-pointer text-inverse transition-all relative ${className || ""}`}
                aria-label="Theme toggle"
                aria-pressed={false}
                title="Toggle theme"
                disabled
                data-testid="theme-toggle-loading"
                {...props}
            >
                <div className="size-7" />
            </button>
        );
    }

    return (
        <button
            type="button"
            className={`mr-10 size-8 flex-center align-middle cursor-pointer text-inverse transition-all relative ${className || ""}`}
            onClick={handleToggle}
            aria-label={`Switch to ${nextModeLabel} mode`}
            aria-pressed={resolvedTheme === "dark"}
            title={`Switch to ${nextModeLabel} mode`}
            data-testid="theme-toggle"
            {...props}
        >
            {resolvedTheme === "dark" ? (
                <SunIcon className="size-7" aria-hidden="true" />
            ) : (
                <MoonIcon className="size-7" aria-hidden="true" />
            )}
        </button>
    );
};

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
