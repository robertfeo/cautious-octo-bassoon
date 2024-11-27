import { Block } from "payload";

export const CodeBlock: Block = {
  slug: "code",
  labels: {
    singular: "Code Block",
    plural: "Code Blocks",
  },
  fields: [
    {
      name: "code",
      label: "Code",
      type: "code",
    },
  ],
};
