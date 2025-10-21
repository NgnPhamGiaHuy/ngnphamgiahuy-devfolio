"use client";

import React, { useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";

import type { CustomCheckboxProps } from "@/types";

import { COMMON_ANIMATIONS } from "@/config";

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    onChange,
    label,
    id,
    className = "",
}) => {
    const checkboxVariants = useMemo(() => COMMON_ANIMATIONS.scaleIn95, []);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e);
        },
        [onChange]
    );

    const checkboxClassName = useMemo(
        () => `
      w-[18px] h-[18px] rounded-[4px] border-2 border-solid transition-all duration-200 ease-out
      ${
          checked
              ? "bg-primary border-primary shadow-[0_2px_8px_rgba(233,116,81,0.3)]"
              : "bg-card-inverse border-border-inverse hover:border-primary/60 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
      }
      group-hover:scale-110 group-active:scale-95
      focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-1
    `,
        [checked]
    );

    const labelClassName = useMemo(
        () =>
            `group flex items-center space-x-[12px] cursor-pointer text-[13px] text-inverse transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] ${className}`,
        [className]
    );

    return (
        <motion.label
            className={labelClassName}
            variants={checkboxVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            htmlFor={id}
        >
            <div className="relative">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={handleChange}
                    className="sr-only"
                    aria-describedby={`${id}-description`}
                />
                <motion.div
                    className={checkboxClassName}
                    animate={{
                        scale: checked ? 1.05 : 1,
                    }}
                    transition={{
                        duration: 0.15,
                        ease: "easeOut",
                    }}
                >
                    <AnimatePresence>
                        {checked && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{
                                    duration: 0.15,
                                    ease: "easeOut",
                                }}
                            >
                                <CheckIcon className="w-full h-full text-white p-[2px]" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <span className="font-medium text-inverse group-hover:text-primary/80 transition-colors duration-200">
                {label}
            </span>
        </motion.label>
    );
};

CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;
