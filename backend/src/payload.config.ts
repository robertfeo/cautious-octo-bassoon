import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Pages from './collections/Pages'
import Users from './collections/Users'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  i18n: {
    fallbackLng: 'de',
  },
  collections: [Users, Pages],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  /* graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  }, */
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
