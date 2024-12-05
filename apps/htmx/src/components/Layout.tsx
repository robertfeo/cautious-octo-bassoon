import { Html } from '@elysiajs/html';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children }: { children: any }) => {
  return (
    <html lang="en">
      <head>
        <title>My Elysia App</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@2.0.3/dist/htmx.js" integrity="sha384-BBDmZzVt6vjz5YbQqZPtFZW82o8QotoM7RUp5xOxV3nSJ8u2pSdtzFAbGKzTlKtg" crossorigin="anonymous"></script>
      </head>
      <body class="antialiased w-full h-full">
        <Header header/>
        <div id="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
};
