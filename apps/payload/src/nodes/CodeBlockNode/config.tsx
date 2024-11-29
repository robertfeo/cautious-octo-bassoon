import type {
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    LexicalNode,
    SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";

import {
    $applyNodeReplacement,
    DecoratorNode,
} from "@payloadcms/richtext-lexical/lexical";

// SerializedLexicalNode is the default lexical node.
// By setting your SerializedMyNode type to SerializedLexicalNode,
// you are basically saying that this node does not save any additional data.
// If you want your node to save data, feel free to extend it
export type SerializedMyNode = SerializedLexicalNode;

// Lazy-import the React component to your node here
const MyNodeComponent = React.lazy(() =>
  import("../component/index.js").then((module) => ({
    default: module.MyNodeComponent,
  })),
);

/**
 * This node is a DecoratorNode. DecoratorNodes allow you to render React components in the editor.
 *
 * They need both createDom and decorate functions. createDom => outside of the html. decorate => React Component inside of the html.
 *
 * If we used DecoratorBlockNode instead, we would only need a decorate method
 */
export class MyNode extends DecoratorNode<React.ReactElement> {
  static clone(node: MyNode): MyNode {
    return new MyNode(node.__key);
  }

  static getType(): string {
    return "myNode";
  }

  /**
   * Defines what happens if you copy a div element from another page and paste it into the lexical editor
   *
   * This also determines the behavior of lexical's internal HTML -> Lexical converter
   */
  static importDOM(): DOMConversionMap | null {
    return {
      div: () => ({
        conversion: $yourConversionMethod,
        priority: 0,
      }),
    };
  }

  /**
   * The data for this node is stored serialized as JSON. This is the "load function" of that node: it takes the saved data and converts it into a node.
   */
  static importJSON(serializedNode: SerializedMyNode): MyNode {
    return $createMyNode();
  }

  /**
   * Determines how the hr element is rendered in the lexical editor. This is only the "initial" / "outer" HTML element.
   */
  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement("div");
    return element;
  }

  /**
   * Allows you to render a React component within whatever createDOM returns.
   */
  decorate(): React.ReactElement {
    return <MyNodeComponent nodeKey={this.__key} />;
  }

  /**
   * Opposite of importDOM, this function defines what happens when you copy a div element from the lexical editor and paste it into another page.
   *
   * This also determines the behavior of lexical's internal Lexical -> HTML converter
   */
  exportDOM(): DOMExportOutput {
    return { element: document.createElement("div") };
  }
  /**
   * Opposite of importJSON. This determines what data is saved in the database / in the lexical editor state.
   */
  exportJSON(): SerializedLexicalNode {
    return {
      type: "myNode",
      version: 1,
    };
  }

  getTextContent(): string {
    return "\n";
  }

  isInline(): false {
    return false;
  }

  updateDOM(): boolean {
    return false;
  }
}

// This is used in the importDOM method. Totally optional if you do not want your node to be created automatically when copy & pasting certain dom elements
// into your editor.
function $yourConversionMethod(): DOMConversionOutput {
  return { node: $createMyNode() };
}

// This is a utility method to create a new MyNode. Utility methods prefixed with $ make it explicit that this should only be used within lexical
export function $createMyNode(): MyNode {
  return $applyNodeReplacement(new MyNode());
}

// This is just a utility method you can use to check if a node is a MyNode. This also ensures correct typing.
export function $isMyNode(
  node: LexicalNode | null | undefined,
): node is MyNode {
  return node instanceof MyNode;
}
