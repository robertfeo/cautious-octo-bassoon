import {
    DecoratorNode,
    SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical"; // adjust the import path as necessary

export type SerializedHeroBlockNode = SerializedLexicalNode & {
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

export class HeroBlockNode extends DecoratorNode<null> {
  __fields: SerializedHeroBlockNode["fields"];

  constructor(fields: SerializedHeroBlockNode["fields"], key?: string) {
    super(key);
    this.__fields = fields;
  }

  static getType(): string {
    return "hero";
  }

  static clone(node: HeroBlockNode): HeroBlockNode {
    return new HeroBlockNode(node.__fields, node.__key);
  }

  static importJSON(serializedNode: SerializedHeroBlockNode): HeroBlockNode {
    const { fields } = serializedNode;
    return new HeroBlockNode(fields);
  }

  exportJSON(): SerializedHeroBlockNode {
    return {
      type: "hero",
      version: 1,
      fields: this.__fields,
    };
  }

  // Since we're on the server, we don't need to implement createDOM or decorate
  /* createDOM(): null {
    return null;
  }*/

  updateDOM(): false {
    return false;
  }
}
