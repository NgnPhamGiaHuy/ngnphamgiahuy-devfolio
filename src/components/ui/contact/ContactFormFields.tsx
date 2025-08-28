import clsx from "clsx";
import React from "react";
import { UseFormRegisterReturn, FieldErrors, UseFormWatch } from "react-hook-form";

import FormInput from "@/components/ui/forms/FormInput";
import SubmitButton from "@/components/ui/button/SubmitButton";

import { FORM_FIELDS } from "@/data/contactFormConstants";
import { ContactFormData } from "@/utils/contactFormSchema";

interface ContactFormFieldsProps {
    register: (name: keyof ContactFormData) => UseFormRegisterReturn;
    errors: FieldErrors<ContactFormData>;
    isSubmitting: boolean;
    watch: UseFormWatch<ContactFormData>;
}

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({ register, isSubmitting, errors, watch }) => {
    const termsAccepted = watch("termsAccepted");

    const getLabelColor = () => {
        if (errors.termsAccepted) return "text-red-500";
        if (termsAccepted) return "text-green-600";
        return "text-gray-700";
    };

    return (
        <div className={"contact-form-fields"}>
            <FormInput
                id={FORM_FIELDS.NAME.id}
                label={FORM_FIELDS.NAME.label}
                placeholder={FORM_FIELDS.NAME.placeholder}
                type={FORM_FIELDS.NAME.type}
                registration={register("name")}
                error={errors.name?.message}
                className={"form-input-wrapper-half"}
            />
            <FormInput
                id={FORM_FIELDS.EMAIL.id}
                label={FORM_FIELDS.EMAIL.label}
                placeholder={FORM_FIELDS.EMAIL.placeholder}
                type={FORM_FIELDS.EMAIL.type}
                registration={register("email")}
                error={errors.email?.message}
                className={"form-input-wrapper-half"}
            />
            <FormInput
                id={FORM_FIELDS.SUBJECT.id}
                label={FORM_FIELDS.SUBJECT.label}
                type={FORM_FIELDS.SUBJECT.type}
                placeholder={FORM_FIELDS.SUBJECT.placeholder}
                registration={register("subject")}
                error={errors.subject?.message}
            />
            <FormInput
                id={FORM_FIELDS.MESSAGE.id}
                label={FORM_FIELDS.MESSAGE.label}
                placeholder={FORM_FIELDS.MESSAGE.placeholder}
                isTextArea={FORM_FIELDS.MESSAGE.isTextArea}
                rows={FORM_FIELDS.MESSAGE.rows}
                registration={register("message")}
                error={errors.message?.message}
            />
            <div className={"form-footer"}>
                <div className={"form-terms-container"}>
                    <span className={"relative"}>
                        <span className={"form-terms-label-wrapper"}>
                            <label
                                htmlFor={"termsAccepted"}
                                className={clsx(
                                    getLabelColor(),
                                    "form-terms-label"
                                )}
                            >
                                <span className={"form-terms-text"}>
                                    Accept the terms and conditions
                                </span>
                                <input
                                    type={"checkbox"}
                                    id={"termsAccepted"}
                                    className={"form-terms-checkbox"}
                                    {...register("termsAccepted")}
                                />
                            </label>
                        </span>
                    </span>
                </div>
                <SubmitButton isSubmitting={isSubmitting} />
            </div>
        </div>
    );
};

export default ContactFormFields;
