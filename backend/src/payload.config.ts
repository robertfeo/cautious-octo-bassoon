// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { blogPost } from './collections/BlogPost'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: {
    origins: ['http://127.0.0.1:5500', 'http://localhost'],
    headers: ['Content-Type', 'Authorization', 'hx-target', 'hx-request', 'hx-current-url'],
  },
  i18n: {
    supportedLanguages: { en, de, ro },
  },
  admin: {
    user: Users.slug, // The slug of a Collection that you want to be used to log in to the Admin dashboard.
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, blogPost, Pages], // Manage the datamodel of your application
  editor: lexicalEditor(),  // Default richtext editor to use for richText fields
  secret: process.env.PAYLOAD_SECRET || '', // Secure string that Payload will use for any encryption workflows
  typescript: { // Control how typescript interfaces are generated from your collections.
    outputFile: path.resolve(dirname, 'payload-types.ts'),  // Filename to write the generated types to
  },
  db: // Pass in a database adapter for use on this project.
    postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI || '',
      },
    }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
  ],
})
