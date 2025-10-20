"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

import type { DownloadResumeButtonProps } from "@/types";

import { HeroAnimationsConfig } from "@/config";

const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({
    cvLink,
}) => {
    const containerVariants = useMemo(
        () => HeroAnimationsConfig.downloadResume.container,
        []
    );
    const buttonVariants = useMemo(
        () => HeroAnimationsConfig.downloadResume.button,
        []
    );
    const buttonHoverVariants = useMemo(
        () => HeroAnimationsConfig.downloadResume.hover,
        []
    );

    return (
        <motion.div
            variants={containerVariants}
            initial={"hidden"}
            animate={"visible"}
            className={"hero-actions-container"}
            role={"group"}
            aria-label={"Action buttons"}
        >
            <Link
                href={cvLink || "#"}
                aria-label={"Download Resume"}
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
                    className={"primary-button"}
                    whileHover={"hover"}
                    whileTap={"tap"}
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
                    whileHover={"hover"}
                    whileTap={"tap"}
                    initial={"initial"}
                    animate={"visible"}
                    {...buttonHoverVariants}
                >
                    My Skills
                </motion.span>
            </Link>
        </motion.div>
    );
};

DownloadResumeButton.displayName = "DownloadResumeButton";

export default DownloadResumeButton;
