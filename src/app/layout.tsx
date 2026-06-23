import React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { ThemeProvider } from "@/components";
import { generateHomePageMetadata } from "@/application";

// DESIGN.md type trinity (claude.com editorial aesthetic):
// - DISPLAY: a slab-serif at weight 400-500 with negative tracking for every
//   h1-h3/display headline — the brand's "non-negotiable" literary voice.
//   Cormorant Garamond is DESIGN.md's documented open-source substitute for
//   Copernicus / Tiempos Headline.
const cormorant = Cormorant_Garamond({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

// - BODY/UI: a humanist sans for body, nav, buttons, captions, labels.
//   Inter is DESIGN.md's documented substitute for StyreneB.
const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

// - CODE/TECHNICAL: JetBrains Mono for code blocks, metric values, graph
//   technical labels, and route pills.
const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
    return await generateHomePageMetadata();
}

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({
    children,
}: Readonly<RootLayoutProps>): React.ReactElement {
    return (
        <html lang={"en"} suppressHydrationWarning>
            <body
                className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
                suppressHydrationWarning
            >
                <ThemeProvider>{children}</ThemeProvider>
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
                )}
            </body>
        </html>
    );
}
