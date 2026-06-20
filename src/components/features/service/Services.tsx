"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import type { ServiceType } from "@/schemas";
import type { ServicesSectionProps } from "@/shared";

import { StandardAnimations } from "@/infrastructure/config";
import { BackdropText, ServiceCard, Wrapper } from "@/components";

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
    items: ServiceType[];
    spaceBetween?: number;
    renderItem: (
        item: ServiceType,
        index: number,
        isActive?: boolean
    ) => React.ReactNode;
}>;

const Services: React.FC<ServicesSectionProps> = ({
    id,
    services,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    const containerVariants = StandardAnimations.fadeInUp(15);
    const innerStaggerVariants = StandardAnimations.staggerChildren(0.1, 0.2);

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
