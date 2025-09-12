"use client"

import { motion } from "framer-motion";
import React, { useMemo } from "react";

import { data } from "@/data";
import { Service } from "@/types";
import { StandardAnimations } from "@/config";
import { usePrefersReducedMotion } from "@/hooks";
import { Wrapper, ContentCard, ContentSwiper, BackgroundText } from "@/components";

interface ServicesProps {
    services?: Service[] | null;
    resetAnimationOnView?: boolean;
}

const Services: React.FC<ServicesProps> = ({ resetAnimationOnView, services }) => {
    const servicesData = useMemo(() => services?.length ? services : data.services, [services]);

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
                        items={servicesData}
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
