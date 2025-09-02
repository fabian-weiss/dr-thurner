import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { NavbarAppearance } from "@/constants/enums";
import {
  navEntriesMainConfigDieThurner,
  navEntriesLegalConfigDieThurner,
  companyInfoDieThurner,
} from "@/data/die_thurner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Marion Thurner",
  description: "Pferde-Chiropraktik in 1190 Wien",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <Navbar
            tKey="NAVIGATION"
            logoSrc={"/logoipsum.svg"}
            navEntriesMainConfig={navEntriesMainConfigDieThurner}
            navEntriesLegalConfig={navEntriesLegalConfigDieThurner}
            companyInfo={companyInfoDieThurner}
            appearance={NavbarAppearance.DEFAULT}
          ></Navbar>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
