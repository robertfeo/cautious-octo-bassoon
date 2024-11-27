import { Html } from "@elysiajs/html";

// Import your block components
import HeroBlockComponent from "../../../payload/src/blocks/HeroBlock/Component";
import ImageBlockComponent from "../../../payload/src/blocks/ImageBlock/Component";
import RecentPostsBlockComponent from "../../../payload/src/blocks/RecentPostsBlock/Component";
import TwoColumnBlockComponent from "../../../payload/src/blocks/TwoColumnBlock/Component";

const blockComponents = {
  hero: HeroBlockComponent,
  image: ImageBlockComponent,
  twoColumn: TwoColumnBlockComponent,
  recentPosts: RecentPostsBlockComponent,
};

export const RenderBlocks = ({ blocks }) => {
  if (blocks && Array.isArray(blocks) && blocks.length > 0) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block;
          const BlockComponent = blockComponents[blockType];

          if (BlockComponent) {
            return (
              <div key={index}>
                <BlockComponent {...block} />
              </div>
            );
          }

          return null;
        })}
      </>
    );
  }

  return null;
};
