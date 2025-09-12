import React, { useMemo } from "react";

import { data } from "@/data";
import type { ContactSectionProps } from "@/types";
import { Wrapper, BackgroundText, ContactItem, ContactForm } from "@/components";

const Contact: React.FC<ContactSectionProps> = ({ contacts, resetAnimationOnView }) => {
    const contactsData = useMemo(() => contacts?.length ? contacts : data.contacts, [contacts]);

    return (
        <Wrapper title={"Contact Me"} subtitle={"Let's Talk About Ideas"} background={"gradientDown"} sectionContentMaxWidth={"1180px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"contact-column-left"}>
                <div className={"contact-column-content"}>
                    <div className={"contact-items-container"}>
                        {contactsData.map((contact, index) => (
                            <ContactItem key={index} contact={contact} />
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
            <BackgroundText text={"Contact Me"} />
        </Wrapper>
    );
};

export default Contact;
