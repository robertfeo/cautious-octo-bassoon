import { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  fields: [
    {
      name: "logo",
      label: "Logo",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "navigation",
      label: "Navigation",
      type: "array",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
        },
        {
          name: "link",
          label: "Link",
          type: "text",
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 6,
      required: true,
    },
  ],
};
