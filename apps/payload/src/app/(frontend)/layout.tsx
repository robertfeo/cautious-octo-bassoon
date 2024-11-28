import FooterServer from "@/blocks/global/Footer/Component";
import HeaderServer from "@/blocks/global/Header/Component";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog App",
  description: "A blog app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`antialiased w-full h-full`}>
        <HeaderServer />
        {children}
        <FooterServer />
      </body>
    </html>
  );
}
