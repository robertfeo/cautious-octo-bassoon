import Html from "@elysiajs/html";

type HeroBlockComponentProps = {
  heading: string;
  text: string;
  backgroundImage: {
    url: string;
  };
};

export const HeroBlockComponent = ({
  heading,
  text,
  backgroundImage,
}: HeroBlockComponentProps) => {
  return (
    <section class="hero">
      <div
        class="container mx-auto text-center py-16 bg-cover bg-center"
        style={`background-image: url(${backgroundImage.url});`}
      >
        <h1 class="text-5xl font-bold">{heading}</h1>
        <p class="text-xl mt-4">{text}</p>
      </div>
    </section>
  );
};
