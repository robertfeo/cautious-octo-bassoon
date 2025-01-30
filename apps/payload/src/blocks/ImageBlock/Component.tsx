import { Media } from "@/payload-types";

export type ImageBlockProps = {
  image: Media;
  caption?: string;
};

export const ImageBlockComponent: React.FC<ImageBlockProps> = ({
  image,
  caption,
}: ImageBlockProps) => {
  if (!image || typeof image === "number") {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-60 overflow-hidden">
        <img
          src={image.url}
          alt={image.alt || ""}
          className="w-full h-full object-cover"
        />
      </div>
      <p>{caption || ""}</p>
    </div>
  );
};
