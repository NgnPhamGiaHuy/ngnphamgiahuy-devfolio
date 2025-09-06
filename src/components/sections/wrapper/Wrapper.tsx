"use client"

import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

import { SectionWrapperProps } from "@/types/section.types";
import { containerVariants, backgroundByName, vlinePositions } from "@/config/sectionWrapper.config";

import VLineBlock from "@/components/ui/VLineBlock";
import WrapperHeader from "@/components/sections/wrapper/WrapperHeader";

const Wrapper: React.FC<SectionWrapperProps> = ({ title = "", subtitle = "", background = "gradientUp", sectionContentMaxWidth = "1300px", hasSectionBodyPadding = true, vlinePosition = "right", resetAnimationOnView = false, children }) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: !resetAnimationOnView, amount: 0.2 });
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        if (resetAnimationOnView && isInView) {
            setAnimationKey(prev => prev + 1);
        }
    }, [isInView, resetAnimationOnView]);

    const backgroundClass = backgroundByName[background];
    const vlineProps = vlinePositions[vlinePosition];

    return (
        <section ref={sectionRef} className={clsx(backgroundClass, "wrapper-section bg-transparent")}>
            <motion.div key={animationKey} className={"wrapper-section-container"} initial={"hidden"} animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <div className={"wrapper-section-inner"}>
                    <div className={"wrapper-section-content"}>
                        <WrapperHeader title={title} subtitle={subtitle} isInView={isInView} />
                        <section className={clsx(hasSectionBodyPadding && "max-md:px-[10px] max-lg:px-[20px]", "wrapper-section-body")}>
                            <div className={"wrapper-section-content-container"} style={{ maxWidth: sectionContentMaxWidth }}>
                                {children}
                                <VLineBlock {...vlineProps} />
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Wrapper;