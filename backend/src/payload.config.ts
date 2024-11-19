// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: // Either a whitelist array of URLS to allow CORS requests from, or a wildcard string ('*') to accept incoming requests from any domain.
  {
    origins: [
      process.env.FRONTEND_1 || 'http://localhost:3000', process.env.FRONTEND_2 || 'http://localhost:3001'
    ],
  },
  admin: {
    user: Users.slug, // The slug of a Collection that you want to be used to log in to the Admin dashboard.
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media], // Manage the datamodel of your application
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
  /* plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ], */
})
