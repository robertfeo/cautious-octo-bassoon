type HeroBlockProps = {
  heading: string;
  text: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
};

export default function HeroBlockComponent({
  heading,
  text,
  backgroundImage,
}: HeroBlockProps) {
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
      <div className="p-6">
        <h1>{heading}</h1>
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
}
