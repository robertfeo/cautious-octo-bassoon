import { CollectionConfig } from 'payload/types'

const Pages: CollectionConfig = {
    slug: 'pages',
    labels: {
        singular: 'Page',
        plural: 'Pages',
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
        },
        {
            name: 'layout',
            label: 'Layout',
            type: 'blocks',
            blocks: [],
        },
    ],
}

export default Pages