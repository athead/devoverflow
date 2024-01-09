import "../styles/prism.css";
import "./globals.css";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter } from "next/font/google";
import React from "react";
import { cookies } from "next/headers";

import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

// const rubik = Rubik({
//   subsets: ["cyrillic", "latin"],
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-rubik",
// });

export const metadata: Metadata = {
  title: "devOverflow",
  description: `devOverflow - это платформа, которую ежемесячно посещают более \
  2 человек, чтобы задавать вопросы,
  учиться и делиться техническими знаниями. Это площадка, где разработчики \
  и инженеры делятся личными знаниями с коллегами.`,
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
    // eslint-disable-next-line
    <html lang="ru" className={`${prefersDark ? "dark" : ""}`}>
      {/* ${rubik.className} */}
      <body className={`${inter.className}`}>  
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
