import React from "react";

import type { ContactSectionProps } from "@/types";

import { Wrapper, BackdropText, ContactMethodCard, ContactForm } from "@/components";

const Contact: React.FC<ContactSectionProps> = ({ id, contacts, resetAnimationOnView }) => {
    return (
        <Wrapper id={id} title={"Contact Me"} subtitle={"Let's Talk About Ideas"} background={"gradientDown"} sectionContentMaxWidth={"1180px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"flex-2-5"}>
                <div className={"p-[10px] flex-wrap-start"}>
                    <div className={"w-full relative z-2"}>
                        {contacts.map((contact, index) => (
                            <ContactMethodCard key={index} contact={contact} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={"flex-3-5"}>
                <div className={"p-[10px] flex-wrap-start"}>
                    <div className={"size-[240px] bottom-[-32px] left-[-135px] pat-background"}></div>
                    <div className={"w-full relative"}>
                        <ContactForm />
                    </div>
                </div>
            </div>
            <BackdropText text={"Contact Me"} />
        </Wrapper>
    );
};

export default Contact;
