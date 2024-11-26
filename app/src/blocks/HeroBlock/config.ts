import { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  labels: {
    singular: "Hero",
    plural: "Hero",
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
      name: "backgroundImage",
      label: "Background Image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
