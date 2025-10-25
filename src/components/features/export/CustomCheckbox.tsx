// ============================================================
// Component: CustomCheckbox
// Purpose: Custom animated checkbox component with accessibility features
// ============================================================

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";

import { COMMON_ANIMATIONS } from "@/config";

// ============================================================
// Constants
// ============================================================

/** Default checkbox size */
const CHECKBOX_SIZE = "w-[18px] h-[18px]";

/** Default border radius */
const CHECKBOX_BORDER_RADIUS = "rounded-[4px]";

/** Default border width */
const CHECKBOX_BORDER_WIDTH = "border-2";

/** Default transition duration */
const TRANSITION_DURATION = "duration-200";

/** Default animation duration */
const ANIMATION_DURATION = 0.15;

/** Default spacing between checkbox and label */
const LABEL_SPACING = "space-x-[12px]";

// ============================================================
// Types
// ============================================================

/** Props interface for CustomCheckbox component */
interface CustomCheckboxProps {
    /** Whether the checkbox is checked */
    checked: boolean;
    /** Change event handler */
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** Label text for the checkbox */
    label: string;
    /** Unique identifier for the checkbox */
    id: string;
    /** Additional CSS classes */
    className?: string;
}

// ============================================================
// Component
// ============================================================

/**
 * CustomCheckbox component provides an animated, accessible checkbox.
 * Features smooth animations, hover effects, and proper accessibility support.
 *
 * @param props - Component props
 * @returns JSX element representing the custom checkbox
 *
 * @example
 * ```tsx
 * <CustomCheckbox
 *   id="include-assets"
 *   checked={includeAssets}
 *   onChange={handleAssetsChange}
 *   label="Include Assets"
 * />
 * ```
 */
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    onChange,
    label,
    id,
    className = "",
}) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    const checkboxVariants = COMMON_ANIMATIONS.scaleIn95;

    // ============================================================
    // Computed Styles
    // ============================================================

    // Build checkbox classes based on state
    const checkboxClassName = `
        ${CHECKBOX_SIZE} ${CHECKBOX_BORDER_RADIUS} ${CHECKBOX_BORDER_WIDTH} border-solid 
        transition-all ${TRANSITION_DURATION} ease-out
        ${
            checked
                ? "bg-primary border-primary shadow-[0_2px_8px_rgba(233,116,81,0.3)]"
                : "bg-card-inverse border-border-inverse hover:border-primary/60 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        }
        group-hover:scale-110 group-active:scale-95
        focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-1
    `;

    // Build label classes
    const labelClassName = `
        group flex items-center ${LABEL_SPACING} cursor-pointer 
        text-[13px] text-inverse transition-all ${TRANSITION_DURATION} ease-out 
        hover:scale-[1.02] active:scale-[0.98] ${className}
    `;

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.label
            className={labelClassName}
            variants={checkboxVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            htmlFor={id}
            data-testid={`checkbox-${id}`}
        >
            <div className="relative">
                {/* Hidden native checkbox for accessibility */}
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                    aria-describedby={`${id}-description`}
                />

                {/* Custom checkbox visual */}
                <motion.div
                    className={checkboxClassName}
                    animate={{
                        scale: checked ? 1.05 : 1,
                    }}
                    transition={{
                        duration: ANIMATION_DURATION,
                        ease: "easeOut",
                    }}
                >
                    {/* Check icon animation */}
                    <AnimatePresence>
                        {checked && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{
                                    duration: ANIMATION_DURATION,
                                    ease: "easeOut",
                                }}
                            >
                                <CheckIcon className="w-full h-full text-white p-[2px]" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Label text */}
            <span className="font-medium text-inverse group-hover:text-primary/80 transition-colors duration-200">
                {label}
            </span>
        </motion.label>
    );
};

// ============================================================
// Component Metadata
// ============================================================

CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;
