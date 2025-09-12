"use client"

import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

import { BackgroundTextProps } from "@/types";

import { usePrefersReducedMotion } from "@/hooks";

const BackgroundText: React.FC<BackgroundTextProps> = ({ text, top = "", right = "", bottom = "0", left = "0", className = "" }) => {
    const controls = useAnimationControls();
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const animateText = async () => {
            if (prefersReducedMotion) {
                controls.set({ opacity: 0.2, scale: 1 });
                return;
            }

            await controls.start({
                opacity: [0, 0.025],
                scale: [0.985, 1],
                y: [16, 0],
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
            });

            await controls.start({
                y: [0, -6, 0],
                transition: {
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror"
                }
            });
        };

        animateText();
    }, [controls, prefersReducedMotion]);
    const positionStyle: React.CSSProperties = { top, right, bottom, left };

    return (
        <div className={"w-full absolute z-1"} style={positionStyle} aria-hidden={"true"}>
            <div>
                <motion.div
                    animate={controls}
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    className={`w-[200%] top-[-50px] -left-1/2 text-[350px] max-md:text-[150px] max-lg:text-[250px] text-[rgba(0,0,0,.02)] text-center font-bold font-["Caveat"] whitespace-nowrap leading-[1px] pointer-events-none relative ${className}`}
                >
                    <span>
                        {text}
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default BackgroundText;
