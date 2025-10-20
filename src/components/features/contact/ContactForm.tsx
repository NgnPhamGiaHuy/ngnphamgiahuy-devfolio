"use client";

import React from "react";

import { useContactForm } from "@/hooks";
import { FormStatus, ContactFields } from "@/components";

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        submitStatus,
        onSubmit,
        watch,
    } = useContactForm();

    return (
        <React.Fragment>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete={"off"}
            >
                <ContactFields
                    register={register}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    watch={watch}
                />
            </form>
            <FormStatus submitStatus={submitStatus} />
        </React.Fragment>
    );
};

ContactForm.displayName = "ContactForm";

export default ContactForm;
