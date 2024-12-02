import { Footer } from "@/payload-types";
import config from "@payload-config";
import Image from "next/image";
import { getPayload } from "payload";

export default async function FooterServer() {
  const payload = await getPayload({ config });

  const footer = (await payload.findGlobal({
    slug: "footer",
  })) as Footer;

  return (
    <footer className="py-14">
      <div className="flex flex-col justify-center items-center px-80">
        <Image
          width={150}
          height={100}
          alt={
            typeof footer.logo === "object" && footer.logo.alt
              ? footer.logo.alt
              : "default alt text"
          }
          src={
            typeof footer.logo === "object" && footer.logo.url
              ? footer.logo.url
              : "https://placehold.co/150x75/jpeg"
          }
        ></Image>
      </div>
    </footer>
  );
}
