import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ShoegaZone - シューゲイザー・オルタナティブロック特化音楽アプリ",
  description: "Sunoで生成されたシューゲイザー・オルタナティブロック楽曲に特化した音楽発見・再生アプリケーション",
  keywords: ["shoegaze", "シューゲイザー", "alternative rock", "オルタナティブロック", "suno", "AI music", "音楽アプリ"],
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
    <html lang="ja" className="dark">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen bg-atmosphere-gradient">
          {children}
        </div>
      </body>
    </html>
  );
}
