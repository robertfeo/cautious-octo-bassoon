import FooterServer from "@/blocks/global/Footer/Component";
import HeaderServer from "@/blocks/global/Header/Component";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Payload + Next.js",
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
        <main className="flex-grow">{children}</main>
        <FooterServer />
      </body>
    </html>
  );
}
