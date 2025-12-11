const DEFAULT_LOCALE = "en-US";

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
} as const;

interface DateFormatOptions {
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
}

export const formatDate = (
    dateString: string,
    options: DateFormatOptions = {}
): string => {
    const { locale = DEFAULT_LOCALE, options: customOptions } = options;

    try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            console.warn(`Invalid date string provided: ${dateString}`);

            return "Invalid Date";
        }

        const formatOptions = customOptions || DEFAULT_DATE_OPTIONS;

        return date.toLocaleDateString(locale, formatOptions);
    } catch (error) {
        console.error(`Error formatting date: ${dateString}`, error);

        return "Invalid Date";
    }
};
