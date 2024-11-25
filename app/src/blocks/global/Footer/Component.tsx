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
    <footer className="bg-sky-500">
      <div className="flex flex-col justify-center items-center px-96">
        <Image
          width={100}
          height={100}
          alt={
            typeof footer.logo === "object" && footer.logo.alt
              ? footer.logo.alt
              : "default alt text"
          }
          src={
            typeof footer.logo === "object" && footer.logo.url
              ? footer.logo.url
              : "/default-image.png"
          }
        ></Image>
      </div>
    </footer>
  );
}
