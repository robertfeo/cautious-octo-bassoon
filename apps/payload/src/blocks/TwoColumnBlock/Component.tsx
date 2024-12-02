import { Media } from "@/payload-types";

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
      className={`flex flex-col md:flex-row ${isReverse ? "md:flex-row-reverse" : ""} justify-between gap-6`}
    >
      <div className="flex flex-col text-center md:text-left">
        <h2>{heading}</h2>
        <p className="text-justify">{text}</p>
      </div>

      {image && (
        <div>
          <img
            src={image.url || ""}
            alt={image.alt || "Two Column Block Image"}
            width={500}
            height={300}
            className="object-cover size-full"
          ></img>
        </div>
      )}
    </div>
  );
}
