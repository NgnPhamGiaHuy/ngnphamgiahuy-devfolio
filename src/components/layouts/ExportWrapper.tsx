// ============================================================
// Component: ExportWrapper
// Purpose: Reusable wrapper component for export sections with animations
// ============================================================

"use client";

import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

import { WrapperHeader } from "@/components";
import { backgroundByName, containerVariants } from "@/config";

// ============================================================
// Constants
// ============================================================

/** Default content max width */
const DEFAULT_CONTENT_MAX_WIDTH = "1300px";

/** Default animation trigger amount */
const DEFAULT_ANIMATION_AMOUNT = 0.1;

/** Responsive padding classes */
const RESPONSIVE_PADDING_CLASSES = "max-md:px-[10px] max-lg:px-[20px]";

// ============================================================
// Types
// ============================================================

/** Background variant options */
type BackgroundVariant = "gradientUp" | "gradientDown" | "none";

/** Props interface for ExportWrapper component */
interface ExportWrapperProps {
    /** Unique identifier for the section */
    id: string;
    /** Section title */
    title: string;
    /** Section subtitle */
    subtitle: string;
    /** Maximum width for content container */
    contentMaxWidth?: string;
    /** Background variant for the section */
    backgroundVariant?: BackgroundVariant;
    /** Whether to apply responsive body padding */
    hasBodyPadding?: boolean;
    /** Child components to render */
    children: React.ReactNode;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportWrapper component provides a reusable wrapper for export sections.
 * Features scroll-triggered animations, configurable backgrounds, and responsive layout.
 *
 * @param props - Component props
 * @returns JSX element representing the export wrapper
 *
 * @example
 * ```tsx
 * <ExportWrapper
 *   id="services"
 *   title="Our Services"
 *   subtitle="What we offer"
 *   backgroundVariant="gradientUp"
 * >
 *   <ServiceList />
 * </ExportWrapper>
 * ```
 */
const ExportWrapper: React.FC<ExportWrapperProps> = ({
    id,
    title = "",
    subtitle = "",
    backgroundVariant = "gradientUp",
    contentMaxWidth = DEFAULT_CONTENT_MAX_WIDTH,
    hasBodyPadding = true,
    children,
}) => {
    // ============================================================
    // Refs and State
    // ============================================================

    const sectionRef = useRef<HTMLElement | null>(null);

    // ============================================================
    // Animation State
    // ============================================================

    const isInView = useInView(sectionRef, {
        once: true, // Only trigger animation once
        amount: DEFAULT_ANIMATION_AMOUNT, // Trigger when 10% visible
    });

    // ============================================================
    // Computed Values
    // ============================================================

    // Get background class based on variant
    const backgroundClass = backgroundByName[backgroundVariant];

    // Build responsive padding classes
    const paddingClasses = hasBodyPadding ? RESPONSIVE_PADDING_CLASSES : "";

    // ============================================================
    // Render
    // ============================================================

    return (
        <section
            id={id}
            ref={sectionRef}
            className={clsx(backgroundClass, "export-wrapper bg-transparent")}
            data-testid={`export-wrapper-${id}`}
        >
            <motion.div
                className="container-full"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <div className="flex-full">
                    <div className="flex-wrap-start">
                        {/* Section Header */}
                        <WrapperHeader
                            title={title}
                            subtitle={subtitle}
                            isInView={isInView}
                        />

                        {/* Content Section */}
                        <section
                            className={clsx(paddingClasses, "w-full relative")}
                        >
                            <div
                                className="container-full"
                                style={{ maxWidth: contentMaxWidth }}
                            >
                                {children}
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportWrapper.displayName = "ExportWrapper";

export default ExportWrapper;
