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

const SHORT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
} as const;

/** "Jun 2, 2026" — empty string for missing input (used by blog dates). */
export const formatShortDate = (dateString?: string): string =>
    dateString ? formatDate(dateString, { options: SHORT_DATE_OPTIONS }) : "";

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
