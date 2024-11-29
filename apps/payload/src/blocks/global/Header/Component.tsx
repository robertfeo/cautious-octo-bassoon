import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

export default async function HeaderServer() {
  const payload = await getPayload({ config });

  const header = await payload.findGlobal({
    slug: "header",
  });

  return (
    <header className="bg-sky-500">
      <div className="flex flex-row justify-between items-center px-96">
        <Image
          width={150}
          height={100}
          alt={
            typeof header.logo === "object" && header.logo.alt
              ? header.logo.alt
              : "default alt text"
          }
          src={
            typeof header.logo === "object" && header.logo.url
              ? header.logo.url
              : "/default-image.png"
          }
        ></Image>
        <div className="flex flex-row gap-4 *:no-underline *:text-white">
          {header.navigation.map((item, index) => {
            return (
              <Link
                className="hover:cursor-pointer"
                key={index}
                href={'http://localhost:3000/' + item.link}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
