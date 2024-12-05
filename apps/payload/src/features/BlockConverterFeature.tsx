import { BlockHTMLNode } from "@/nodes/BlockNode";
import { renderToHTML } from "@/utils/htmlRender";
import { createNode, createServerFeature } from "@payloadcms/richtext-lexical";

export const BlockConverterFeature = createServerFeature({
  feature: {
    nodes: [
      createNode({
        converters: {
          html: {
            async converter(args) {
              return renderToHTML(args.node);
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
