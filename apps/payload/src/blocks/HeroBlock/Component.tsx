import React from "react";

export type HeroBlockProps = {
  heading: string;
  text?: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
};

export const HeroBlockComponent: React.FC<HeroBlockProps> = ({
  heading,
  text,
  backgroundImage,
}) => {
  return (
    <div
      className="relative flex flex-col justify-center p-8"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage.url})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 m-5"></div>
      <div className="relative p-6 z-10">
        <h1 className="text-white">{heading}</h1>
        <p className="text-white text-lg">{text}</p>
      </div>
    </div>
  );
};
