import HeroBlockComponent from "@/blocks/HeroBlock/Component";
import ImageBlockComponent from "@/blocks/ImageBlock/Component";
import TwoColumnBlockComponent from "@/blocks/TwoColumnBlock/Component";
import { Page } from "@/payload-types";
import { Fragment } from "react";

const blockComponents = {
  image: ImageBlockComponent,
  hero: HeroBlockComponent,
  twoColumn: TwoColumnBlockComponent,
};

const RenderBlocks = ({ blocks }: { blocks: Page["layout"][0][] }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="py-4 w-full" key={index}>
                  <Block id={blockName || `block-${index}`} {...block} />
                </div>
              );
            }
          }

          return null;
        })}
      </Fragment>
    );
  }

  return null;
};

export default RenderBlocks;
