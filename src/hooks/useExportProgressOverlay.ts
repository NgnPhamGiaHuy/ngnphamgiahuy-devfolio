"use client";

import { useEffect, useState, useMemo } from "react";

import { COMMON_ANIMATIONS } from "@/config";

interface UseExportProgressOverlayProps {
    isVisible: boolean;
    progress: number;
    onComplete?: () => void;
}

const useExportProgressOverlay = ({
    isVisible,
    progress,
    onComplete,
}: UseExportProgressOverlayProps) => {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setDisplayProgress(progress);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setDisplayProgress(0);
        }
    }, [progress, isVisible]);

    useEffect(() => {
        if (progress >= 100 && onComplete) {
            const timer = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    const overlayVariants = useMemo(() => COMMON_ANIMATIONS.fadeIn, []);
    const contentVariants = useMemo(() => COMMON_ANIMATIONS.scaleIn95, []);

    return {
        displayProgress,
        mounted,
        overlayVariants,
        contentVariants,
    };
};

export default useExportProgressOverlay;
