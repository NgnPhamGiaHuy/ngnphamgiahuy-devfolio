// ============================================================
// Component: Map
// Purpose: Embedded Google Maps iframe with configurable settings
// ============================================================

import React from "react";

import type { MapSectionProps } from "@/types";

// ============================================================
// Constants
// ============================================================

const DEFAULT_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2090.9739612868702!2d106.61914557100185!3d10.736979972065594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752d0057ce7589%3A0xf7092a37d7f3c9d0!2sThe%20Privia!5e0!3m2!1sen!2s!4v1756414516144!5m2!1sen!2s";
const DEFAULT_HEIGHT = 580;

// ============================================================
// Component Definition
// ============================================================

/**
 * Map component renders an embedded Google Maps iframe.
 * Features configurable embed URL and height with accessibility support.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.mapConfig - Map configuration object
 * @param props.mapConfig.embedUrl - Google Maps embed URL
 * @param props.mapConfig.height - Map height in pixels
 * @returns Map section component
 */
const Map: React.FC<MapSectionProps> = ({ id, mapConfig }) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple fallback values don't need memoization
    const embedUrl = mapConfig?.embedUrl || DEFAULT_EMBED_URL;
    const height = mapConfig?.height || DEFAULT_HEIGHT;

    // ============================================================
    // Render
    // ============================================================

    return (
        <section id={id} className="relative" data-testid="map-section">
            <div className="flex mx-auto relative">
                <div className="flex-full">
                    <div className="flex-wrap-start">
                        <iframe
                            src={embedUrl}
                            title="Location map"
                            aria-label="Embedded Google Map showing location"
                            loading="lazy"
                            className="w-full [filter:brightness(80%)_contrast(125%)_saturate(0%)_blur(0px)_hue-rotate(0deg)]"
                            style={{ height: `${height}px` }}
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                            data-testid="map-iframe"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

Map.displayName = "Map";

export default Map;
