import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { pressStart2P } from "@/app/_utils/fonts";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";
import { FooterProvider } from "./_contexts/FooterContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leon Yanagida - Software Engineer",
  description: "A developer specializing in turning your ideas into technical realities. I tailor the web to your needs.",
  metadataBase: new URL("https://www.leonyanagida.com"),
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        <FooterProvider>
          <Header />
          {children}
          <Footer />
        </FooterProvider>
      </body>
      {process.env.GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
