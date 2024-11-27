import { Html } from "@elysiajs/html";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children } : any) => {
  return (
    <html lang="en">
      <head>
        <title>My Elysia App</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="antialiased w-full h-full">
        <Header />
        <div id="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
};