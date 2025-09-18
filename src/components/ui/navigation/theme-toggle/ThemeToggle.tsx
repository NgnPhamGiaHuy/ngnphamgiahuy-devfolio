"use client"

import { useTheme } from "next-themes";
import React, { memo, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import type { ThemeToggleProps } from "@/types";

const ThemeToggle: React.FC<ThemeToggleProps> = memo(({ className }) => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    if (!mounted) {
        return (
            <div className={`header-toggle-theme ${className || ""}`} role={"button"} tabIndex={0} aria-label={"Theme toggle"}>
                <div className={"w-7 h-7"} />
            </div>
        );
    }

    return (
        <div
            className={`header-toggle-theme ${className || ""}`}
            onClick={handleToggle}
            role={"button"}
            tabIndex={0}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        >
            {resolvedTheme === "dark" ? (
                <SunIcon className={"w-7 h-7"} />
            ) : (
                <MoonIcon className={"w-7 h-7"} />
            )}
        </div>
    );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;


