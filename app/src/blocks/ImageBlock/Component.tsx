import Image from "next/image";

export default function ImageBlockComponent({
  image,
}: {
  image: { url: string; alt: string };
}) {
  return (
    <div>
      <Image src={image.url} alt={image.alt} width={300} height={300}></Image>
    </div>
  );
}
