"use client";

import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

import type { WrapperProps } from "@/types";

import { VerticalRule, WrapperHeader } from "@/components";
import { containerVariants, backgroundByName, vlinePositions } from "@/config";

const Wrapper: React.FC<WrapperProps> = ({
    id,
    title = "",
    subtitle = "",
    backgroundVariant = "gradientUp",
    contentMaxWidth = "1300px",
    hasBodyPadding = true,
    verticalRulePosition = "right",
    resetAnimationOnView = false,
    children,
}) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, {
        once: !resetAnimationOnView,
        amount: 0.1,
    });
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        if (resetAnimationOnView && isInView) {
            setAnimationKey((prev) => prev + 1);
        }
    }, [isInView, resetAnimationOnView]);

    const backgroundClass = useMemo(
        () => backgroundByName[backgroundVariant],
        [backgroundVariant]
    );
    const vlineProps = useMemo(
        () => vlinePositions[verticalRulePosition],
        [verticalRulePosition]
    );

    return (
        <section
            id={id}
            ref={sectionRef}
            className={clsx(backgroundClass, "wrapper bg-transparent")}
        >
            <motion.div
                key={animationKey}
                className={"container-full"}
                initial={"hidden"}
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <div className={"flex-full"}>
                    <div className={"flex-wrap-start"}>
                        <WrapperHeader
                            title={title}
                            subtitle={subtitle}
                            isInView={isInView}
                        />
                        <section
                            className={clsx(
                                hasBodyPadding &&
                                    "max-md:px-[10px] max-lg:px-[20px]",
                                "w-full relative"
                            )}
                        >
                            <div
                                className={"container-full"}
                                style={{ maxWidth: contentMaxWidth }}
                            >
                                {children}
                                <VerticalRule {...vlineProps} />
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

Wrapper.displayName = "Wrapper";

export default Wrapper;
