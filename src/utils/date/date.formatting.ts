// ============================================================
// Utility: Date Formatting
// Purpose: Date formatting utilities with locale support
// ============================================================

// ============================================================
// Constants
// ============================================================

/** Default locale for date formatting */
const DEFAULT_LOCALE = "en-US";

/** Default date formatting options */
const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
} as const;

// ============================================================
// Types
// ============================================================

/** Date formatting options */
interface DateFormatOptions {
    /** Locale for formatting */
    locale?: string;
    /** Custom formatting options */
    options?: Intl.DateTimeFormatOptions;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Formats a date string into a human-readable format.
 * Handles invalid dates gracefully and provides fallback formatting.
 *
 * @param dateString - Date string to format
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * // Basic usage
 * formatDate("2023-12-25") // "December 25, 2023"
 *
 * // With custom locale
 * formatDate("2023-12-25", { locale: "fr-FR" }) // "25 décembre 2023"
 *
 * // With custom options
 * formatDate("2023-12-25", {
 *   options: { year: "2-digit", month: "short" }
 * }) // "Dec 25, 23"
 * ```
 */
export const formatDate = (
    dateString: string,
    options: DateFormatOptions = {}
): string => {
    const { locale = DEFAULT_LOCALE, options: customOptions } = options;

    try {
        const date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.warn(`Invalid date string provided: ${dateString}`);
            return "Invalid Date";
        }

        // Use custom options or default options
        const formatOptions = customOptions || DEFAULT_DATE_OPTIONS;

        return date.toLocaleDateString(locale, formatOptions);
    } catch (error) {
        console.error(`Error formatting date: ${dateString}`, error);
        return "Invalid Date";
    }
};

/**
 * Formats a date string with backward compatibility.
 * Maintains the original function signature for existing code.
 *
 * @param dateString - Date string to format
 * @param locale - Locale for formatting (default: "en-US")
 * @returns Formatted date string
 *
 * @deprecated Use formatDate with options object instead
 */
export const formatDateLegacy = (
    dateString: string,
    locale: string = DEFAULT_LOCALE
): string => {
    return formatDate(dateString, { locale });
};
