import { Html } from "@elysiajs/html";

type TwoColumnBlockComponentProps = {
  heading: string;
  text: string;
  image: {
    url: string;
    alt?: string;
    caption?: string;
  };
  direction: "normal" | "reverse";
};

export const TwoColumnBlockComponent = ({
  heading,
  text,
  image,
  direction,
}: TwoColumnBlockComponentProps) => {
  const isReverse = direction === "reverse";
  return (
    <section className="two-column py-8">
      <div
        className={`container mx-auto flex ${isReverse ? "flex-row-reverse" : "flex-row"} items-center`}
      >
        <div className="w-1/2">
          <h2 className="text-3xl font-bold">{heading}</h2>
          <p className="mt-4">{text}</p>
        </div>
        <div className="w-1/2">
          <img src={image.url} alt={image.alt || heading} />
          {/*{image.caption && (
            <p className="text-sm mt-2">{parseCaption(image.caption)}</p>
          )} */}
        </div>
      </div>
    </section>
  );
};

/* function parseCaption(caption: string) {
  // Assuming the caption is in Lexical rich text format
  try {
    const paragraph = caption.root?.children[0];
    const textNode = paragraph.children[0];
    return textNode.text || "";
  } catch (error) {
    console.error("Error parsing caption:", error);
    return "";
  }
} */
