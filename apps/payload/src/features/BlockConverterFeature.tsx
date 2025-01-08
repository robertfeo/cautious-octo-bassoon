import { BlockHTMLNode } from "@/nodes/BlockNode";
import { renderToHTML, sanitizeContent } from "@/utils/htmlRender";
import { createNode, createServerFeature } from "@payloadcms/richtext-lexical";

export const BlockConverterFeature = createServerFeature({
  feature: {
    nodes: [
      createNode({
        converters: {
          html: {
            async converter(args) {
              return sanitizeContent(await renderToHTML(args.node));
            },
            nodeTypes: [BlockHTMLNode.getType()],
          },
        },
        node: BlockHTMLNode,
      }),
    ],
  },
  key: "BlockConverterFeature",
});
