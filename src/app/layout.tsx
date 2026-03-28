import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SummitRentalsJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: {
    default:
      "Summit Rentals — Ukhrul Trekking & Manipur Tourism Equipment Rentals",
    template: "%s | Summit Rentals",
  },
  description:
    "Premium equipment rentals for Ukhrul trekking, Shirui Lily festival, Loktak Lake camping, and Manipur tourism. Cars, bikes, cameras, camping gear delivered across Manipur.",
  keywords: [
    "ukhrul trekking",
    "shirui lily festival",
    "manipur tourism",
    "loktak lake camping",
    "ukhrul camping",
    "shirui lily",
    "khangkhui cave",
    "wuyawon kachui",
    "harva khangai",
    "ukhrul shirock",
    "manipur trekking",
    "imphal equipment rental",
    "manipur adventure tours",
    "northeast india trekking",
    "manipur travel equipment",
    "ukhrul tourism",
  ],
  openGraph: {
    title: "Ukhrul Trekking & Manipur Tourism Equipment Rentals",
    description:
      "Premium equipment for Shirui Lily festival, Loktak Lake camping, Ukhrul trekking adventures. Cars, cameras, camping gear delivered across Manipur.",
    url: "https://summitrentals.com",
    siteName: "Summit Rentals",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ukhrul Trekking & Manipur Tourism Rentals",
    description:
      "Equipment for Shirui Lily festival, Loktak camping, Khangkhui cave exploration. Delivered in Manipur.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "KrT1sWgLJCi0eyUJuGBI4aZ3Nc1PjP0Pqe1z4Jeq22I",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SummitRentalsJsonLd),
          }}
        />
      </head>
      <body className="noise-overlay">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
