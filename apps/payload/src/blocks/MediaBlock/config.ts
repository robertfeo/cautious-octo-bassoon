import { Block } from "payload";

export const MediaBlock: Block = {
  slug: "media",
  labels: {
    singular: "Media Block",
    plural: "Media Blocks",
  },
  fields: [
    {
      name: "heading",
      label: "Heading",
      type: "text",
      required: false,
    },
    {
      name: "text",
      label: "Text",
      type: "textarea",
      required: false,
    },
    {
      name: "media",
      label: "Media",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "alignment",
      label: "Media Alignment",
      type: "radio",
      options: [
        {
          label: "Left",
          value: "left",
        },
        {
          label: "Right",
          value: "right",
        },
      ],
      defaultValue: "left",
    },
  ],
};
