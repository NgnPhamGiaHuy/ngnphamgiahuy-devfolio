"use client";

import Link from "next/link";
import React, { memo } from "react";
import { motion } from "framer-motion";

import type { DownloadResumeButtonProps } from "@/types";

import { StandardAnimations } from "@/config";
import { usePrefersReducedMotion } from "@/hooks";

const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = memo(({ cvLink }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const containerVariants = StandardAnimations.springUp(prefersReducedMotion, 30);
    const buttonVariants = StandardAnimations.fadeInUp(prefersReducedMotion, 15);
    const buttonHoverVariants = StandardAnimations.buttonHover(prefersReducedMotion);

    return (
        <motion.div
            variants={containerVariants}
            initial={"hidden"}
            animate={"visible"}
            className={"hero-actions-container"}
            role={"group"}
            aria-label={"Action buttons"}
        >
            <Link href={cvLink || "#"} aria-label={"Download Resume"}>
                <motion.span
                    variants={buttonVariants}
                    className={"primary-button"}
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    whileTap={prefersReducedMotion ? undefined : "tap"}
                    initial={"initial"}
                    animate={"visible"}
                    {...buttonHoverVariants}
                >
                    Download Resume
                </motion.span>
            </Link>
            <Link href={"#skills"} aria-label={"View my skills"}>
                <motion.span
                    variants={buttonVariants}
                    className={"my-skill"}
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    whileTap={prefersReducedMotion ? undefined : "tap"}
                    initial={"initial"}
                    animate={"visible"}
                    {...buttonHoverVariants}
                >
                    My Skills
                </motion.span>
            </Link>
        </motion.div>
    );
});

DownloadResumeButton.displayName = "DownloadResumeButton";

export default DownloadResumeButton;
