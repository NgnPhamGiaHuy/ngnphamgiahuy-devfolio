import React, { useState, useEffect, useCallback } from "react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const useSidebarAnimation = (isMenuOpen: boolean) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [sidebarEntered, setSidebarEntered] = useState<boolean>(false);

    const handleTransitionEnd = useCallback((event: React.TransitionEvent<HTMLDivElement>) => {
        if (isMenuOpen && event.target === event.currentTarget) {
            setSidebarEntered(true);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isMenuOpen) {
            setSidebarEntered(false);
        } else if (prefersReducedMotion) {
            setSidebarEntered(true);
        } else {
            const timer = setTimeout(() => {
                if (isMenuOpen) {
                    setSidebarEntered(true);
                }
            }, 850);

            return () => clearTimeout(timer);
        }
    }, [isMenuOpen, prefersReducedMotion]);

    return { sidebarEntered, handleTransitionEnd, prefersReducedMotion };
};

export default useSidebarAnimation;
