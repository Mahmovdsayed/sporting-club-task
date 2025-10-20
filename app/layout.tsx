import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/Providers";
import { baseURL } from "@/constant/statics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL(baseURL), 

  title: "Sporting Club Task",
  description:
    "A modern web dashboard for managing members, sports, and subscriptions efficiently.",
  openGraph: {
    title: "Sporting Club Task",
    description:
      "Manage your club members and sports with ease using the Sporting Club Task dashboard.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sporting Club Task",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sporting Club Task",
    description:
      "Simplify your sports club management with the Sporting Club Task dashboard.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
