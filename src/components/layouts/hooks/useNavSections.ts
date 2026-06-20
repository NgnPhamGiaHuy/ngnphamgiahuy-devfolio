"use client";

import React from "react";

import type { SectionConfigItemType } from "@/schemas";

import { SIDEBAR_CONFIG } from "@/infrastructure/config";

export const SECTION_DISPLAY_NAMES: Record<string, string> = {
    hero: "Home",
    projects: "Projects",
    now: "Now",
    services: "Services",
    skills: "Skills",
    portfolios: "Portfolios",
    resume: "Resume",
    certificates: "Certificates",
    testimonials: "Testimonials",
    pricing: "Pricing",
    blog: "Blog",
    contact: "Contact",
    map: "Map",
};

export interface NavMenuItem {
    id: string;
    label: string;
}

/** Build the nav menu from the enabled section config (falls back to defaults). */
export const buildMenuItems = (
    enabledSections?: SectionConfigItemType[]
): NavMenuItem[] =>
    enabledSections
        ? enabledSections
              .filter((section) => section.enabled && section.id)
              .map((section) => ({
                  id: section.id!,
                  label: SECTION_DISPLAY_NAMES[section.id!] || section.id!,
              }))
        : SIDEBAR_CONFIG.MENU_ITEMS.map((label) => ({
              id: label.toLowerCase().replace(/\s+/g, "-"),
              label,
          }));

/** Scroll-spy: returns the id of the section nearest the viewport centre. */
export const useActiveSection = (ids: string[]): string | null => {
    const key = ids.join(",");
    const [active, setActive] = React.useState<string | null>(ids[0] ?? null);
    React.useEffect(() => {
        const els = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el);
        if (!els.length) return;
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    return active;
};
