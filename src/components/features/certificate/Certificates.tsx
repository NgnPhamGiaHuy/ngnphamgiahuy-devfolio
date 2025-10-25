// ============================================================
// Component: Certificates
// Purpose: Display certificates and achievements in a carousel layout
// ============================================================

"use client";

import React from "react";
import { motion } from "framer-motion";

import type { CertificatesSectionProps } from "@/types";

import CertificateCard from "./CertificateCard";
import { StandardAnimations } from "@/config";
import { Wrapper, BackdropText, ContentCarousel } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * Certificates component renders a section displaying certificates and achievements.
 * Features a carousel layout with individual certificate cards and animations.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.certificates - Array of certificate data
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Certificates section component
 */
const Certificates: React.FC<CertificatesSectionProps> = ({
    id,
    certificates,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    // Remove unnecessary useMemo - animation variants are static objects
    const containerVariants = StandardAnimations.fadeInUp(15);
    const innerStaggerVariants = StandardAnimations.staggerChildren(0.1, 0.2);

    // ============================================================
    // Render
    // ============================================================

    return (
        <Wrapper
            id={id}
            title="Certificates & Achievements"
            subtitle="My Credentials"
            backgroundVariant="none"
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            <motion.div
                className="flex-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.div
                    className="p-[10px] flex-wrap-start"
                    variants={innerStaggerVariants}
                >
                    <ContentCarousel
                        items={certificates}
                        renderItem={(item, index, isActive) => (
                            <CertificateCard
                                key={item._id || `${item.title}-${index}`}
                                item={item}
                                index={index}
                                isActive={isActive}
                                data-testid={`certificate-card-${index}`}
                            />
                        )}
                    />
                    <BackdropText text="Certificates" />
                </motion.div>
            </motion.div>
        </Wrapper>
    );
};

Certificates.displayName = "Certificates";

export default Certificates;
