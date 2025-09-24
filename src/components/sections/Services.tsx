"use client"

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import type { Service, ServicesSectionProps } from "@/types";

import { StandardAnimations } from "@/config";
import { Wrapper, BackdropText } from "@/components";
import { ServiceCard } from "@/components/features/services";

const ContentCarousel = dynamic(() => import("@/components").then(mod => ({ default: mod.ContentCarousel })), {
    ssr: false,
    loading: () => <div className={"swiper-carousel-outer"}><div className={"swiper-carousel"}>Loading...</div></div>
}) as React.ComponentType<{ items: Service[]; spaceBetween?: number; renderItem: (item: Service, index: number) => React.ReactNode }>;

const Services: React.FC<ServicesSectionProps> = ({ id, services, resetAnimationOnView }) => {
    const containerVariants = StandardAnimations.fadeInUp(15);

    return (
        <Wrapper id={id} title={"What I Do"} subtitle={"My Services"} background={"gradientDown"} vlinePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <motion.div
                className={"flex-full"}
                variants={containerVariants}
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.div
                    className={"p-[10px] flex-wrap-start"}
                    variants={StandardAnimations.staggerChildren(0.1, 0.2)}
                >
                    <ContentCarousel
                        items={services}
                        renderItem={(item, index) => (
                            <ServiceCard item={item} index={index} />
                        )}
                    />
                    <BackdropText text={"Services"} />
                </motion.div>
            </motion.div>
        </Wrapper>
    );
};

export default Services;
