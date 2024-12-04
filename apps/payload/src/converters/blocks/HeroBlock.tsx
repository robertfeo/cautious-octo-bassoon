"use client";

import { HeroBlockProps } from "@/blocks/HeroBlock/Component";

interface HeroProps {
  fields: HeroBlockProps;
}

const HeroBlock = ({ fields }: HeroProps) => {
  return (
    <div>
      fields.backgroundImage && (
      <div
        className="relative flex flex-col justify-center p-8"
        style={{
          backgroundImage: fields.backgroundImage
            ? `url(${fields.backgroundImage.url})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 m-5"></div>

        <div className="relative p-6 z-10">
          <h1 className="text-white">{fields.heading}</h1>
          <p className="text-white text-lg">{fields.text}</p>
        </div>
      </div>
      )
    </div>
  );
};

export default HeroBlock;
