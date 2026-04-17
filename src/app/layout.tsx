import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kevin Lee — Software Engineer",
  description:
    "Kevin Lee — Dartmouth CS student building clean, fast software and ML-powered tools.",
  metadataBase: new URL("https://kevinghlee.me"),
  openGraph: {
    title: "Kevin Lee — Software Engineer",
    description:
      "Dartmouth CS student building software and ML-powered tools.",
    url: "https://kevinghlee.me",
    siteName: "Kevin Lee",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Lee — Software Engineer",
    description:
      "Dartmouth CS student building software and ML-powered tools.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
