import { CollectionConfig } from 'payload/types'

const Media: CollectionConfig = {
    slug: 'media',
    labels: {
        singular: 'Media',
        plural: 'Media',
    },
    access: {
        create: () => true,
        read: () => true,
    },
    upload: true,
    fields: [
        {
            name: 'alt',
            label: 'Alt Text',
            type: 'text',
            required: true,
        },
    ],
}

export default Media