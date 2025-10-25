// ============================================================
// Hook: useExportProgressOverlay
// Purpose: Progress overlay animation and mounting state management
// ============================================================

"use client";

import { useEffect, useState } from "react";

import { COMMON_ANIMATIONS } from "@/config";

// ============================================================
// Constants
// ============================================================

/** Progress update delay */
const PROGRESS_UPDATE_DELAY = 100;

/** Completion callback delay */
const COMPLETION_CALLBACK_DELAY = 1000;

/** Maximum progress value */
const MAX_PROGRESS = 100;

// ============================================================
// Types
// ============================================================

/** Props interface for useExportProgressOverlay hook */
interface UseExportProgressOverlayProps {
    /** Whether the overlay is visible */
    isVisible: boolean;
    /** Current progress percentage (0-100) */
    progress: number;
    /** Callback when export completes */
    onComplete?: () => void;
}

/** Return type for useExportProgressOverlay hook */
interface UseExportProgressOverlayReturn {
    /** Display progress value (may differ from actual progress) */
    displayProgress: number;
    /** Whether component is mounted (SSR safety) */
    mounted: boolean;
    /** Animation variants for overlay */
    overlayVariants: any;
    /** Animation variants for content */
    contentVariants: any;
}

// ============================================================
// Hook Implementation
// ============================================================

/**
 * Custom hook for managing progress overlay animations and SSR safety.
 * Provides smooth progress transitions, mounting state, and completion handling.
 *
 * @param props - Hook configuration props
 * @returns Object containing overlay state and animation variants
 *
 * @example
 * ```tsx
 * const {
 *   displayProgress,
 *   mounted,
 *   overlayVariants,
 *   contentVariants
 * } = useExportProgressOverlay({
 *   isVisible: isExporting,
 *   progress: exportProgress,
 *   onComplete: handleComplete
 * });
 * ```
 */
const useExportProgressOverlay = ({
    isVisible,
    progress,
    onComplete,
}: UseExportProgressOverlayProps): UseExportProgressOverlayReturn => {
    // ============================================================
    // State Management
    // ============================================================

    const [displayProgress, setDisplayProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    // ============================================================
    // SSR Safety
    // ============================================================

    /**
     * Sets mounted state to true after component mounts.
     * Prevents hydration mismatches by ensuring client-side rendering.
     */
    useEffect(() => {
        setMounted(true);
    }, []);

    // ============================================================
    // Progress Management
    // ============================================================

    /**
     * Updates display progress with smooth transitions.
     * Delays progress updates for better visual experience.
     */
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setDisplayProgress(progress);
            }, PROGRESS_UPDATE_DELAY);
            return () => clearTimeout(timer);
        } else {
            setDisplayProgress(0);
        }
    }, [progress, isVisible]);

    // ============================================================
    // Completion Handling
    // ============================================================

    /**
     * Handles completion callback when progress reaches 100%.
     * Delays callback execution for better UX.
     */
    useEffect(() => {
        if (progress >= MAX_PROGRESS && onComplete) {
            const timer = setTimeout(() => {
                onComplete();
            }, COMPLETION_CALLBACK_DELAY);
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    // ============================================================
    // Animation Configuration
    // ============================================================

    const overlayVariants = COMMON_ANIMATIONS.fadeIn;
    const contentVariants = COMMON_ANIMATIONS.scaleIn95;

    // ============================================================
    // Return Hook Interface
    // ============================================================

    return {
        displayProgress,
        mounted,
        overlayVariants,
        contentVariants,
    };
};

export default useExportProgressOverlay;
