import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Raylay",
  description:
    "A cheaper buoy network anyone can place. The numbers come back in plain language.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
