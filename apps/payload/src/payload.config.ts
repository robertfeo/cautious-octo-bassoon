import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Categories } from "./collections/Categories";
import { Comments } from "./collections/Comments";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { getServerSideURL } from "./utils/getURL";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const HTMX_HOST = process.env.HTMX_CONTAINER_NAME || "localhost";
const HTMX_PORT = process.env.HTMX_PORT || 3001;

export default buildConfig({
  cors: {
    origins: [getServerSideURL(), `http://${HTMX_HOST}:${HTMX_PORT}`].filter(Boolean),
    headers: [
      "hx-boost",
      "hx-request",
      "hx-target",
      "hx-current-url",
      "hx-trigger",
      "hx-include",
      "hx-swap",
      "hx-headers",
      "hx-post",
    ],
  },
  telemetry: true,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "src"),
    },
  },
  globals: [Header, Footer],
  collections: [Users, Media, Pages, Posts, Categories, Comments],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  endpoints: [
    {
      path: '/health',
      method: 'get',
      handler: async () => {
        return Response.json({ status: 'ok' });
      },
    },
  ],
});