import { SectionConfig } from "@/types/section.types";


/**
 * Configuration for page sections
 * - id: Unique identifier for the section
 * - enabled: Whether the section should be displayed
 * - resetAnimationOnView: Whether the section should reset animation when it comes into view
 *   Note: This property only applies to sections that use the Wrapper component
 */
export const SECTIONS_CONFIG: SectionConfig[] = [
    {
        id: "hero",
        enabled: true,
        // Hero doesn't use Wrapper, so resetAnimationOnView doesn't apply
    },
    {
        id: "services",
        enabled: true,
        resetAnimationOnView: false,
    },
    {
        id: "skills",
        enabled: true,
        resetAnimationOnView: false,
    },
    {
        id: "work",
        enabled: true,
        resetAnimationOnView: false,
    },
    {
        id: "resume",
        enabled: true,
        resetAnimationOnView: false,
    },
    {
        id: "testimonials",
        enabled: true,
        resetAnimationOnView: false,
    },
    {
        id: "pricing",
        enabled: true,
        resetAnimationOnView: false,
    },
    {
        id: "blog",
        enabled: true,
        resetAnimationOnView: false,
    },
    {
        id: "contact",
        enabled: true,
        resetAnimationOnView: false,
    },
    {
        id: "map",
        enabled: true,
        // Map doesn't use Wrapper, so resetAnimationOnView doesn't apply
    },
];
