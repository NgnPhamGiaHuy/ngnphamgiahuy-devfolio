"use client"

import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

import { BackgroundTextProps } from "@/types";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

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
                opacity: [0, 0.02],
                scale: [0.98, 1],
                y: [20, 0],
                transition: { duration: 1.2, ease: "easeOut" }
            });

            controls.start({
                y: [0, -5, 0],
                transition: {
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }
            });
        };

        animateText();
    }, [controls, prefersReducedMotion]);
    const positionStyle: React.CSSProperties = { top, right, bottom, left };

    return (
        <div className={"w-full absolute z-1"} style={positionStyle}>
            <div>
                <motion.div
                    animate={controls}
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    className={`w-[200%] top-[-50px] -left-1/2 text-[350px] max-md:text-[150px] max-lg:text-[250px] text-[rgba(0,0,0,.02)] text-center font-bold font-['Caveat'] whitespace-nowrap leading-[1px] pointer-events-none relative ${className}`}
                >
                    <span>
                        { text }
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default BackgroundText;
