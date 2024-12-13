import { logger } from "@chneau/elysia-logger";
import { Html, html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { Layout } from "./components/layout/Layout";
import { fetchGlobalData } from "./utils/payload";

const port = 3001;

const app = new Elysia()
  .use(html())
  .use(
    logger({
      level: "error",
    })
  )
  .get("/favicon.ico", Bun.file("favicon.ico"))
  .get("/", async () => {
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
  .listen(port);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
