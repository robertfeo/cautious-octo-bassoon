import { HeroBlockNode } from "@/nodes/HeroBlock/config";
import { createNode, createServerFeature } from "@payloadcms/richtext-lexical";

export const HeroBlockFeature = createServerFeature({
  feature: {
    nodes: [
      createNode({
        converters: {
          html: {
            converter: () => {
              return `<div></div>`
            },
            nodeTypes: [HeroBlockNode.getType()],
          }
        },
        node: HeroBlockNode,
      }),
    ],
  },
  key: "HeroBlockFeature",
});
