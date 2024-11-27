import { Block } from "payload";

export const RecentPostsBlock: Block = {
  slug: "recentPosts",
  labels: {
    singular: "Recent Posts",
    plural: "Recent Posts",
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
    {
      name: "postLimit",
      label: "Number of Posts to Display",
      type: "number",
      defaultValue: 4,
      required: true,
    },
  ],
};
