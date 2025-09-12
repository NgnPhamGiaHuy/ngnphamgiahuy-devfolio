"use client";

import { useCallback, useEffect, useState } from "react";

const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleDarkMode = useCallback((): void => {
        const newDarkMode = !isDarkMode;
        
        setIsDarkMode(newDarkMode);
        document.documentElement.classList.toggle("dark", newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    useEffect(() => {
        const initializeTheme = (): void => {
            const savedTheme = localStorage.getItem("theme");

            if (savedTheme) {
                const isDark = savedTheme === "dark";
                setIsDarkMode(isDark);
                document.documentElement.classList.toggle("dark", isDark);
            } else {
                const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                setIsDarkMode(systemPrefersDark);
                document.documentElement.classList.toggle("dark", systemPrefersDark);
            }
        };

        initializeTheme();
    }, []);

    return { isDarkMode, toggleDarkMode };
};

export default useTheme;