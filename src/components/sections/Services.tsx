"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

import type { Service, ServicesSectionProps } from "@/types";

import { COMMON_ANIMATIONS } from "@/config";
import { Wrapper, BackdropText } from "@/components";
import { ServiceCard } from "@/components/features/services";

const ContentCarousel = dynamic(
    () =>
        import("@/components").then((mod) => ({
            default: mod.ContentCarousel,
        })),
    {
        ssr: false,
        loading: () => (
            <div className={"swiper-carousel-outer"}>
                <div className={"swiper-carousel"}>Loading...</div>
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

const Services: React.FC<ServicesSectionProps> = ({
    id,
    services,
    resetAnimationOnView,
}) => {
    const containerVariants = useMemo(() => COMMON_ANIMATIONS.fadeInUp15, []);
    const innerStaggerVariants = useMemo(
        () => COMMON_ANIMATIONS.staggerLoose,
        []
    );

    return (
        <Wrapper
            id={id}
            title={"What I Do"}
            subtitle={"My Services"}
            backgroundVariant={"gradientDown"}
            verticalRulePosition={"right"}
            resetAnimationOnView={resetAnimationOnView}
        >
            <motion.div
                className={"flex-full"}
                variants={containerVariants}
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.div
                    className={"p-[10px] flex-wrap-start"}
                    variants={innerStaggerVariants}
                >
                    <ContentCarousel
                        items={services}
                        renderItem={(service, i, active) => (
                            <ServiceCard
                                item={service}
                                index={i}
                                isActive={active}
                            />
                        )}
                    />
                    <BackdropText text={"Services"} />
                </motion.div>
            </motion.div>
        </Wrapper>
    );
};

Services.displayName = "Services";

export default Services;
