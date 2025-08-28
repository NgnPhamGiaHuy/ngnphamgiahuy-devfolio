"use client"

import React from "react";

import useContactForm from "@/hooks/useContactForm";

import StatusMessage from "@/components/ui/StatusMessage";
import ContactFormFields from "@/components/ui/contact/ContactFormFields";

const ContactForm: React.FC = () => {
    const { register, handleSubmit, errors, isSubmitting, submitStatus, onSubmit, watch } = useContactForm();

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ContactFormFields register={register} isSubmitting={isSubmitting} errors={errors} watch={watch} />
            </form>
            <StatusMessage submitStatus={submitStatus} />
        </React.Fragment>
    );
};

export default ContactForm;
