import type { Metadata } from "next";
import { pressStart2P } from "@/app/_utils/fonts";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";
import { FooterProvider } from "./_contexts/FooterContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leon Yanagida - Full-Stack Developer",
  description: "A creative thinker and developer who turns ideas into digital realities. Join me on a journey where passion meets practicality in the world of development",
  metadataBase: new URL("https://www.leonyanagida.com"),
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
    </html>
  );
}
