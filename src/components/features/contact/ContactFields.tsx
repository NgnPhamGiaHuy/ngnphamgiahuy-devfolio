// ============================================================
// Component: ContactFields
// Purpose: Form fields for contact form with validation and styling
// ============================================================

import React from "react";
import clsx from "clsx";

import type { ContactFieldsProps } from "@/types";

import { FORM_FIELDS } from "@/config";
import { FormInput, SubmitButton } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * ContactFields component renders form fields for the contact form.
 * Features input validation, error handling, and terms acceptance.
 *
 * @param props - Component props
 * @param props.register - React Hook Form register function
 * @param props.isSubmitting - Whether the form is currently submitting
 * @param props.errors - Form validation errors
 * @param props.watch - React Hook Form watch function
 * @returns Contact form fields component
 */
const ContactFields: React.FC<ContactFieldsProps> = ({
    register,
    isSubmitting,
    errors,
    watch,
}) => {
    // ============================================================
    // Form State
    // ============================================================

    const termsAccepted = watch("termsAccepted");

    // Dynamic label color based on terms acceptance status
    const labelColor = errors.termsAccepted
        ? "text-red-500"
        : termsAccepted
          ? "text-green-600"
          : "text-gray-700";

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className="contact-fields" data-testid="contact-fields">
            {/* Name and Email Row */}
            <FormInput
                id={FORM_FIELDS.NAME.id}
                label={FORM_FIELDS.NAME.label}
                placeholder={FORM_FIELDS.NAME.placeholder}
                type={FORM_FIELDS.NAME.type}
                registration={register("name")}
                error={errors.name?.message}
                className="contact-fields-input-wrapper-half"
                data-testid="name-input"
            />
            <FormInput
                id={FORM_FIELDS.EMAIL.id}
                label={FORM_FIELDS.EMAIL.label}
                placeholder={FORM_FIELDS.EMAIL.placeholder}
                type={FORM_FIELDS.EMAIL.type}
                registration={register("email")}
                error={errors.email?.message}
                className="contact-fields-input-wrapper-half"
                data-testid="email-input"
            />

            {/* Subject Field */}
            <FormInput
                id={FORM_FIELDS.SUBJECT.id}
                label={FORM_FIELDS.SUBJECT.label}
                type={FORM_FIELDS.SUBJECT.type}
                placeholder={FORM_FIELDS.SUBJECT.placeholder}
                registration={register("subject")}
                error={errors.subject?.message}
                data-testid="subject-input"
            />

            {/* Message Field */}
            <FormInput
                id={FORM_FIELDS.MESSAGE.id}
                label={FORM_FIELDS.MESSAGE.label}
                placeholder={FORM_FIELDS.MESSAGE.placeholder}
                isTextArea={FORM_FIELDS.MESSAGE.isTextArea}
                rows={FORM_FIELDS.MESSAGE.rows}
                registration={register("message")}
                error={errors.message?.message}
                data-testid="message-input"
            />

            {/* Footer with Terms and Submit */}
            <div className="contact-fields-footer">
                <div className="contact-fields-terms-container">
                    <label
                        htmlFor="termsAccepted"
                        className={clsx(
                            labelColor,
                            "contact-fields-terms-label"
                        )}
                        data-testid="terms-label"
                    >
                        <span className="contact-fields-terms-text">
                            Accept the terms and conditions
                        </span>
                        <input
                            type="checkbox"
                            id="termsAccepted"
                            className="contact-fields-terms-checkbox"
                            aria-invalid={
                                Boolean(errors.termsAccepted) || undefined
                            }
                            aria-describedby={
                                errors.termsAccepted ? "terms-error" : undefined
                            }
                            {...register("termsAccepted")}
                            data-testid="terms-checkbox"
                        />
                    </label>
                </div>
                <SubmitButton
                    isSubmitting={isSubmitting}
                    data-testid="submit-button"
                />
            </div>
        </div>
    );
};

ContactFields.displayName = "ContactFields";

export default ContactFields;
