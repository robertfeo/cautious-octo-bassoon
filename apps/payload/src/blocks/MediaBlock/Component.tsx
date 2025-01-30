import { Media } from "@/payload-types";
import { ReactNode } from "react";

export type MediaBlockProps = {
  heading: string;
  text: string;
  media: Media;
  alignment: "left" | "right";
};

export const MediaBlockComponent: React.FC<MediaBlockProps> = ({
  heading,
  text,
  media,
  alignment = "left",
}: MediaBlockProps): ReactNode => {
  const isRightAligned = alignment === "right";

  const isYouTubeVideo = (url: string) =>
    url.includes("youtube.com") || url.includes("youtu.be");

  return (
    <div
      className={`flex flex-col md:flex-row ${
        isRightAligned ? "md:flex-row-reverse" : ""
      } justify-between items-center`}
    >
      <div className="flex flex-col text-center md:text-left max-w-md">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        {text && <p className="text-justify">{text}</p>}
      </div>

      <div className="flex-1 max-w-lg">
        {media["url-type"] === "video" ? (
          isYouTubeVideo(media.url) ? (
            <iframe
              width="560"
              height="315"
              src={media.url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full max-w-lg"
            ></iframe>
          ) : (
            <video
              controls
              src={media.url}
              width={560}
              height={315}
              className="w-full max-w-lg h-auto"
            >
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <img
            src={media.url}
            alt={media.alt || heading || "Media Block"}
            className="object-cover w-full max-w-lg h-auto"
          />
        )}
      </div>
    </div>
  );
};
