// ============================================================
// Social icon catalog — curated registry for the admin icon picker.
// Uses lucide-react (already installed) for brand icons. A handful of
// missing brand icons (Discord, StackOverflow, Dev.to) are embedded as
// inline SVG paths to avoid adding a dependency.
// ============================================================

export type IconEntry = {
    label: string;
    library: "lucide" | "custom";
    name: string;
    category: "Social" | "Dev" | "General";
};

// SVG viewBox="0 0 24 24" paths for icons not available in lucide-react
export const CUSTOM_ICON_PATHS: Record<string, string> = {
    discord:
        "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z",
    stackoverflow:
        "M17.36 20.2v-5.38h1.79V22H3v-7.18h1.8v5.38h12.56zM6.77 14.32l.37-1.76 8.79 1.85-.37 1.76-8.79-1.85zm1.16-4.21.76-1.61 8.14 3.78-.76 1.62-8.14-3.79zm2.26-3.99 1.15-1.38 6.9 5.76-1.15 1.37-6.9-5.75zm4.45-4.25L16 3.4l5.22 6.88-1.36.87-5.22-6.88zM6.6 18.2v-1.8h9v1.8h-9z",
    devto:
        "M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.89-.03c.48-.02.91 0 .94.04.03.04-.26 1.13-.67 2.43-.91 2.83-1.54 4.68-1.48 4.24z",
};

export const SOCIAL_ICON_CATALOG: IconEntry[] = [
    // ── Social ───────────────────────────────────────────────────────────────
    { label: "GitHub",       library: "lucide", name: "Github",       category: "Social" },
    { label: "LinkedIn",     library: "lucide", name: "Linkedin",     category: "Social" },
    { label: "Twitter / X",  library: "lucide", name: "Twitter",      category: "Social" },
    { label: "Instagram",    library: "lucide", name: "Instagram",    category: "Social" },
    { label: "Facebook",     library: "lucide", name: "Facebook",     category: "Social" },
    { label: "YouTube",      library: "lucide", name: "Youtube",      category: "Social" },
    { label: "Twitch",       library: "lucide", name: "Twitch",       category: "Social" },
    { label: "Discord",      library: "custom", name: "discord",      category: "Social" },

    // ── Dev ──────────────────────────────────────────────────────────────────
    { label: "GitLab",       library: "lucide", name: "Gitlab",       category: "Dev" },
    { label: "Codepen",      library: "lucide", name: "Codepen",      category: "Dev" },
    { label: "Figma",        library: "lucide", name: "Figma",        category: "Dev" },
    { label: "StackOverflow",library: "custom", name: "stackoverflow", category: "Dev" },
    { label: "Dev.to",       library: "custom", name: "devto",        category: "Dev" },
    { label: "Terminal",     library: "lucide", name: "Terminal",     category: "Dev" },
    { label: "Code",         library: "lucide", name: "Code2",        category: "Dev" },

    // ── General ──────────────────────────────────────────────────────────────
    { label: "Website",      library: "lucide", name: "Globe",        category: "General" },
    { label: "Email",        library: "lucide", name: "Mail",         category: "General" },
    { label: "Phone",        library: "lucide", name: "Phone",        category: "General" },
    { label: "Blog / RSS",   library: "lucide", name: "Rss",          category: "General" },
    { label: "Book",         library: "lucide", name: "BookOpen",     category: "General" },
    { label: "External link",library: "lucide", name: "ExternalLink", category: "General" },
    { label: "At sign",      library: "lucide", name: "AtSign",       category: "General" },
];
