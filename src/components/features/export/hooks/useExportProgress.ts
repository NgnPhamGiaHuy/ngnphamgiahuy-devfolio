// ============================================================
// Hook: useExportProgress
// Purpose: Progress state management and simulation
// ============================================================

import { useState, useCallback } from "react";

// ============================================================
// Constants
// ============================================================

/** Default progress message */
const DEFAULT_PROGRESS_MESSAGE = "Exporting your data...";

/** Progress simulation interval */
const PROGRESS_INTERVAL = 200;

/** Progress increment range */
const PROGRESS_INCREMENT = {
    MIN: 5,
    MAX: 20, // 5 + 15
} as const;

/** Completion delay */
const COMPLETION_DELAY = 1500;

/** Maximum progress value */
const MAX_PROGRESS = 100;

// ============================================================
// Types
// ============================================================

/** Return type for useExportProgress hook */
interface UseExportProgressReturn {
    /** Whether progress overlay is visible */
    isVisible: boolean;
    /** Current progress percentage (0-100) */
    progress: number;
    /** Current progress message */
    message: string;
    /** Function to start export progress */
    startExport: (customMessage?: string) => () => void;
    /** Function to complete export progress */
    completeExport: () => void;
    /** Function to hide progress overlay */
    hideOverlay: () => void;
    /** Function to set progress directly */
    setProgress: (progress: number) => void;
    /** Function to set progress message */
    setMessage: (message: string) => void;
}

// ============================================================
// Hook Implementation
// ============================================================

/**
 * Custom hook for managing export progress state and simulation.
 * Provides progress tracking, overlay visibility, and message management.
 *
 * @returns Object containing progress state and control functions
 *
 * @example
 * ```tsx
 * const {
 *   isVisible,
 *   progress,
 *   message,
 *   startExport,
 *   completeExport
 * } = useExportProgress();
 *
 * const handleExport = () => {
 *   const stopProgress = startExport("Processing data...");
 *   // ... export logic
 *   completeExport();
 * };
 * ```
 */
const useExportProgress = (): UseExportProgressReturn => {
    // ============================================================
    // State Management
    // ============================================================

    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState(DEFAULT_PROGRESS_MESSAGE);

    // ============================================================
    // Progress Control Functions
    // ============================================================

    /**
     * Starts export progress simulation.
     * Shows overlay, resets progress, and begins incremental updates.
     *
     * @param customMessage - Optional custom progress message
     * @returns Function to stop the progress simulation
     */
    const startExport = useCallback((customMessage?: string) => {
        setIsVisible(true);
        setProgress(0);
        setMessage(customMessage || DEFAULT_PROGRESS_MESSAGE);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= MAX_PROGRESS) {
                    clearInterval(interval);
                    return MAX_PROGRESS;
                }
                // Random increment between 5-20 for realistic progress
                const increment =
                    Math.random() *
                        (PROGRESS_INCREMENT.MAX - PROGRESS_INCREMENT.MIN) +
                    PROGRESS_INCREMENT.MIN;
                return Math.min(prev + increment, MAX_PROGRESS);
            });
        }, PROGRESS_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    /**
     * Completes export progress and hides overlay after delay.
     * Sets progress to 100% and schedules overlay dismissal.
     */
    const completeExport = useCallback(() => {
        setProgress(MAX_PROGRESS);
        setTimeout(() => {
            setIsVisible(false);
            setProgress(0);
        }, COMPLETION_DELAY);
    }, []);

    /**
     * Immediately hides progress overlay and resets progress.
     * Useful for error cases or manual cancellation.
     */
    const hideOverlay = useCallback(() => {
        setIsVisible(false);
        setProgress(0);
    }, []);

    // ============================================================
    // Return Hook Interface
    // ============================================================

    return {
        isVisible,
        progress,
        message,
        startExport,
        completeExport,
        hideOverlay,
        setProgress,
        setMessage,
    };
};

export default useExportProgress;
