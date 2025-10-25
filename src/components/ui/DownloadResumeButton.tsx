// ============================================================
// Component: DownloadResumeButton
// Purpose: Download resume button with animations and secondary action
// ============================================================

"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

import type { DownloadResumeButtonProps } from "@/types";

import { HeroAnimationsConfig } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * DownloadResumeButton component renders action buttons for resume download and skills view.
 * Features animations, accessibility, and proper link handling.
 *
 * @param props - Component props
 * @param props.cvLink - Resume/CV download link
 * @returns Download resume button component
 */
const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({
    cvLink,
    ...props
}) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    // Remove unnecessary useMemo - animation variants are static objects
    const containerVariants = HeroAnimationsConfig.downloadResume.container;
    const buttonVariants = HeroAnimationsConfig.downloadResume.button;
    const buttonHoverVariants = HeroAnimationsConfig.downloadResume.hover;

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-actions-container"
            role="group"
            aria-label="Action buttons"
            data-testid="download-resume-container"
            {...props}
        >
            {/* Download Resume Button */}
            <Link
                href={cvLink || "#"}
                aria-label="Download Resume"
                prefetch={false}
                {...(cvLink
                    ? ({
                          download: true,
                          target: "_blank",
                          rel: "noopener noreferrer",
                      } as const)
                    : {})}
            >
                <motion.span
                    variants={buttonVariants}
                    className="primary-button"
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                    animate="visible"
                    {...buttonHoverVariants}
                    data-testid="download-resume-button"
                >
                    Download Resume
                </motion.span>
            </Link>

            {/* View Skills Button */}
            <Link href="#skills" aria-label="View my skills" prefetch={false}>
                <motion.span
                    variants={buttonVariants}
                    className="my-skill"
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                    animate="visible"
                    {...buttonHoverVariants}
                    data-testid="view-skills-button"
                >
                    My Skills
                </motion.span>
            </Link>
        </motion.div>
    );
};

DownloadResumeButton.displayName = "DownloadResumeButton";

export default DownloadResumeButton;
