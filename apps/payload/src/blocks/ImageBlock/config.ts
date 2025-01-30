import { Block } from "payload";

export const ImageBlock: Block = {
  slug: "image",
  labels: {
    singular: "Image Block",
    plural: "Image Blocks",
  },
  fields: [
    {
      name: "image",
      label: "Image",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "caption",
      label: "Caption",
      type: "text",
    },
  ],
};
