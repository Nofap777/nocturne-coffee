import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import React from "react";
// We will initialize Lenis here or in a wrapper

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
    title: "Nocturne Cold Brew | Awwwards Level Scrollytelling",
    description: "Experience the dark and smooth profile of Nocturne Cold Brew.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} antialiased bg-background text-foreground`}>
                {children}
            </body>
        </html>
    );
}
