// nodes/HeroBlock/config.ts
import { SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { DecoratorBlockNode } from "@payloadcms/richtext-lexical/lexical/react/LexicalDecoratorBlockNode";
import { SerializedBlockNodeWithFields } from "../types";

export type SerializedHeroBlockNode = SerializedBlockNodeWithFields & {
  type: "hero";
  version: 1;
  fields: {
    heading: string;
    text: string;
    backgroundImage: {
      url: string;
      alt?: string;
    };
  };
};

export class HeroBlockNode extends DecoratorBlockNode {
  __fields: SerializedHeroBlockNode["fields"];

  constructor(fields: SerializedHeroBlockNode["fields"], format: any, key?: string) {
    super(format, key);
    this.__fields = fields;
  }

  static getType(): string {
    return "block";
  }

  static clone(node: HeroBlockNode): HeroBlockNode {
    return new HeroBlockNode(node.__fields, node.__key);
  }

  static importJSON(serializedNode: SerializedHeroBlockNode): HeroBlockNode {
    const { fields } = serializedNode;
    return new HeroBlockNode(fields);
  }

  exportJSON(): SerializedBlockNode {
    return {
      ...super.exportJSON(),
      type: "block",
      version: 1,
      fields: this.__fields,
    };
  }
}
