import React from "react";

import type { ContactSectionProps } from "@/shared/types";

import { Section } from "@/components/layouts";
import { ContactForm, ContactMethodCard } from "@/components";

const Contact: React.FC<ContactSectionProps> = ({ id, contactItems }) => {
    const keyedContacts = contactItems.map((c, index) => ({
        key: (c as any)._id || `${c.type}-${c.value}-${index}`,
        item: c,
    }));

    return (
        <Section
            id={id}
            tone="sunken"
            eyebrow="Contact"
            title="Let's start the next one"
            intro="Everything above built on the commit before it. If you're working on systems, data, or AI, the next one could be ours."
            meta={
                <p className="font-mono-tnum mt-4 inline-flex items-center gap-2.5 text-sm text-graph-ink">
                    <span className="status-dot" aria-hidden="true" />
                    open to work — roles &amp; collaboration
                </p>
            }
            aria-label="Contact"
        >
            <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
                <div
                    role="list"
                    aria-label="Contact methods"
                    data-testid="contact-methods"
                    className="space-y-4"
                >
                    {keyedContacts.map(({ key, item }) => (
                        <ContactMethodCard
                            key={key}
                            type={item.type}
                            value={item.value}
                            label={item.label}
                            data-testid={`contact-method-${item.type}`}
                        />
                    ))}
                </div>

                <div
                    className="w-full"
                    data-testid="contact-form-container"
                >
                    <ContactForm />
                </div>
            </div>
        </Section>
    );
};

Contact.displayName = "Contact";

export default Contact;
