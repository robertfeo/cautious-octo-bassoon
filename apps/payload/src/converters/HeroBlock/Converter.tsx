/* import type { HTMLConverter } from "@payloadcms/richtext-lexical";
import type { SerializedHeroBlockNode } from "../../nodes/HeroBlock/config";

export const HeroBlockHTMLConverter: HTMLConverter = {
  nodeTypes: ["hero"],
  converter: async ({ node }) => {
    if (node.type === 'hero') {
      const heroNode = node as SerializedHeroBlockNode;
      const { fields } = heroNode;

      const html = `
        <section>
          <h1>${fields.heading}</h1>
          <p>${fields.text}</p>
        </section>
      `;

      return html;
    } else {
      return '';
    }
  },
};
 */


// converters/BlockHTMLConverter.ts
import { SerializedBlockNodeWithFields } from "@/nodes/types";
import type { HTMLConverter } from "@payloadcms/richtext-lexical";

/* export const BlockHTMLConverter: HTMLConverter<SerializedBlockNode> = {
  nodeTypes: ["block"],
  converter: async ({ node }) => {
    const blockType = node.fields?.blockType;

    switch (blockType) {
      case "hero":
        const fields = node.fields;
        return `
          <div
            class="relative flex flex-col justify-center p-8"
            style="background-image: url('${fields.backgroundImage.url}'); background-size: cover; background-position: center;"
          >
            <div class="absolute inset-0 bg-black bg-opacity-50 m-5"></div>
            <div class="relative p-6 z-10">
              <h1 class="text-white">${fields.heading}</h1>
              <p class="text-white text-lg">${fields.text}</p>
            </div>
          </div>
        `;
      case "media":
        // TODO
        return '';
      default:
        return '';
    }
  },
}; */

export const HeroBlockHTMLConverter: HTMLConverter<SerializedBlockNodeWithFields> = {
  nodeTypes: ["block"],
  converter: async ({ node }) => {
    const blockType = node.fields?.blockType;

    switch (blockType) {
      case "hero":
        const fields = node.fields;
        return `
          <div
            class="relative flex flex-col justify-center p-8"
            style="background-image: url('${fields.backgroundImage.url}'); background-size: cover; background-position: center;"
          >
            <div class="absolute inset-0 bg-black bg-opacity-50 m-5"></div>
            <div class="relative p-6 z-10">
              <h1 class="text-white">${fields.heading}</h1>
              <p class="text-white text-lg">${fields.text}</p>
            </div>
          </div>
        `;
      case "media":
        // TODO
        return '';
      default:
        return '';
    }
  },
};

