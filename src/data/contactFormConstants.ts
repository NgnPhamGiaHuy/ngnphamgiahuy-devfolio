export const FORM_MESSAGES = {
    SUCCESS: "Your message has been sent successfully!",
    ERROR: "Failed to send message. Please try again.",
    REQUIRED: {
        NAME: "Name is required",
        EMAIL: "Email is required",
        SUBJECT: "Subject is required",
        MESSAGE: "Message is required",
        TERMS: "You must accept the terms and conditions",
    },
    EMAIL_INVALID: "Please enter a valid email address",
} as const;

export const FORM_FIELDS = {
    NAME: {
        id: "name",
        label: "Your Name",
        placeholder: "Enter your name",
        type: "text",
    },
    EMAIL: {
        id: "email",
        label: "Your Email Address",
        placeholder: "Enter your email",
        type: "email",
    },
    SUBJECT: {
        id: "subject",
        label: "Your Subject",
        placeholder: "Enter your Subject",
        type: "text",
    },
    MESSAGE: {
        id: "message",
        label: "Your Message",
        placeholder: "How can I help you?",
        isTextArea: true,
        rows: 6,
    },
} as const;

export const API_CONFIG = {
    ENDPOINT: "/api/contact",
    METHOD: "POST",
    HEADERS: {
        "Content-Type": "application/json",
    },
    TIMEOUT: 1500,
} as const;
