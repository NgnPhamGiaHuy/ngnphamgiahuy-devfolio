"use client"

import React from "react";

import { useContactForm } from "@/hooks";

import { StatusMessage, ContactFormFields } from "@/components";

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
