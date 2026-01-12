import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased scroll-smooth`}>
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "TheFoody - Book Your Perfect Dining Experience",
  description:
    "Discover and book tables at the best restaurants. Search for meals, explore cuisines, and reserve your spot for an unforgettable dining experience.",
};
