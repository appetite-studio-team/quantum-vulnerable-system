import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Quantum Vulnerability Tracking System",
  description: "Comprehensive database tracking cryptographic systems and protocols vulnerable to quantum computing attacks. Monitor, submit, and review quantum security threats.",
  keywords: ["quantum computing", "cryptography", "security", "vulnerability", "post-quantum", "encryption"],
  authors: [{ name: "Quantum Security Team" }],
  openGraph: {
    title: "Quantum Vulnerability Tracking System",
    description: "Track and monitor cryptographic systems vulnerable to quantum computing attacks",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
