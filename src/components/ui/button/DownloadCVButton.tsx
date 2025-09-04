"use client";

import Link from "next/link";
import React, { memo } from "react";
import { motion } from "framer-motion";

import { data } from "@/data/data";
import { DownloadCVButtonProps } from "@/types";

import { StandardAnimations } from "@/config/animation.config";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const DownloadCVButton: React.FC<DownloadCVButtonProps> = memo(() => {
    const { profile } = data;
    const prefersReducedMotion = usePrefersReducedMotion();

    // Use standardized animation variants from our config
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
            <Link href={profile.cv_link || "#"} aria-label={"Download CV"}>
                <motion.span
                    variants={buttonVariants}
                    className={"primary-button"}
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    whileTap={prefersReducedMotion ? undefined : "tap"}
                    initial={"initial"}
                    animate={"visible"}
                    {...buttonHoverVariants}
                >
                    Download CV
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

DownloadCVButton.displayName = "DownloadCVButton";

export default DownloadCVButton;
