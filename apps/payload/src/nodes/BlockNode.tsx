import { BlockNode } from "@payloadcms/richtext-lexical/client";
import { DOMExportOutput } from "@payloadcms/richtext-lexical/lexical";

export class BlockHTMLNode extends BlockNode {
  static getType(): string {
    return "block";
  }

  createDOM(): HTMLElement {
    let element: HTMLElement = document.createElement("div");
    if (this.__fields.blockType === "hero") {
      element = document.createElement("link");
    }
    return element;
  }

  exportDOM(): DOMExportOutput {
    return { element: this.createDOM() };
  }
}
export { BlockNode };

