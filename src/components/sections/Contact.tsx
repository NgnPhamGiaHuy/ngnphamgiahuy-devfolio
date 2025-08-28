import React from "react";

import { data } from "@/data/data";

import BackgroundText from "@/components/ui/BackgroundText";
import ContactItem from "@/components/ui/contact/ContactItem";
import ContactForm from "@/components/ui/contact/ContactForm";
import SectionWrapper from "@/components/sections/SectionWrapper";

const Contact = () => {
    const { contacts } = data;

    return (
        <SectionWrapper title={"Contact Me"} subtitle={"Let's Talk About Ideas"} background={"gradientDown"} sectionContentMaxWidth={"1180px"} vlinePosition={"left"}>
            <div className={"contact-column-left"}>
                <div className={"contact-column-content"}>
                    <div className={"contact-items-container"}>
                        { contacts.map((contact, index) => (
                            <ContactItem key={index} contact={contact} />
                        )) }
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
        </SectionWrapper>
    );
};

export default Contact;
