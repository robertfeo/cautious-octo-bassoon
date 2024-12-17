import { Html } from "@elysiajs/html";
import { Content } from "../content/Content";
import { Post } from "../content/Post";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({
  pageSlug,
  header,
  footer,
  isPost = false,
}: {
  pageSlug: string;
  header?: any;
  footer?: any;
  isPost?: boolean;
}) => {
  return (
    <html lang="de">
      <head>
        <meta charset="UTF-8"></meta>
        <meta name="htmx-config" content='{"selfRequestsOnly":false}'></meta>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <link href="./output.css" rel="stylesheet"></link>
        <title>Blog Payload + HTMX</title>
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
        {/* <link rel="stylesheet" href="/globals.css"></link> */}
        <script src="https://unpkg.com/htmx.org@2.0.4/dist/htmx.js" integrity="sha384-oeUn82QNXPuVkGCkcrInrS1twIxKhkZiFfr2TdiuObZ3n3yIeMiqcRzkIcguaof1" crossorigin="anonymous"></script>
      </head>
      <body class="min-h-screen flex flex-col bg-zinc-50">
        <Header header={header} />
        {isPost ? <Post pageSlug={pageSlug} /> : <Content pageSlug={pageSlug} />}
        <Footer footer={footer} />
      </body>
    </html>
  );
};