// ============================================================
// Component: ThemeProvider
// Purpose: Theme context provider with SSR-safe hydration handling
// ============================================================

"use client";

import React, { useEffect, useState } from "react";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { ThemeProvider as NextThemeProvider } from "next-themes";

// ============================================================
// Component Props
// ============================================================

interface ThemeProviderProps {
    children: React.ReactNode;
}

// ============================================================
// Component Definition
// ============================================================

/**
 * ThemeProvider component wraps the application with theme context.
 * Features SSR-safe hydration, system theme detection, and proper accessibility.
 *
 * @param props - Component props
 * @param props.children - Child components to wrap with theme context
 * @returns Theme provider component
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // ============================================================
    // State
    // ============================================================

    const [mounted, setMounted] = useState(false);

    // ============================================================
    // Effects
    // ============================================================

    useEffect(() => {
        setMounted(true);
    }, []);

    // ============================================================
    // Render
    // ============================================================

    // LazyMotion + the `m` component (used everywhere instead of `motion`) ships
    // only the domAnimation feature bundle instead of the full motion factory —
    // the main First-Load-JS win. reducedMotion="user" makes every animation
    // honor the OS prefers-reduced-motion setting (accessibility baseline).
    const content = (
        <LazyMotion features={domAnimation}>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
    );

    // Prevent hydration mismatch by rendering placeholder until mounted
    if (!mounted) {
        return (
            <div suppressHydrationWarning data-testid="theme-provider-loading">
                {content}
            </div>
        );
    }

    return (
        <NextThemeProvider
            attribute="data-theme"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
            data-testid="theme-provider"
        >
            {content}
        </NextThemeProvider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
