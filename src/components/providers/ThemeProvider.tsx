// ============================================================
// Component: ThemeProvider
// Purpose: Theme context provider with SSR-safe hydration handling
// ============================================================

"use client";

import React, { useEffect, useState } from "react";
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

    // Prevent hydration mismatch by rendering placeholder until mounted
    if (!mounted) {
        return (
            <div suppressHydrationWarning data-testid="theme-provider-loading">
                {children}
            </div>
        );
    }

    return (
        <NextThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            data-testid="theme-provider"
        >
            {children}
        </NextThemeProvider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
