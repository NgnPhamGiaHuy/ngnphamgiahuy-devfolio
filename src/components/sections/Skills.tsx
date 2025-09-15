"use client"

import React from "react";
import { motion } from "framer-motion";

import type { SkillsSectionProps } from "@/types";

import { StandardAnimations } from "@/config";
import { usePrefersReducedMotion } from "@/hooks";
import { Wrapper, SkillCard, BackdropText } from "@/components";

const Skills: React.FC<SkillsSectionProps> = ({ skills, resetAnimationOnView }) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const itemVariants = StandardAnimations.springUp(prefersReducedMotion, 30);
    const containerVariants = StandardAnimations.fadeInUp(prefersReducedMotion, 15);

    return (
        <Wrapper title={"Professional Skills"} subtitle={"My Talent"} background={"none"} hasSectionBodyPadding={false} sectionContentMaxWidth={"1320px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <motion.div
                className={"skills-grid"}
                variants={containerVariants}
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.15 }}
                role={"list"}
                aria-label={"List of professional skills"}
            >
                {skills.map((item, index) => (
                    <SkillCard key={index} item={item} variants={itemVariants} prefersReducedMotion={prefersReducedMotion} />
                ))}
            </motion.div>
            <BackdropText text={"Skills"} />
        </Wrapper>
    );
};

export default Skills;