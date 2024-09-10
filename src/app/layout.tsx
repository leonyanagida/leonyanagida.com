import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { pressStart2P } from "@/app/_utils/fonts";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";
import { FooterProvider } from "./_contexts/FooterContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leon Yanagida - Full-Stack Developer",
  description: "A creative thinker and developer who turns ideas into digital realities. Join me on a journey where passion meets practicality in the world of development",
  metadataBase: new URL("https://www.leonyanagida.com"),
  icons: {
    icon: "./favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      setConsentGiven(true);
    }
  }, []);

  return (
    <html lang="en">
      {process.env.GTM && (
        <GoogleTagManager gtmId={process.env.GTM} />
      )}
      <body className={pressStart2P.className}>
        <FooterProvider>
          <Header />
          {children}
          <Footer />
        </FooterProvider>
      </body>
      {consentGiven && process.env.GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
