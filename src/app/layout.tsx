import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

const geistRoboto = Roboto({
    variable: "--font-geist-roboto",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "NgnPhamGiaHuy Devfolio",
    description: "Developed by NgnPhamGiaHuy",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>): React.ReactElement {
    return (
        <html lang="en">
            <body className={`${geistRoboto.variable} antialiased`}>
                { children }
            </body>
        </html>
    );
}
