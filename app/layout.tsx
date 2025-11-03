import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Davidoff Accessories Sweepstakes | Cigar Aficionado",
  description: "Enter for your chance to win one of five refined Davidoff accessories. To celebrate craftsmanship and time beautifully filled, Davidoff has partnered with Cigar Aficionado to present an exclusive sweepstakes.",
  keywords: "davidoff, sweepstakes, cigar accessories, humidor, cigar aficionado, giveaway",
  openGraph: {
    title: "Davidoff Accessories Sweepstakes",
    description: "Enter for your chance to win one of five exceptional Davidoff accessories, each designed to elevate your every cigar moment.",
    type: "website",
    siteName: "Davidoff",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davidoff Accessories Sweepstakes",
    description: "Enter to win one of five refined Davidoff accessories. Time beautifully filled.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
