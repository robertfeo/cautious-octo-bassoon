import { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import type { ReactNode } from "react";

export type HTMLConverter<
  T extends SerializedLexicalNode = SerializedLexicalNode,
> = {
  converter: ({
    childIndex,
    converters,
    node,
    parent,
  }: {
    childIndex: number;
    converters: HTMLConverter[];
    node: T;
    parent: SerializedLexicalNodeWithParent;
  }) => Promise<ReactNode> | ReactNode;
  nodeTypes: string[];
};

export type SerializedLexicalNodeWithParent = SerializedLexicalNode & {
  parent?: SerializedLexicalNode;
};
