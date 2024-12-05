import {
  CodeBlockComponent,
  CodeBlockProps,
} from "@/blocks/CodeBlock/Component";
import type { HeroBlockProps } from "@/blocks/HeroBlock/Component";
import { HeroBlockComponent } from "@/blocks/HeroBlock/Component";
import {
  MediaBlockComponent,
  MediaBlockProps,
} from "@/blocks/MediaBlock/Component";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import React, { Fragment, JSX } from "react";

import {
  ImageBlockComponent,
  ImageBlockProps,
} from "@/blocks/ImageBlock/Component";
import { RecentPostsBlockProps } from "@/blocks/RecentPostsBlock/Component";
import {
  TwoColumnBlockComponent,
  TwoColumnBlockProps,
} from "@/blocks/TwoColumnBlock/Component";
import Link from "next/link";
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "./nodeFormat";

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<HeroBlockProps>
  | SerializedBlockNode<MediaBlockProps>
  | SerializedBlockNode<CodeBlockProps>
  | SerializedBlockNode<ImageBlockProps>
  | SerializedBlockNode<RecentPostsBlockProps>
  | SerializedBlockNode<TwoColumnBlockProps>;

type Props = {
  nodes: NodeTypes[];
};

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null;
        }

        if (node.type === "text") {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>;
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: "line-through" }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: "underline" }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (node?.type === "list" && node?.listType === "check") {
              for (const item of node.children) {
                if ("checked" in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] });
          }
        };

        const serializedChildren =
          "children" in node ? serializedChildrenFn(node) : "";

        if (node.type === "block") {
          const block = node.fields;

          const blockType = block?.blockType;

          if (!block || !blockType) {
            return null;
          }

          switch (blockType) {
            case "code":
              if ("code" in block) {
                return <CodeBlockComponent key={index} {...block} />;
              }
              break;
            case "hero":
              if ("text" in block) {
                return <HeroBlockComponent key={index} {...block} />;
              }
              break;
            case "media":
              if ("media" in block) {
                return <MediaBlockComponent key={index} {...block} />;
              }
              break;
            case "image":
              if ("image" in block) {
                return <ImageBlockComponent key={index} {...block} />;
              }
              break;
            case "twoColumn":
              if ("image" in block && "text" in block) {
                return <TwoColumnBlockComponent key={index} {...block} />;
              }
              break;
            default:
              return null;
          }
          return null;
        } else {
          switch (node.type) {
            case "linebreak": {
              return <br className="col-start-2" key={index} />;
            }
            case "paragraph": {
              return (
                <p className="col-start-2" key={index}>
                  {serializedChildren}
                </p>
              );
            }
            case "heading": {
              const Tag = node?.tag;
              return (
                <Tag className="col-start-2" key={index}>
                  {serializedChildren}
                </Tag>
              );
            }
            case "list": {
              const Tag = node?.tag;
              return (
                <Tag className="list col-start-2" key={index}>
                  {serializedChildren}
                </Tag>
              );
            }
            case "listitem": {
              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? "true" : "false"}
                    className={` ${node.checked ? "" : ""}`}
                    key={index}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="checkbox"
                    tabIndex={-1}
                    value={node?.value}
                  >
                    {serializedChildren}
                  </li>
                );
              } else {
                return (
                  <li key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                );
              }
            }
            case "quote": {
              return (
                <blockquote className="col-start-2" key={index}>
                  {serializedChildren}
                </blockquote>
              );
            }
            case "link": {
              const fields = node.fields;
              return (
                <Link
                  key={index}
                  href={fields.url}
                  type={fields.linkType === "internal" ? "reference" : "custom"}
                >
                  {serializedChildren}
                </Link>
              );
            }
            default:
              return null;
          }
        }
      })}
    </Fragment>
  );
}
