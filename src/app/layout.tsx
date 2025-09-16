import type { Metadata } from "next";
import { Roboto, Caveat, Jost } from "next/font/google";

import "./globals.css";
import { generateHomePageMetadata } from "@/lib/metadata";

const geistRoboto = Roboto({
    variable: "--font-geist-roboto",
    subsets: ["latin"],
});

const geistCaveat = Caveat({
    variable: "--font-geist-caveat",
    subsets: ["latin"]
});

const geistJost = Jost({
    variable: "--font-geist-jost",
    subsets: ["latin"]
});

export const metadata: Metadata = await generateHomePageMetadata();

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>): React.ReactElement {
    return (
        <html lang={"en"}>
            <body className={`${geistRoboto.variable} ${geistCaveat.variable} ${geistJost.variable} antialiased`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}