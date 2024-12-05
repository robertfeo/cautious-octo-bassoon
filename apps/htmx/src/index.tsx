import { logger } from "@chneau/elysia-logger";
import { html, Html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFoung";
import { RenderBlocks } from "./components/RenderBlocks";
import { fetchPageData } from "./utils/payload";

const port = 3001;

const app = new Elysia()
  .use(html())
  .use(logger())
  .get("/", async ({ headers }) => {
    const slug = "home";
    const pageData = await fetchPageData(slug);

    if (!pageData) {
      return <NotFound />;
    }

    return pageData;

    /* if (headers["hx-request"]) {
      return pageData;
    } else {
      return <Layout>{pageData}</Layout>;
    } */
  })
  .get("/:slug", async ({ params, headers }) => {
    const slug = params.slug;

    if (slug === "home" || slug === "index") {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    const pageData = await fetchPageData(slug);

    if (!pageData) {
      return <Layout>Page Not Found</Layout>;
    }

    const content = <RenderBlocks blocks={pageData.layout} />;

    if (headers["hx-request"]) {
      return content;
    } else {
      return <Layout>{content}</Layout>;
    }
  })
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
