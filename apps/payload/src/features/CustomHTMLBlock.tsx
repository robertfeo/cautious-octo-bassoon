import { BlockHtmlConverter } from "@/converters/blocks";
import { BlockHTMLNode } from "@/nodes/BlockNode";
import { createNode, createServerFeature } from "@payloadcms/richtext-lexical";

export const BlockConverterFeature = createServerFeature({
  feature: {
    nodes: [
      // Use the createNode helper function to more easily create nodes with proper typing
      createNode({
        converters: {
          html: {
            async converter(args) {
              const { node } = args;

              if (node.fields.blockType === "hero") {
                // Call BlockHtmlConverter and await its result
                await BlockHtmlConverter.converter({ node: args.node });
              }

              // Return fallback for unknown block types
              return `<div>Unknown block type: ${node.fields.blockType}</div>`;
            },
            nodeTypes: [BlockHTMLNode.getType()],
          },
        },
        // Here you can add your actual node. On the server, they will be
        // used to initialize a headless editor which can be used to perform
        // operations on the editor, like markdown / html conversion.
        node: BlockHTMLNode,
      }),
    ],
  },
  key: "BlockConverterFeature",
});

/* async function converter(args: {
  childIndex: number;
  converters: HTMLConverter<any>[];
  currentDepth: number;
  depth: number;
  draft: boolean;
  node: SerializedBlockNode;
  overrideAccess: boolean;
  parent: any;
  req: any; 
  showHiddenFields: boolean;
}) {
  const { node } = args;

  if (node.fields.blockType === "hero") {
    return await BlockHtmlConverter.converter({ node: args.node });
  }

  return `<div>Unknown block type: ${node.fields.blockType}</div>`;
} */
