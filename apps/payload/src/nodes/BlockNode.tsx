import RichText from "@/components/RichText";
import { BlockFields, SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { BlockNode } from "@payloadcms/richtext-lexical/client";
import { DOMExportOutput } from "@payloadcms/richtext-lexical/lexical";
import { JsonObject } from "payload";

export class BlockHTMLNode extends BlockNode {
  static getType(): string {
    return "block";
  }

  __fields: BlockFields<JsonObject>;
  __key: string;
  __type: string;
  __version: number;

  constructor(fields: BlockFields<JsonObject>, key: string, type: string, version: number) {
    super({ fields, key });
    this.__fields = fields;
    this.__key = key;
    this.__type = type;
    this.__version = version;
  }

  exportJSON(): SerializedBlockNode {
    return {
      fields: this.__fields,
      type: "block",
      version: this.__version,
      format: this.__format,
    };
  }

  decorate(): React.ReactElement {
    return <RichText content={this.__fields.content} key={this.__key} />;
  }

  exportDOM(): DOMExportOutput {
    return { element: document.createElement("div") };
  }
}
export { BlockNode };
