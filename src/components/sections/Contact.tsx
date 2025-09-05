import React from "react";

import { data } from "@/data/data";

import Wrapper from "@/components/sections/wrapper/Wrapper";
import BackgroundText from "@/components/ui/BackgroundText";
import ContactItem from "@/components/ui/contact/ContactItem";
import ContactForm from "@/components/ui/contact/ContactForm";

interface ContactProps {
    resetAnimationOnView?: boolean;
}

const Contact: React.FC<ContactProps> = ({ resetAnimationOnView }) => {
    const { contacts } = data;

    return (
        <Wrapper title={"Contact Me"} subtitle={"Let's Talk About Ideas"} background={"gradientDown"} sectionContentMaxWidth={"1180px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
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
        </Wrapper>
    );
};

export default Contact;
