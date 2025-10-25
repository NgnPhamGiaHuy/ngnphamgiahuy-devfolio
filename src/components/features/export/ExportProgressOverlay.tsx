// ============================================================
// Component: ExportProgressOverlay
// Purpose: Full-screen progress overlay with animations and portal rendering
// ============================================================

"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import { getProgressStatusMessage } from "@/utils";
import useExportProgressOverlay from "./hooks/useExportProgressOverlay";

// ============================================================
// Constants
// ============================================================

/** Default progress message */
const DEFAULT_PROGRESS_MESSAGE = "Exporting your data...";

/** Default progress value */
const DEFAULT_PROGRESS = 0;

/** Animation durations */
const ANIMATION_DURATIONS = {
    CIRCLE: 0.8,
    ICON: 1.5,
    TEXT_DELAY: 0.2,
    BAR_DELAY: 0.4,
    STATUS_DELAY: 0.6,
} as const;

/** SVG circle properties */
const CIRCLE_PROPS = {
    RADIUS: 45,
    STROKE_WIDTH: 8,
    CIRCUMFERENCE: 283, // 2 * π * 45
} as const;

// ============================================================
// Types
// ============================================================

/** Props interface for ExportProgressOverlay component */
interface ExportProgressOverlayProps {
    /** Whether the overlay is visible */
    isVisible: boolean;
    /** Progress percentage (0-100) */
    progress?: number;
    /** Custom progress message */
    message?: string;
    /** Callback when export completes */
    onComplete?: () => void;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportProgressOverlay component provides a full-screen progress indicator.
 * Features portal rendering, animated progress circle, and accessibility support.
 *
 * @param props - Component props
 * @returns JSX element representing the progress overlay
 *
 * @example
 * ```tsx
 * <ExportProgressOverlay
 *   isVisible={isExporting}
 *   progress={exportProgress}
 *   message="Processing your data..."
 *   onComplete={handleComplete}
 * />
 * ```
 */
const ExportProgressOverlay: React.FC<ExportProgressOverlayProps> = ({
    isVisible,
    progress = DEFAULT_PROGRESS,
    message = DEFAULT_PROGRESS_MESSAGE,
    onComplete,
}) => {
    // ============================================================
    // Custom Hook
    // ============================================================

    const { displayProgress, mounted, overlayVariants, contentVariants } =
        useExportProgressOverlay({
            isVisible,
            progress,
            onComplete,
        });

    // ============================================================
    // Computed Values
    // ============================================================

    const overlayClassName =
        "fixed inset-0 z-[9999] flex items-center justify-center";
    const contentClassName = "relative z-10 w-full max-w-md mx-4";
    const modalClassName =
        "bg-card-inverse/95 backdrop-blur-sm rounded-2xl shadow-xl border border-border-inverse/20 p-8 text-center";
    const progressCircleClassName = "w-20 h-20 transform -rotate-90";
    const backgroundCircleClassName = "text-border-inverse/20";
    const progressCircleClassNameActive = "text-primary";
    const iconClassName = "w-6 h-6 text-primary";
    const progressBarClassName =
        "w-full bg-border-inverse/20 rounded-full h-2 overflow-hidden";
    const progressBarFillClassName = "h-2 bg-primary rounded-full";
    const statusTextClassName = "mt-4 text-sm text-inverse/70";

    // ============================================================
    // SSR Safety Check
    // ============================================================

    if (!mounted) {
        return null;
    }

    // ============================================================
    // Render
    // ============================================================

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={overlayClassName}
                    aria-busy="true"
                    aria-live="polite"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Export Progress"
                    data-testid="export-progress-overlay"
                >
                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={contentClassName}
                    >
                        <div className={modalClassName}>
                            {/* Progress Circle */}
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <svg
                                    className={progressCircleClassName}
                                    viewBox="0 0 100 100"
                                >
                                    {/* Background circle */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={CIRCLE_PROPS.RADIUS}
                                        stroke="currentColor"
                                        strokeWidth={CIRCLE_PROPS.STROKE_WIDTH}
                                        fill="none"
                                        className={backgroundCircleClassName}
                                    />

                                    {/* Progress circle */}
                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r={CIRCLE_PROPS.RADIUS}
                                        stroke="currentColor"
                                        strokeWidth={CIRCLE_PROPS.STROKE_WIDTH}
                                        fill="none"
                                        strokeLinecap="round"
                                        className={
                                            progressCircleClassNameActive
                                        }
                                        initial={{
                                            strokeDasharray:
                                                CIRCLE_PROPS.CIRCUMFERENCE.toString(),
                                            strokeDashoffset:
                                                CIRCLE_PROPS.CIRCUMFERENCE.toString(),
                                        }}
                                        animate={{
                                            strokeDashoffset:
                                                CIRCLE_PROPS.CIRCUMFERENCE -
                                                (CIRCLE_PROPS.CIRCUMFERENCE *
                                                    displayProgress) /
                                                    100,
                                        }}
                                        transition={{
                                            duration:
                                                ANIMATION_DURATIONS.CIRCLE,
                                            ease: "easeOut",
                                        }}
                                    />
                                </svg>

                                {/* Animated icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        className="w-6 h-6"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.7, 1, 0.7],
                                        }}
                                        transition={{
                                            duration: ANIMATION_DURATIONS.ICON,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <ArrowDownTrayIcon
                                            className={iconClassName}
                                        />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Progress Text */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: ANIMATION_DURATIONS.TEXT_DELAY,
                                }}
                                className="mb-4"
                            >
                                <h3 className="text-xl font-bold text-inverse mb-2">
                                    {message}
                                </h3>
                                <div className="text-2xl font-bold text-primary">
                                    {Math.round(displayProgress)}%
                                </div>
                            </motion.div>

                            {/* Progress Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: ANIMATION_DURATIONS.BAR_DELAY,
                                }}
                                className="w-full"
                            >
                                <div className={progressBarClassName}>
                                    <motion.div
                                        className={progressBarFillClassName}
                                        initial={{ width: "0%" }}
                                        animate={{
                                            width: `${displayProgress}%`,
                                        }}
                                        transition={{
                                            duration:
                                                ANIMATION_DURATIONS.CIRCLE,
                                            ease: "easeOut",
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* Status Text */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: ANIMATION_DURATIONS.STATUS_DELAY,
                                }}
                                className={statusTextClassName}
                            >
                                {getProgressStatusMessage(displayProgress)}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportProgressOverlay.displayName = "ExportProgressOverlay";

export default ExportProgressOverlay;
