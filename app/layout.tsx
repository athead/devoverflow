import "../styles/prism.css";
import "./globals.css";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Rubik } from "next/font/google";
import React from "react";
import { cookies } from "next/headers";

import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const rubik = Rubik({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
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
  const prefersDark = cookies().get("x-theme")?.value === "dark";
  return (
    <html lang="en" className={`${prefersDark ? "dark" : ""}`}>
      <body className={`${inter.className} ${rubik.className}`}>
        <ClerkProvider
          localization={ruRU}
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
