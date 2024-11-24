import { Block } from "payload";

const ImageBlock: Block = {
  slug: "image-block",
  labels: {
    singular: "Image Block",
    plural: "Image Blocks",
  },
  fields: [
    {
      name: "image",
      label: "Image",
      type: "upload",
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
