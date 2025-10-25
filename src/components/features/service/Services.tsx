// ============================================================
// Component: Services
// Purpose: Display services section with carousel layout and animations
// ============================================================

"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import React from "react";

import type { Service, ServicesSectionProps } from "@/types";

import { StandardAnimations } from "@/config";
import { BackdropText, ServiceCard, Wrapper } from "@/components";

// ============================================================
// Dynamic Imports
// ============================================================

const ContentCarousel = dynamic(
    () =>
        import("@/components").then((mod) => ({
            default: mod.ContentCarousel,
        })),
    {
        ssr: false,
        loading: () => (
            <div className="swiper-carousel-outer">
                <div className="swiper-carousel">Loading...</div>
            </div>
        ),
    }
) as React.ComponentType<{
    items: Service[];
    spaceBetween?: number;
    renderItem: (
        item: Service,
        index: number,
        isActive?: boolean
    ) => React.ReactNode;
}>;

// ============================================================
// Component Definition
// ============================================================

/**
 * Services component renders a section displaying available services.
 * Features carousel layout, smooth animations, and responsive design.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.services - Array of service data
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Services section component
 */
const Services: React.FC<ServicesSectionProps> = ({
    id,
    services,
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
            title="What I Do"
            subtitle="My Services"
            backgroundVariant="gradientDown"
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            <motion.div
                className="flex-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                data-testid="services-container"
            >
                <motion.div
                    className="p-[10px] flex-wrap-start"
                    variants={innerStaggerVariants}
                >
                    {/* Services Carousel */}
                    <ContentCarousel
                        items={services}
                        renderItem={(service, i, active) => (
                            <ServiceCard
                                item={service}
                                index={i}
                                isActive={active}
                                data-testid={`service-card-${i}`}
                            />
                        )}
                    />

                    {/* Decorative backdrop text */}
                    <BackdropText text="Services" />
                </motion.div>
            </motion.div>
        </Wrapper>
    );
};

Services.displayName = "Services";

export default Services;
