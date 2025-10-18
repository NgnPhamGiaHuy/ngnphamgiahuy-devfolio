"use client";

import React from "react";
import { motion } from "framer-motion";

import type { SkillsSectionProps } from "@/types";

import { StandardAnimations } from "@/config";
import { Wrapper, SkillCard, BackdropText } from "@/components";

const Skills: React.FC<SkillsSectionProps> = ({
    id,
    skills,
    resetAnimationOnView,
}) => {
    const itemVariants = StandardAnimations.springUp(30);
    const containerVariants = StandardAnimations.fadeInUp(15);

    return (
        <Wrapper
            id={id}
            title={"Professional Skills"}
            subtitle={"My Talent"}
            backgroundVariant={"none"}
            hasBodyPadding={false}
            contentMaxWidth={"1320px"}
            verticalRulePosition={"left"}
            resetAnimationOnView={resetAnimationOnView}
        >
            <motion.div
                className={
                    "max-md:p-[20px] max-lg:p-[30px] p-[20px] grid-responsive"
                }
                variants={containerVariants}
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.15 }}
                role={"list"}
                aria-label={"List of professional skills"}
            >
                {skills.map((item, index) => (
                    <SkillCard
                        key={index}
                        item={item}
                        variants={itemVariants}
                    />
                ))}
            </motion.div>
            <BackdropText text={"Skills"} />
        </Wrapper>
    );
};

export default Skills;
