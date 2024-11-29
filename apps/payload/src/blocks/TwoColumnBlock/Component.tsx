import { Media } from "@/payload-types";
import NextImage from "next/image";

type TwoColumnBlockProps = {
  heading: string;
  text: string;
  image: Media;
  direction?: "default" | "reverse";
};

export default function TwoColumnBlockComponent({
  heading,
  text,
  image,
  direction = "default",
}: TwoColumnBlockProps) {
  const isReverse = direction === "reverse";

  return (
    <div
      className={`flex flex-col md:flex-row ${isReverse ? "md:flex-row-reverse" : ""} items-center gap-6`}
    >
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-lg text-justify">{text}</p>
      </div>

      {image && (
        <div className="flex-1">
          <NextImage
            src={image.url || ""}
            alt={image.alt || "Two Column Block Image"}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
}
