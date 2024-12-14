import { logger } from '@chneau/elysia-logger';
import { cors } from '@elysiajs/cors';
import html, { Html } from "@elysiajs/html";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { Elysia } from "elysia";
import { Layout } from "./components/layout/Layout";
import { fetchGlobalData } from "./utils/payload";

const port = 3001;

const app = new Elysia()
  .use(tailwind({                           // 2. Use
    path: "./public/globals.css",       // 2.1 Where to serve the compiled stylesheet;
    source: "./public/globals.css",        // 2.2 Specify source file path (where your @tailwind directives are);
    config: "./tailwind.config.js",       // 2.3 Specify config file path or Config object;
    options: {                            // 2.4 Optionally Specify options:
      minify: true,                     // 2.4.1 Minify the output stylesheet (default: NODE_ENV === "production");
      map: true,                        // 2.4.2 Generate source map (default: NODE_ENV !== "production");
      autoprefixer: false               // 2.4.3 Whether to use autoprefixer;
  },
  }))
  .use(cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "hx-request", "hx-target", "hx-current-url", "hx-trigger", "hx-include", "hx-swap", "hx-headers", "hx-post"],
    credentials: true,
  }))
  .use(logger())
  .use(html)
/* .get("/favicon.ico", Bun.file("favicon.ico")) */

app.get("/", async () => {
  const slug = "home";

  const headerGlobal = await fetchGlobalData("header");
  const footerGlobal = await fetchGlobalData("footer");

  return (
    <Layout pageSlug={slug} header={headerGlobal} footer={footerGlobal} />
  );
})
  .get("/:slug", async ({ params }: any) => {
    const slug = params.slug;

    if (slug === "home" || slug === "index") {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    const headerGlobal = await fetchGlobalData("header");
    const footerGlobal = await fetchGlobalData("footer");

    return (
      <Layout pageSlug={slug} header={headerGlobal} footer={footerGlobal} />
    );
  })
  .get("post/:slug", async ({ params }: any) => {
    const slug = params.slug;

    const headerGlobal = await fetchGlobalData("header");
    const footerGlobal = await fetchGlobalData("footer");

    return (
      <Layout pageSlug={slug} header={headerGlobal} footer={footerGlobal} isPost={true} />
    );
  })

app.listen(port);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
