import { Block } from "payload";

export const TestBlock: Block = {
  slug: "test",
  labels: {
    singular: "Test",
    plural: "Tests",
  },
  fields: [
    {
      name: "heading",
      label: "Heading",
      type: "text",
    },
    {
      name: "subheading",
      label: "Subheading",
      type: "textarea",
    },
  ],
};
