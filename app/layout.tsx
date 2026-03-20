import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anjanex.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anjanex - We Ship Products, Not Projects",
  description:
    "We partner with startups to design, develop, and launch digital products that drive real growth - Web, Mobile, AI, and beyond.",
  keywords: [
    "website development India",
    "digital marketing India",
    "SEO services India",
    "AI services India",
    "AI development",
    "product development",
    "startup consulting",
    "web solutions",
    "mobile app development",
  ],
  authors: [{ name: "Anjanex" }],
  creator: "Anjanex",
  publisher: "Anjanex",
  robots: "index, follow",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Anjanex",
    title: "Anjanex - We Ship Products, Not Projects",
    description:
      "We partner with startups to design, develop, and launch digital products that drive real growth - Web, Mobile, AI, and beyond.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anjanex - Product Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjanex - We Ship Products, Not Projects",
    description:
      "We partner with startups to design, develop, and launch digital products that drive real growth - Web, Mobile, AI, and beyond.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "S0w3E8PQOKS7ssUYHw9tXGZ9KPSH8ycao6CzSWv5dtA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}