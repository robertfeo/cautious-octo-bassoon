import { cors } from '@elysiajs/cors';
import { Html, html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { logger } from "@tqman/nice-logger";
import { Elysia } from "elysia";
import { Layout } from "./components/layout/Layout";
import { fetchGlobalData } from "./utils/payload";

const port = 3001;
let headerGlobal = null;
let footerGlobal = null;

const app = new Elysia();

app.use(html() as unknown as any)

app.use(staticPlugin({
  prefix: '/',
  assets: 'public'
}));

app.use(tailwind({
  path: "./public/styles.css",              // Serve CSS at /output.css
  source: "./src/styles.css",   // Path to @tailwind directives
  config: "./tailwind.config.js",   // Path to Tailwind config
}));

app.use(cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "hx-request", "hx-target", "hx-current-url", "hx-trigger", "hx-include", "hx-swap", "hx-headers", "hx-post"],
  credentials: true,
}))

app.use(logger({
  mode: "live",
}))

/* app.get('/globals.css', () => Bun.file('public/globals.css'))
app.get('/output.css', () => Bun.file('public/output.css')) */

app.get("/", async () => {
  const slug = "home";

  headerGlobal = await fetchGlobalData("header");
  footerGlobal = await fetchGlobalData("footer");

  return (
    <Layout pageSlug={slug} header={headerGlobal} footer={footerGlobal} />
  );
})

app.get("/:slug", async ({ params }: any) => {
  const slug = params.slug;

  if (slug === "home" || slug === "index") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  } else {
    headerGlobal = await fetchGlobalData("header");
    footerGlobal = await fetchGlobalData("footer");
  }

  return (
    <Layout pageSlug={slug} header={headerGlobal} footer={footerGlobal} />
  );
})

app.get("post/:slug", async ({ params }: any) => {
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
