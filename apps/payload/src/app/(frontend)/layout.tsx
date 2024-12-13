import FooterServer from "@/blocks/global/Footer/Component";
import HeaderServer from "@/blocks/global/Header/Component";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Page - Home",
  description: "A blog app",
  keywords: ["blog", "app"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <HeaderServer />
        <Suspense fallback={<Loading />}>
          <main className="flex-grow">{children}</main>
        </Suspense>
        <FooterServer />
      </body>
    </html>
  );
}
