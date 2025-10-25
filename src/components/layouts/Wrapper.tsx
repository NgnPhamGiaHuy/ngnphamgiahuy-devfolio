// ============================================================
// Component: Wrapper
// Purpose: Main section wrapper with animations, backgrounds, and layout
// ============================================================

"use client";

import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import type { WrapperProps } from "@/types";

import { VerticalRule, WrapperHeader } from "@/components";
import { containerVariants, backgroundByName, vlinePositions } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * Wrapper component provides a consistent layout structure for sections.
 * Features animations, background variants, and proper accessibility.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.title - Section title
 * @param props.subtitle - Section subtitle
 * @param props.backgroundVariant - Background style variant
 * @param props.contentMaxWidth - Maximum width for content
 * @param props.hasBodyPadding - Whether to add body padding
 * @param props.verticalRulePosition - Position of vertical rule
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @param props.children - Child components
 * @returns Wrapper section component
 */
const Wrapper: React.FC<WrapperProps> = ({
    id,
    title = "",
    subtitle = "",
    backgroundVariant = "gradientUp",
    contentMaxWidth = "1300px",
    hasBodyPadding = true,
    verticalRulePosition = "right",
    resetAnimationOnView = false,
    children,
    ...props
}) => {
    // ============================================================
    // State & Refs
    // ============================================================

    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, {
        once: !resetAnimationOnView,
        amount: 0.1,
    });
    const [animationKey, setAnimationKey] = useState(0);

    // ============================================================
    // Effects
    // ============================================================

    useEffect(() => {
        if (resetAnimationOnView && isInView) {
            setAnimationKey((prev) => prev + 1);
        }
    }, [isInView, resetAnimationOnView]);

    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple object lookups don't need memoization
    const backgroundClass = backgroundByName[backgroundVariant];
    const vlineProps = vlinePositions[verticalRulePosition];

    // ============================================================
    // Render
    // ============================================================

    return (
        <section
            id={id}
            ref={sectionRef}
            className={clsx(backgroundClass, "wrapper bg-transparent")}
            data-testid="wrapper-section"
            {...props}
        >
            <motion.div
                key={animationKey}
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

                        {/* Section Content */}
                        <section
                            className={clsx(
                                hasBodyPadding &&
                                    "max-md:px-[10px] max-lg:px-[20px]",
                                "w-full relative"
                            )}
                            data-testid="wrapper-content"
                        >
                            <div
                                className="container-full"
                                style={{ maxWidth: contentMaxWidth }}
                            >
                                {children}
                                <VerticalRule {...vlineProps} />
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

Wrapper.displayName = "Wrapper";

export default Wrapper;
