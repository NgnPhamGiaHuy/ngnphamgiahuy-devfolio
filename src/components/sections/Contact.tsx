import React from "react";

import type { ContactSectionProps } from "@/types";

import { Wrapper, BackdropText, ContactMethodCard, ContactForm } from "@/components";

const Contact: React.FC<ContactSectionProps> = ({ contacts, resetAnimationOnView }) => {
    return (
        <Wrapper title={"Contact Me"} subtitle={"Let's Talk About Ideas"} background={"gradientDown"} sectionContentMaxWidth={"1180px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"contact-column-left"}>
                <div className={"contact-column-content"}>
                    <div className={"contact-items-container"}>
                        {contacts.map((contact, index) => (
                            <ContactMethodCard key={index} contact={contact} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={"contact-column-right"}>
                <div className={"contact-column-content"}>
                    <div className={"contact-background-pattern"}></div>
                    <div className={"contact-form-container"}>
                        <ContactForm />
                    </div>
                </div>
            </div>
            <BackdropText text={"Contact Me"} />
        </Wrapper>
    );
};

export default Contact;
