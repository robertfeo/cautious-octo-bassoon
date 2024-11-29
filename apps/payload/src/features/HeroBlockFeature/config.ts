import { HeroBlockHTMLConverter } from "@/converters/HeroBlock/Converter"; // Adjust the path as necessary
import { HeroBlockNode } from "@/nodes/HeroBlock/config"; // Adjust the path as necessary
import { createServerFeature } from "@payloadcms/richtext-lexical";

export const HeroBlockFeature = createServerFeature({
  key: "hero-block",
  nodes: [
    {
      // Provide the node class
      node: HeroBlockNode,
      // Provide the HTML converter
      converters: {
        html: HeroBlockHTMLConverter,
      },
    },
  ],
});
