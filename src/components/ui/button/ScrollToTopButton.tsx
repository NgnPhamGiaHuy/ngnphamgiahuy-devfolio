"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 200
                    }}
                    whileHover={{
                        y: -2,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{
                        transition: { duration: 0.1 }
                    }}
                    onClick={scrollToTop}
                    className={"p-3 bottom-8 right-8 text-inverse bg-card-inverse/80 border-2 border-solid border-primary  rounded-full shadow-[5px_5px_0px_0px_rgb(0_0_0/20%)] fixed cursor-pointer z-50"}
                    aria-label={"Scroll to top"}
                >
                    <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <ChevronUpIcon className={"w-6 h-6"} />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTopButton;
