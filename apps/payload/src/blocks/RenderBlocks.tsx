import { CodeBlockComponent } from "@/blocks/CodeBlock/Component";
import HeroBlockComponent from "@/blocks/HeroBlock/Component";
import ImageBlockComponent from "@/blocks/ImageBlock/Component";
import RecentPostsBlockComponent from "@/blocks/RecentPostsBlock/Component";
import TwoColumnBlockComponent from "@/blocks/TwoColumnBlock/Component";
import { Page } from "@/payload-types";
import React, { Fragment } from "react";

const blockComponents = {
  image: ImageBlockComponent,
  hero: HeroBlockComponent,
  twoColumn: TwoColumnBlockComponent,
  recentPosts: RecentPostsBlockComponent,
  code: CodeBlockComponent,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </div>
              );
            }
          } else {
            console.log("Block not found", blockType);
            return null;
          }
        })}
      </Fragment>
    );
  }

  return null;
};

export default RenderBlocks;
