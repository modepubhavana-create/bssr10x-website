import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BSSR10X | AI Website Audits and Web Design for Local Businesses",
  description:
    "BSSR10X helps local businesses transform outdated websites into modern, mobile-friendly pages designed to increase enquiries, bookings, and customer trust.",
  keywords: [
    "BSSR10X",
    "AI website audit",
    "local business website design",
    "website redesign",
    "mobile friendly website",
    "small business web design",
  ],
  openGraph: {
    title: "BSSR10X | Build Better Websites. Start Your Revolution.",
    description:
      "AI-powered website audits and modern redesigns for restaurants, clinics, salons, real estate agents, and local service businesses.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
