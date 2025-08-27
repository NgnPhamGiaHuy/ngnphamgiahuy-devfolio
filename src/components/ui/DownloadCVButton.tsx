"use client"

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import { DownloadCVButtonProps } from "@/types";

const DownloadCVButton: React.FC<DownloadCVButtonProps> = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                delayChildren: 0.2,
                staggerChildren: 0.2
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.4
            }
        }
    };

    return (
        <motion.div variants={containerVariants as Variants} initial={"hidden"} animate={"visible"}>
            <Link href={"/"}>
                <motion.span variants={buttonVariants as Variants} className={"primary-button"}>
                    Download CV
                </motion.span>
            </Link>
            <Link href={"/"}>
                <motion.span variants={buttonVariants as Variants} className={"my-skill"}>
                    My Skills
                </motion.span>
            </Link>
        </motion.div>
    );
};

export default DownloadCVButton;
