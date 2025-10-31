"use client";

import React, { useMemo } from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

import { buildShareLinks } from "@/utils";

interface SharePlatform {
    id: "facebook" | "x" | "linkedin";
    href: string;
    label: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const useSharePlatforms = (url: string, title: string) => {
    const links = useMemo(() => buildShareLinks(url, title), [url, title]);

    const platforms = useMemo<SharePlatform[]>(
        () => [
            {
                id: "facebook",
                href: links.facebook,
                label: "Share on Facebook (opens in new tab)",
                Icon: Facebook,
            },
            {
                id: "x",
                href: links.x,
                label: "Share on X (opens in new tab)",
                Icon: Twitter,
            },
            {
                id: "linkedin",
                href: links.linkedin,
                label: "Share on LinkedIn (opens in new tab)",
                Icon: Linkedin,
            },
        ],
        [links.facebook, links.x, links.linkedin]
    );

    return platforms;
};

export default useSharePlatforms;
