import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "devOverflow",
  description: `devOverflow is a platform that over \
  2 people visit every month to ask questions,\
  learn, and share technical knowledge. Where developers \
  and technologists share private knowledge with coworkers. \
  Reach the world's largest audience of developers and technologists.`,
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={ruRU}
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} ${spaceGrotesk.className}`}>
          <h1 className="h1-bold">DevOverflow</h1>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
