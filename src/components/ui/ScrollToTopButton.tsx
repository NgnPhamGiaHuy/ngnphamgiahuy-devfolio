// ============================================================
// Component: ScrollToTopButton
// Purpose: Scroll to top button with smooth animations and accessibility
// ============================================================

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { BUTTON_VARIANTS } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * ScrollToTopButton component renders a floating scroll-to-top button.
 * Features smooth animations, accessibility, and scroll detection.
 *
 * @returns Scroll to top button component
 */
const ScrollToTopButton: React.FC = () => {
    // ============================================================
    // State
    // ============================================================

    const [isVisible, setIsVisible] = useState(false);

    // ============================================================
    // Effects
    // ============================================================

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when scrolled more than 300px
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // ============================================================
    // Event Handlers
    // ============================================================

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // ============================================================
    // Render
    // ============================================================

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    variants={BUTTON_VARIANTS.scrollToTop()}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={scrollToTop}
                    className="p-3 bottom-8 right-8 text-inverse bg-card-inverse/80 border-2 border-solid border-primary rounded-full shadow-[5px_5px_0px_0px_rgb(0_0_0/20%)] fixed cursor-pointer z-50"
                    aria-label="Scroll to top"
                    title="Scroll to top"
                    data-testid="scroll-to-top-button"
                >
                    <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ChevronUpIcon className="w-6 h-6" aria-hidden="true" />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

ScrollToTopButton.displayName = "ScrollToTopButton";

export default ScrollToTopButton;
