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

/**
 * The `RootLayout` function is a React component that serves as the main layout for a webpage, including header, main content area with loading fallback, and footer.
 * @param  - The `RootLayout` function is a React component that serves as the layout for the root of your application. It takes a single parameter, an object with a `children` property of type `React.ReactNode`. The `children` prop represents the content that will be rendered within the layout.
 * @returns The `RootLayout` component is being returned. It is a functional component that defines the layout structure for a webpage. It includes an HTML structure with a body containing a header, main content area wrapped in a Suspense component for lazy loading, and a footer. The `children` prop is passed to the main content area.
 */
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
