import config from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";

export default async function HeaderServer() {
  const payload = await getPayload({ config });

  const header = await payload.findGlobal({
    slug: "header",
  });

  return (
    <header className="py-14">
      <div className="flex flex-row justify-between items-center mx-auto w-4/6">
        <img
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
        ></img>
        <div className="flex flex-row gap-4 *:no-underline *:text-black">
          {header.navigation.map((item, index) => {
            return (
              <Link
                className="hover:cursor-pointer hover:text-sky-500"
                key={index}
                href={process.env.PAYLOAD_LOCALHOST + item.link}
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
