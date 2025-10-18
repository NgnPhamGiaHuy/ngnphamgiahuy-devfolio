"use client";

import React from "react";
import { motion } from "framer-motion";

import type { CertificatesSectionProps } from "@/types";

import { StandardAnimations } from "@/config";
import { Wrapper, BackdropText, CertificateCard, ContentCarousel, } from "@/components";

const Certificates: React.FC<CertificatesSectionProps> = ({
    id,
    certificates,
    resetAnimationOnView,
}) => {
    const containerVariants = StandardAnimations.fadeInUp(15);

    return (
        <Wrapper
            id={id}
            title={"Certificates & Achievements"}
            subtitle={"My Credentials"}
            backgroundVariant={"none"}
            verticalRulePosition={"left"}
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
                    variants={StandardAnimations.staggerChildren(0.1, 0.2)}
                >
                    <ContentCarousel
                        items={certificates}
                        renderItem={(item, index) => (
                            <CertificateCard item={item} index={index} />
                        )}
                    />
                    <BackdropText text={"Services"} />
                </motion.div>
            </motion.div>
        </Wrapper>
    );
};

export default Certificates;
