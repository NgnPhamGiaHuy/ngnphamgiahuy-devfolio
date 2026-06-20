import React from "react";
import Image from "next/image";

import type { SanityImageType } from "@/schemas";

import { resolveImageUrl } from "@/shared/utils";

interface BrowserFrameProps {
    image?: SanityImageType | string;
    alt: string;
    /** Live URL — its hostname is shown in the chrome's address pill. */
    link?: string;
    /** Fallback pill text when there's no link. */
    routeLabel?: string;
    /** Duotone (grayscale at rest, colour on hover) vs always-colour. */
    tone?: "duotone" | "color";
    sizes?: string;
    priority?: boolean;
    className?: string;
    /** Sanity CDN request width. */
    width?: number;
}

const hostnameOf = (link?: string, fallback = "preview"): string => {
    if (!link) return fallback;
    try {
        return new URL(link).hostname.replace(/^www\./, "");
    } catch {
        return link.replace(/^https?:\/\//, "").split("/")[0] || fallback;
    }
};

/**
 * BrowserFrame — one media system for every project screenshot. Pure-CSS
 * browser chrome (3 dots + a mono address pill) around an aspect-ratio-locked
 * body, so 7 differently-sized app UIs read as one designed set and CLS is
 * zero (the ratio is reserved before the image loads). Duotone at rest unifies
 * clashing palettes; colour returns on hover (desktop) / by default (touch).
 */
const BrowserFrame: React.FC<BrowserFrameProps> = ({
    image,
    alt,
    link,
    routeLabel,
    tone = "duotone",
    sizes = "(max-width: 768px) 100vw, 600px",
    priority = false,
    className,
    width = 1200,
}) => {
    const url = image
        ? resolveImageUrl(image, { width, height: Math.round((width * 10) / 16) })
        : "";
    const pill = routeLabel ?? hostnameOf(link);

    return (
        <div
            className={`browser-frame ${tone === "color" ? "browser-frame--color" : ""} ${className ?? ""}`}
        >
            <div className="browser-frame__bar" aria-hidden="true">
                <span className="browser-frame__dot" />
                <span className="browser-frame__dot" />
                <span className="browser-frame__dot" />
                <span className="browser-frame__pill">{pill}</span>
            </div>
            <div className="browser-frame__body">
                {url ? (
                    <Image
                        src={url}
                        alt={alt}
                        fill
                        className="browser-frame__img"
                        sizes={sizes}
                        priority={priority}
                        loading={priority ? undefined : "lazy"}
                    />
                ) : (
                    <span className="browser-frame__placeholder">
                        {pill}
                    </span>
                )}
            </div>
        </div>
    );
};

BrowserFrame.displayName = "BrowserFrame";

export default BrowserFrame;
