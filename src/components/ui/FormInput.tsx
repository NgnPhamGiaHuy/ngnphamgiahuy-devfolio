// ============================================================
// Component: FormInput
// Purpose: Reusable form input component with validation and accessibility
// ============================================================

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { FormInputProps } from "@/types";

import { FORM_VARIANTS } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * FormInput component renders a form input field with validation.
 * Features accessibility support, error handling, and smooth animations.
 *
 * @param props - Component props
 * @param props.id - Input field ID
 * @param props.label - Input field label
 * @param props.placeholder - Input placeholder text
 * @param props.type - Input type (text, email, etc.)
 * @param props.isTextArea - Whether to render as textarea
 * @param props.cols - Textarea columns
 * @param props.rows - Textarea rows
 * @param props.error - Error message
 * @param props.registration - React Hook Form registration
 * @param props.className - Additional CSS classes
 * @returns Form input component
 */
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
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const describedById = error ? `${id}-error` : undefined;
    const ariaInvalid = Boolean(error);

    const inputClassName = `form-input-field ${error ? "form-input-field-error" : ""}`;
    const textareaClassName = `form-input-textarea ${error ? "form-input-textarea-error" : ""}`;

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className={`form-input-wrapper ${className}`}
            data-testid="form-input-wrapper"
            {...props}
        >
            <div className="form-input-field-container">
                <label htmlFor={id} className="form-input-label">
                    {label}&nbsp;
                    <b className="text-primary" aria-hidden="true">
                        *
                    </b>
                    <span className="relative">
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
                                data-testid="form-textarea"
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
                                data-testid="form-input"
                            />
                        )}
                    </span>
                </label>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            id={`${id}-error`}
                            className="form-input-error-message"
                            variants={FORM_VARIANTS.status()}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            role="alert"
                            aria-live="polite"
                            data-testid="form-input-error"
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
