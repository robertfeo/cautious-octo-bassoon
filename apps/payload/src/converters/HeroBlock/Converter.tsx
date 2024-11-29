import type { HTMLConverter } from "@payloadcms/richtext-lexical";
import type { SerializedHeroBlockNode } from "../../nodes/HeroBlock/config";

export const HeroBlockHTMLConverter: HTMLConverter<SerializedHeroBlockNode> = {
  nodeTypes: ["hero"],

  converter: async ({ node }) => {
    const { fields } = node;

    const html = `
      <section>
        <h1>${fields.heading}</h1>
        <p>${fields.text}</p>
        <!-- Add other fields as necessary -->
      </section>
    `;

    return html;
  },
};
