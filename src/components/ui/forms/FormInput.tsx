"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { FormInputProps } from "@/types";

const FormInput: React.FC<FormInputProps> = ({ id, label, placeholder = "", type = "text", isTextArea = false, cols = 40, rows = 10, error, registration, className = "" }) => {
    return (
        <div className={`form-input-wrapper ${className}`}>
            <div className={"form-field-container"}>
                <label htmlFor={id} className={"form-label"}>
                    {label}&nbsp;
                    <b className={"form-required"}>*</b>
                    <span className={"relative"}>
                        {isTextArea ? (
                            <textarea
                                id={id}
                                cols={cols}
                                rows={rows}
                                placeholder={placeholder}
                                className={`form-textarea ${error ? "form-textarea-error" : ""}`}
                                {...registration}
                                aria-invalid={error ? "true" : "false"}
                                aria-describedby={error ? `${id}-error` : undefined}
                            />
                        ) : (
                            <input
                                type={type}
                                id={id}
                                size={40}
                                maxLength={400}
                                placeholder={placeholder}
                                className={`form-input ${error ? "form-input-error" : ""}`}
                                {...registration}
                                aria-invalid={error ? "true" : "false"}
                                aria-describedby={error ? `${id}-error` : undefined}
                            />
                        )}
                    </span>
                </label>
                <AnimatePresence>
                    {error && (
                        <motion.p
                            id={`${id}-error`}
                            className={"form-error-message"}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FormInput;
