import { BlockNode } from "@payloadcms/richtext-lexical/client";

export class BlockHTMLNode extends BlockNode {
  static getType(): string {
    return "block";
  }
}
export { BlockNode };
