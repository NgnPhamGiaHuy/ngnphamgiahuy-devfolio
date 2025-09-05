"use client"

import React from "react";
import { motion } from "framer-motion";

import { data } from "@/data/data";
import { StandardAnimations } from "@/config/animation.config";

import Wrapper from "@/components/sections/wrapper/Wrapper";
import ContentCard from "@/components/ui/cards/ContentCard";
import ContentSwiper from "@/components/ui/ContentSwiper";
import BackgroundText from "@/components/ui/BackgroundText";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

interface ServicesProps {
    resetAnimationOnView?: boolean;
}

const Services: React.FC<ServicesProps> = ({ resetAnimationOnView }) => {
    const { services } = data;

    const prefersReducedMotion = usePrefersReducedMotion();
    const containerVariants = StandardAnimations.fadeInUp(prefersReducedMotion, 15);

    return (
        <Wrapper title={"What I Do"} subtitle={"My Services"} background={"gradientDown"} vlinePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <motion.div
                className={"items-wrapper"}
                variants={containerVariants}
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.div
                    className={"items-content-wrapper"}
                    variants={StandardAnimations.staggerChildren(prefersReducedMotion, 0.1, 0.2)}
                >
                    <ContentSwiper
                        items={services}
                        renderItem={(item, index) => (
                            <ContentCard item={item} index={index} />
                        )}
                    />
                    <BackgroundText text={"Services"} />
                </motion.div>
            </motion.div>
        </Wrapper>
    );
};

export default Services;
