import { BlockHTMLNode } from "@/nodes/BlockNode";
import { type SerializedBlockNode } from "@payloadcms/richtext-lexical";
/* import { renderToStaticMarkup } from "react-dom/server"; */
import HeroBlock from "./blocks/HeroBlock";
/* import type { HTMLConverter } from "./types"; */
import type { HTMLConverter } from "@payloadcms/richtext-lexical";

export const BlockHtmlConverter: HTMLConverter<SerializedBlockNode> = {
  converter: async ({ node }) => {
    switch (node.fields.blockType) {
      case "hero":
        <HeroBlock
          fields={{
            ...node.fields,
            heading: node.fields.heading || "",
            text: node.fields.text || "",
          }}
        />;
      default:
        return `<span>Unknown block type ${node.fields.blockType}</span>`;
    }
  },
  nodeTypes: [BlockHTMLNode.getType()],
};
