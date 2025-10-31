// ============================================================
// Module: Portable Text Styles
// Purpose: Centralized CVA style contracts for Portable Text rendering
// ============================================================

// ============================================================
// Imports
// ============================================================
import { cva } from "class-variance-authority";

// ============================================================
// Prose Wrapper
// ============================================================
/**
 * proseWrapper provides a consistent typography container for Portable Text
 * content. Keeps width fluid and scales at lg for improved readability.
 */
export const proseWrapper = cva("prose prose-neutral lg:prose-lg max-w-none");

// ============================================================
// Headings
// ============================================================
/**
 * heading defines semantic heading levels with tuned rhythm and contrast.
 * Default level is h2 for typical section headings.
 */
export const heading = cva(
    "tracking-tight text-neutral-900 dark:text-neutral-100",
    {
        variants: {
            level: {
                // Rhythm: h1 mt-12 mb-4; keep existing tone (sizes/weights)
                h1: "mt-12 mb-4 text-[34px] max-md:text-[28px] font-bold leading-[1.3]",
                // Rhythm: h2 mt-10 mb-3 with bottom rule for section separation
                h2: "mt-10 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-800 text-[28px] max-md:text-[24px] font-semibold leading-[1.35]",
                // Rhythm: h3 mt-8 mb-2
                h3: "mt-8 mb-2 text-[22px] max-md:text-[20px] font-semibold leading-[1.4]",
            },
        },
        defaultVariants: {
            level: "h2",
        },
    }
);

// ============================================================
// Paragraphs
// ============================================================
/**
 * paragraph styles fluid paragraphs with generous leading for readability
 * and consistent vertical rhythm across breakpoints.
 */
export const paragraph = cva(
    "my-[28px] max-md:my-[24px] text-[18px] max-md:text-[16px] leading-[1.85] text-neutral-800 dark:text-neutral-200"
);

// ============================================================
// Lists
// ============================================================
/**
 * listVariants exposes bullet and numbered lists with tuned spacing and
 * indentation. Default variant is bullet.
 */
export const listVariants = cva(
    "pl-[24px] my-[24px] max-md:my-[20px] space-y-1.5 text-[18px] max-md:text-[16px] leading-[1.7] text-neutral-800 dark:text-neutral-200",
    {
        variants: {
            type: {
                bullet: "list-disc",
                number: "list-decimal",
            },
        },
        defaultVariants: {
            type: "bullet",
        },
    }
);

// ============================================================
// Blockquote
// ============================================================
/**
 * blockquoteClass creates a stylized blockquote with decorative spacing.
 */
export const blockquoteClass = cva(
    "my-[40px] max-sm:my-[20px] ml-[40px] max-sm:ml-0 pt-[65px]! px-[40px]! text-[18px] max-md:text-[16px] text-inverse! font-normal border-l border-solid border-inverse! leading-[1.7] relative"
);

// ============================================================
// Inline Code
// ============================================================
/**
 * inlineCodeClass provides a subtle, readable inline code treatment.
 */
export const inlineCodeClass = cva(
    "inline-block bg-neutral-100 dark:bg-neutral-800 text-[15px] px-[6px] py-[2px] rounded font-mono tracking-tight text-neutral-900 dark:text-neutral-100"
);

// ============================================================
// Links
// ============================================================
/**
 * linkClass aligns anchor styling across rendered Portable Text content.
 */
export const linkClass = cva(
    "text-primary underline underline-offset-4 hover:no-underline"
);
