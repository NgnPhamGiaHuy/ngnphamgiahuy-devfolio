"use client";

// ============================================================
// Component: BlogItemForm
// Purpose: Client form for submitting a blog comment with validation state
//          and accessible error feedback.
// ============================================================

// ============================================================
// Imports
// ============================================================
import clsx from "clsx";
import React from "react";

import { FormInput, SubmitButton } from "@/components";
import useBlogCommentForm from "@/components/features/blogItem/hooks/useBlogCommentForm";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "blog-item-form",
    messageInput: "message-input",
    nameInput: "name-input",
    emailInput: "email-input",
    termsCheckbox: "terms-checkbox",
    termsLabel: "terms-label",
    termsError: "terms-error",
    submitButton: "submit-button",
} as const;

// ============================================================
// Types
// ============================================================
interface BlogItemFormProps {
    className?: string;
}

/**
 * BlogItemForm renders the comment form with validation and accessible labeling.
 * Designed for client-side interactivity and ARIA compatibility.
 *
 * Intent: Keep UI predictable for testing and preserve separation of concerns
 * between validation logic and presentation.
 *
 * @param props - Component props
 * @param props.className - Optional className for layout composition
 * @returns JSX.Element - Rendered component
 */

// ============================================================
// Component Definition
// ============================================================
const BlogItemForm: React.FC<BlogItemFormProps> = ({ className }) => {
    const {
        register,
        handleSubmit,
        errors,
        isValid,
        isSubmitted,
        isSubmitting,
        onSubmit,
        watch,
    } = useBlogCommentForm();

    // ============================================================
    // Derived State
    // ============================================================
    // Reactive label color feedback communicates checkbox state clearly
    const termsAccepted = watch("termsAccepted");
    const labelColor = errors.termsAccepted
        ? "text-red-500"
        : termsAccepted
          ? "text-green-600"
          : "text-gray-700";

    // ============================================================
    // Render
    // ============================================================
    return (
        <div className={className} data-testid={TEST_IDS.root}>
            <div className="relative z-2">
                <div className="my-0">
                    <h2 className="mt-0 mb-[10px] text-[34px] max-md:text-[26px] text-inverse! font-bold uppercase tracking-wider leading-[1.3]">
                        Leave a comment
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="my-8 max-sm:my-4"
                        aria-label="Comment form"
                        noValidate
                    >
                        <FormInput
                            id="comment"
                            placeholder="Comment"
                            isTextArea={true}
                            rows={3}
                            registration={register("message")}
                            error={errors.message?.message}
                            data-testid={TEST_IDS.messageInput}
                            className="px-0!"
                        />
                        <FormInput
                            id="name"
                            placeholder="Name"
                            rows={3}
                            registration={register("name")}
                            error={errors.name?.message}
                            data-testid={TEST_IDS.nameInput}
                            className="px-0!"
                        />
                        <FormInput
                            id="email"
                            placeholder="Email"
                            rows={3}
                            registration={register("email")}
                            error={errors.email?.message}
                            data-testid={TEST_IDS.emailInput}
                            className="px-0!"
                        />
                        <div className="h-full my-[30px] max-md:my-[20px] relative">
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                className="mt-0 mr-[10px] top-[7px] align-top relative"
                                aria-invalid={
                                    Boolean(errors.termsAccepted) || undefined
                                }
                                aria-describedby={
                                    errors.termsAccepted
                                        ? TEST_IDS.termsError
                                        : undefined
                                }
                                {...register("termsAccepted")}
                                data-testid={TEST_IDS.termsCheckbox}
                            />
                            <label
                                htmlFor="termsAccepted"
                                className={clsx(
                                    labelColor,
                                    "p-0 text-[16px] text-inverse! font-normal inline align-top transform-none tracking-normal"
                                )}
                                data-testid={TEST_IDS.termsLabel}
                            >
                                Save my name, email, and website in this browser
                                for the next time I comment.
                            </label>
                            {errors.termsAccepted?.message && (
                                <p
                                    id={TEST_IDS.termsError}
                                    role="alert"
                                    className="contact-fields-terms-error absolute left-0 bottom-[-20px] mt-1 text-red-500 text-sm"
                                    data-testid={TEST_IDS.termsError}
                                >
                                    {errors.termsAccepted.message as string}
                                </p>
                            )}
                        </div>
                        <div className="mb-[30px] max-md:mb-[25px] relative">
                            <SubmitButton
                                isSubmitting={isSubmitting}
                                disabled={!isValid && isSubmitted}
                                label="Submit"
                                data-testid={TEST_IDS.submitButton}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Export
// ============================================================
export default BlogItemForm;

// DX: Explicit display name for clearer React DevTools identification
BlogItemForm.displayName = "BlogItemForm";
