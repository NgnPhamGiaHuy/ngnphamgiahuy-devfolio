"use client"

import React, { useState, useEffect, useCallback } from "react";

const useSidebarAnimation = (isMenuOpen: boolean) => {
    const [sidebarEntered, setSidebarEntered] = useState<boolean>(false);

    const handleTransitionEnd = useCallback((event: React.TransitionEvent<HTMLDivElement>) => {
        if (isMenuOpen && event.target === event.currentTarget) {
            setSidebarEntered(true);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isMenuOpen) {
            setSidebarEntered(false);
        } else {
            const timer = setTimeout(() => {
                if (isMenuOpen) {
                    setSidebarEntered(true);
                }
            }, 850);

            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    return { sidebarEntered, handleTransitionEnd };
};

export default useSidebarAnimation;
