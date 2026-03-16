import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ibmPlexMono, inter, spaceGrotesk } from "@/app/_utils/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leon Yanagida | Software Engineer",
  description:
    "Full-stack engineer building AI-powered systems, product experiences, and reliable cloud-backed software.",
  metadataBase: new URL("https://www.leonyanagida.com"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      >
        {children}
      </body>
      {process.env.GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
