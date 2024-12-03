import { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";

export interface SerializedBlockNodeWithFields extends SerializedLexicalNode {
  type: "block";
  fields: {
    blockType: string;
    [key: string]: any;
  };
}
