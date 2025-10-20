import React, { useMemo } from "react";

import type { ContactSectionProps } from "@/types";

import {
    Wrapper,
    BackdropText,
    ContactMethodCard,
    ContactForm,
} from "@/components";

const Contact: React.FC<ContactSectionProps> = ({
    id,
    contactItems,
    resetAnimationOnView,
}) => {
    const keyedContacts = useMemo(
        () =>
            contactItems.map((c, index) => ({
                key: (c as any)._id || `${c.type}-${c.value}-${index}`,
                item: c,
            })),
        [contactItems]
    );

    return (
        <Wrapper
            id={id}
            title={"Contact Me"}
            subtitle={"Let's Talk About Ideas"}
            backgroundVariant={"gradientDown"}
            contentMaxWidth={"1180px"}
            verticalRulePosition={"left"}
            resetAnimationOnView={resetAnimationOnView}
        >
            <div className={"flex-2-5"}>
                <div className={"p-[10px] flex-wrap-start"}>
                    <div className={"w-full relative z-2"}>
                        {keyedContacts.map(({ key, item }) => (
                            <ContactMethodCard
                                key={key}
                                type={item.type}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={"flex-3-5"}>
                <div className={"p-[10px] flex-wrap-start"}>
                    <div
                        className={
                            "size-[240px] bottom-[-32px] left-[-135px] pat-background"
                        }
                    ></div>
                    <div className={"w-full relative"}>
                        <ContactForm />
                    </div>
                </div>
            </div>
            <BackdropText text={"Contact Me"} />
        </Wrapper>
    );
};

Contact.displayName = "Contact";

export default Contact;
