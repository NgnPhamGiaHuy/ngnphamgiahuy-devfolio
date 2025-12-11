import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { Caveat, Jost, Roboto } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components";
import { generateHomePageMetadata } from "@/application";

const geistRoboto = Roboto({
    variable: "--font-geist-roboto",
    subsets: ["latin"],
});

const geistCaveat = Caveat({
    variable: "--font-geist-caveat",
    subsets: ["latin"],
});

const geistJost = Jost({
    variable: "--font-geist-jost",
    subsets: ["latin"],
});

export async function generateMetadata(
    _props: unknown,
    _parent: ResolvingMetadata
): Promise<Metadata> {
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
                className={`${geistRoboto.variable} ${geistCaveat.variable} ${geistJost.variable} antialiased`}
                suppressHydrationWarning
            >
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
