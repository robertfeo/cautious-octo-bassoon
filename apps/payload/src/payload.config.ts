// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
/* import { de } from '@payloadcms/translations/languages/de';
import { en } from '@payloadcms/translations/languages/en'; */
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { Categories } from "./collections/Categories";
import { Comments } from "./collections/Comments";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  cors: {
    origins: ["http://localhost:3000", "http://localhost:3001"],
    headers: [
      "Content-Type",
      "Authorization",
      "hx-target",
      "hx-request",
      "hx-current-url",
    ],
  },
  /* i18n: {
    supportedLanguages: { en, de },
  }, */
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
  plugins: [payloadCloudPlugin()],
});
