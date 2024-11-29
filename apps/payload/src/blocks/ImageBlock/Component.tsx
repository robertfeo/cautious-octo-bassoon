import { Media } from "@/payload-types";

type ImageBlockProps = {
  image: Media;
  caption?: string;
};

export default function ImageBlockComponent({
  image,
  caption,
}: ImageBlockProps) {
  if (!image || typeof image === "number") {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <img src={image.url} alt={image.alt || ""} />
      <p>{image.caption ? caption : ""}</p>
    </div>
  );
}