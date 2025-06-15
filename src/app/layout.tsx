
import { Geist, Geist_Mono, Inter, Anton } from "next/font/google";
import "./globals.css";
import { metadata as baseMetadata } from "./shared-metadata";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Framagz - Modern News & Magazine Template",
  description: "A cutting-edge Framer template designed for digital news platforms, blogs, and online magazines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${anton.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
