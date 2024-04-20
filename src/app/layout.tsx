import type { Metadata } from "next";
import "./globals.css";

import { GeistMono } from "geist/font/mono";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ThePrimeQuest // #BrazilMentioned ",
  description:
    "Interactive and real-time quiz about Brazil in honor to ThePrimeagen",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn("w-full min-h-dvh", GeistMono.className)}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
