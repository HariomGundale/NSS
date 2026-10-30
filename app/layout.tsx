import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    template: "%s | NSS DYPCOE Akurdi",
    default: "NSS DYPCOE Akurdi | Unit A-106",
  },
  description:
    "Official website of National Service Scheme (NSS) Unit A-106 at Dr. D. Y. Patil College of Engineering, Akurdi, Pune. Motto: Not Me But You.",
  keywords: [
    "NSS",
    "DYPCOE",
    "Akurdi",
    "Unit A-106",
    "National Service Scheme",
    "Community Service",
    "Pune Engineering College",
    "Social Responsibility",
  ],
  authors: [{ name: "NSS DYPCOE Akurdi Unit A-106" }],
  icons: {
    icon: "/logo/nss-logo.png",
    shortcut: "/logo/nss-logo.png",
    apple: "/logo/nss-logo.png",
  },
  openGraph: {
    title: "NSS DYPCOE Akurdi | Unit A-106",
    description: "National Service Scheme Unit A-106, Dr. D. Y. Patil College of Engineering, Akurdi.",
    url: "https://nss.dypcoe.ac.in",
    siteName: "NSS DYPCOE Akurdi",
    images: [
      {
        url: "/images/reference-design.jpg",
        width: 1200,
        height: 630,
        alt: "NSS DYPCOE Akurdi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${plusJakartaSans.variable}`}>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
