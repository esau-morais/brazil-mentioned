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
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) => {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "w-full min-h-dvh bg-background text-foreground",
          GeistMono.className,
        )}
        suppressHydrationWarning
      >
        <main>{children}</main>
        <div id="modal-root" />
        {modal}
      </body>
    </html>
  );
};

export default RootLayout;
