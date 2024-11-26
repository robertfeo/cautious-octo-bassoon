import { Block } from "payload";

export const TwoColumnBlock: Block = {
  slug: "twoColumn",
  labels: {
    singular: "Two Column",
    plural: "Two Column",
  },
  fields: [
    {
      name: "heading",
      label: "Heading",
      type: "text",
    },
    {
      name: "text",
      label: "Text",
      type: "textarea",
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "direction",
      label: "Direction",
      type: "select",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Reverse",
          value: "reverse",
        },
      ],
    },
  ],
};
