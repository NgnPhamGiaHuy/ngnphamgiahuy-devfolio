"use client"

import React, { useMemo } from "react";
import { motion } from "framer-motion";

import { data } from "@/data";
import { SkillSectionProps } from "@/types";
import { StandardAnimations } from "@/config";
import { usePrefersReducedMotion } from "@/hooks";
import { Wrapper, SkillCard, BackgroundText } from "@/components";

const Skills: React.FC<SkillSectionProps> = ({ resetAnimationOnView, skills }) => {
    const skillsData = useMemo(() => skills?.length ? skills : data.skills, [skills])

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
                {skillsData.map((item, index) => (
                    <SkillCard key={index} item={item} variants={itemVariants} prefersReducedMotion={prefersReducedMotion} />
                ))}
            </motion.div>
            <BackgroundText text={"Skills"} />
        </Wrapper>
    );
};

export default Skills;