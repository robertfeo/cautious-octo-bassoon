import type { Block } from 'payload'

export const TwoColumn: Block = {
    slug: 'twoColumn', // required
    labels: {
        singular: 'Two Column Block',
        plural: 'Two Column Blocks',
    },
    fields: [
        {
            name: 'heading',
            label: 'Heading',
            type: 'text',
        },
        {
            name: 'text',
            label: 'Text',
            type: 'textarea',
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'direction',
            label: 'Direction',
            type: 'select',
            defaultValue: 'left',
            options: [
                {
                    label: 'Left',
                    value: 'left',
                },
                {
                    label: 'Right',
                    value: 'right',
                },
            ],
        }
    ],
}