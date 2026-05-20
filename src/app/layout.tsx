import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Montserrat, Titillium_Web, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import dynamic from 'next/dynamic';

const SiteHeader = dynamic(() => import('@/components/layout/site-header').then(mod => mod.SiteHeader), {
  ssr: false, // Ini kuncinya! Mematikan Server-Side Rendering untuk Header
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  display: "swap",
});

const interFont = Inter({
  variable: "--font-inter-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sentradaya - Solusi Energi Terbarukan Terpercaya",
  description:
    "Distributor resmi PJU Tenaga Surya, Panel Surya, Penangkal Petir, dan Baterai. Solusi energi terbarukan terpercaya untuk bisnis Anda.",
  keywords: [
    "Sentradaya",
    "PJU Tenaga Surya",
    "Panel Surya",
    "Penangkal Petir",
    "Baterai",
    "Energi Terbarukan",
    "Solar Energy",
    "Lifepo4",
  ],
  authors: [{ name: "Sentradaya" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${montserrat.variable} ${titillium.variable} ${interFont.variable} font-sans antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
