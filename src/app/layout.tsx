import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShoegaZone - Dreamy Shoegaze & Alternative Music Platform",
  description: "Discover and explore AI-generated shoegaze and alternative rock soundscapes. Curated atmospheric music for deep listening experiences.",
  keywords: ["shoegaze", "alternative rock", "suno", "AI music", "atmospheric", "ethereal", "dreamy", "music discovery"],
  openGraph: {
    title: "ShoegaZone - Dreamy Shoegaze & Alternative Music",
    description: "Immerse yourself in AI-crafted shoegaze and alternative soundscapes",
    type: "website",
  },
  authors: [{ name: "ShoegaZone Team" }],
  creator: "ShoegaZone",
  publisher: "ShoegaZone",
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c4b4e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
