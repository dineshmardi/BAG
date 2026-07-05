import { Toaster } from "sonner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AnnouncementBar from "@/components/layout/announcement-bar";
import { BRAND } from "@/constants/brand";

import type { Metadata } from "next";
import { Geist, Inter, Playfair_Display } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: BRAND.title,
  description: BRAND.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}

        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}