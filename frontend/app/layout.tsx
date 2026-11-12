import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07111f",
};

export const metadata: Metadata = {
  title: {
    default: "CivicLens Core — Public Infrastructure Operations",
    template: "%s | CivicLens Core",
  },
  description:
    "Secure GIS-enabled public infrastructure operations platform for India. Transparent incident reporting, asset management, inspections and audit trails.",
  keywords: [
    "public infrastructure",
    "civic operations",
    "GIS",
    "incident management",
    "government platform",
    "India",
    "smart city",
  ],
  authors: [{ name: "CivicLens Core Team" }],
  openGraph: {
    title: "CivicLens Core — Public Infrastructure Operations",
    description: "Secure GIS-enabled public infrastructure operations platform.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Inter for modern mode; Noto Sans for GIGW govt mode via CSS font-family swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Skip-to-content link — WCAG 2.4.1 */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
