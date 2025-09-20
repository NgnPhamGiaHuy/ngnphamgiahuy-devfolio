import clsx from "clsx";
import React from "react";

import type { ContactFieldsProps } from "@/types";

import { FORM_FIELDS } from "@/config";
import { FormInput, SubmitButton } from "@/components";

const ContactFields: React.FC<ContactFieldsProps> = ({ register, isSubmitting, errors, watch }) => {
    const termsAccepted = watch("termsAccepted");

    const getLabelColor = () => {
        if (errors.termsAccepted) return "text-red-500";
        if (termsAccepted) return "text-green-600";
        return "text-gray-700";
    };

    return (
        <div className={"contact-fields"}>
            <FormInput
                id={FORM_FIELDS.NAME.id}
                label={FORM_FIELDS.NAME.label}
                placeholder={FORM_FIELDS.NAME.placeholder}
                type={FORM_FIELDS.NAME.type}
                registration={register("name")}
                error={errors.name?.message}
                className={"contact-fields-input-wrapper-half"}
            />
            <FormInput
                id={FORM_FIELDS.EMAIL.id}
                label={FORM_FIELDS.EMAIL.label}
                placeholder={FORM_FIELDS.EMAIL.placeholder}
                type={FORM_FIELDS.EMAIL.type}
                registration={register("email")}
                error={errors.email?.message}
                className={"contact-fields-input-wrapper-half"}
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
            <div className={"contact-fields-footer"}>
                <div className={"contact-fields-terms-container"}>
                    <span className={"relative"}>
                        <span className={"contact-fields-terms-label-wrapper"}>
                            <label
                                htmlFor={"termsAccepted"}
                                className={clsx(
                                    getLabelColor(),
                                    "contact-fields-terms-label"
                                )}
                            >
                                <span className={"contact-fields-terms-text"}>
                                    Accept the terms and conditions
                                </span>
                                <input
                                    type={"checkbox"}
                                    id={"termsAccepted"}
                                    className={"contact-fields-terms-checkbox"}
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

export default ContactFields;
