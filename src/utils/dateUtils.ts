export const formatDate = (
    dateString: string,
    locale: string = "en-US"
): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
};
