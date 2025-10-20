"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { FormInputProps } from "@/types";

const FormInput: React.FC<FormInputProps> = ({
    id,
    label,
    placeholder = "",
    type = "text",
    isTextArea = false,
    cols = 40,
    rows = 10,
    error,
    registration,
    className = "",
}) => {
    const describedById = error ? `${id}-error` : undefined;
    const ariaInvalid = Boolean(error);

    const inputClassName = useMemo(
        () => `form-input-field ${error ? "form-input-field-error" : ""}`,
        [error]
    );
    const textareaClassName = useMemo(
        () => `form-input-textarea ${error ? "form-input-textarea-error" : ""}`,
        [error]
    );

    return (
        <div className={`form-input-wrapper ${className}`}>
            <div className={"form-input-field-container"}>
                <label htmlFor={id} className={"form-input-label"}>
                    {label}&nbsp;
                    <b className={"text-primary"} aria-hidden={"true"}>
                        *
                    </b>
                    <span className={"relative"}>
                        {isTextArea ? (
                            <textarea
                                id={id}
                                cols={cols}
                                rows={rows}
                                placeholder={placeholder}
                                className={textareaClassName}
                                {...registration}
                                aria-invalid={ariaInvalid}
                                aria-describedby={describedById}
                            />
                        ) : (
                            <input
                                type={type}
                                id={id}
                                size={40}
                                maxLength={400}
                                placeholder={placeholder}
                                className={inputClassName}
                                {...registration}
                                aria-invalid={ariaInvalid}
                                aria-describedby={describedById}
                            />
                        )}
                    </span>
                </label>
                <AnimatePresence>
                    {error && (
                        <motion.p
                            id={`${id}-error`}
                            className={"form-input-error-message"}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            role={"alert"}
                            aria-live={"polite"}
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

FormInput.displayName = "FormInput";

export default FormInput;
