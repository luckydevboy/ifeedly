import { Nunito } from "next/font/google";
import "./globals.css";
import {
  NextAuthSessionProvider,
  ReactQueryProvider,
} from "@/app/lib/providers";
import { Toaster } from "react-hot-toast";
import React, { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>IFeedly</title>
        <meta name="title" content="IFeedly" />
        <meta name="description" content="A place to share your idea." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://ifeedly.vercel.app/assets/images/meta-banner.svg"
        />
        <meta property="og:title" content="IFeedly" />
        <meta property="og:description" content="A place to share your idea." />
        <meta
          property="og:image"
          content="https://ifeedly.vercel.app/assets/images/meta-banner.svg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://ifeedly.vercel.app/assets/images/meta-banner.svg"
        />
        <meta property="twitter:title" content="IFeedly" />
        <meta
          property="twitter:description"
          content="A place to share your idea."
        />
        <meta
          property="twitter:image"
          content="https://ifeedly.vercel.app/assets/images/meta-banner.svg"
        />

        {/* Meta Tags Generated with https://metatags.io */}
      </head>
      <body className={nunito.className}>
        <NextAuthSessionProvider>
          <ReactQueryProvider>
            <Suspense>{children}</Suspense>
          </ReactQueryProvider>
        </NextAuthSessionProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
