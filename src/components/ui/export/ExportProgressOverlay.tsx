"use client";

import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import type { ExportProgressOverlayProps } from "@/types";

import { getProgressStatusMessage } from "@/utils";
import { useExportProgressOverlay } from "@/hooks";

const ExportProgressOverlay: React.FC<ExportProgressOverlayProps> = ({
    isVisible,
    progress = 0,
    message = "Exporting your data...",
    onComplete,
}) => {
    const { displayProgress, mounted, overlayVariants, contentVariants } =
        useExportProgressOverlay({
            isVisible,
            progress,
            onComplete,
        });

    const overlayClassName = useMemo(
        () => "fixed inset-0 z-[9999] flex items-center justify-center",
        []
    );

    const contentClassName = useMemo(
        () => "relative z-10 w-full max-w-md mx-4",
        []
    );

    const modalClassName = useMemo(
        () =>
            "bg-card-inverse/95 backdrop-blur-sm rounded-2xl shadow-xl border border-border-inverse/20 p-8 text-center",
        []
    );

    const progressCircleClassName = useMemo(
        () => "w-20 h-20 transform -rotate-90",
        []
    );

    const backgroundCircleClassName = useMemo(
        () => "text-border-inverse/20",
        []
    );

    const progressCircleClassNameActive = useMemo(() => "text-primary", []);

    const iconClassName = useMemo(() => "w-6 h-6 text-primary", []);

    const progressBarClassName = useMemo(
        () => "w-full bg-border-inverse/20 rounded-full h-2 overflow-hidden",
        []
    );

    const progressBarFillClassName = useMemo(
        () => "h-2 bg-primary rounded-full",
        []
    );

    const statusTextClassName = useMemo(
        () => "mt-4 text-sm text-inverse/70",
        []
    );

    if (!mounted) {
        return null;
    }

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
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={contentClassName}
                    >
                        <div className={modalClassName}>
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <svg
                                    className={progressCircleClassName}
                                    viewBox="0 0 100 100"
                                >
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        className={backgroundCircleClassName}
                                    />
                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        className={
                                            progressCircleClassNameActive
                                        }
                                        initial={{
                                            strokeDasharray: "283",
                                            strokeDashoffset: "283",
                                        }}
                                        animate={{
                                            strokeDashoffset:
                                                283 -
                                                (283 * displayProgress) / 100,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                    />
                                </svg>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        className="w-6 h-6"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.7, 1, 0.7],
                                        }}
                                        transition={{
                                            duration: 1.5,
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

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mb-4"
                            >
                                <h3 className="text-xl font-bold text-inverse mb-2">
                                    {message}
                                </h3>
                                <div className="text-2xl font-bold text-primary">
                                    {Math.round(displayProgress)}%
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
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
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
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

ExportProgressOverlay.displayName = "ExportProgressOverlay";

export default ExportProgressOverlay;
