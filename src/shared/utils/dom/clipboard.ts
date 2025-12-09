export const copyTextWithFallback = async (text: string): Promise<void> => {
    if (navigator.clipboard && (window as any).isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement("textarea");

    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.setAttribute("readonly", "");
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    try {
        const ok = document.execCommand("copy");
        if (!ok) {
            throw new Error("execCommand returned false");
        }
    } finally {
        document.body.removeChild(textarea);
    }
};
