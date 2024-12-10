import { Html } from "@elysiajs/html";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({
  pageSlug,
  header,
  footer,
}: {
  pageSlug?: string;
  header?: any;
  footer?: any;
}) => {
  return (
    <html lang="de">
      <head>
        <meta name="htmx-config" content='{"selfRequestsOnly":false}'></meta>
        <title>Blog Payload + HTMX</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          src="https://unpkg.com/htmx.org@2.0.3"
          integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq"
          crossorigin="anonymous"
        ></script>
      </head>
      <body class="min-h-screen flex flex-col bg-zinc-50">
        <Header header={header} />
        <Content pageSlug={pageSlug} />
        <Footer footer={footer} />
      </body>
    </html>
  );
};
