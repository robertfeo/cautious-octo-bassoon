import { Html } from "@elysiajs/html";

export type HeaderProps = {
  header?: string;
};

export const Header = ({ header }: any) => {
  return (
    <header class="py-14">
      <div class="flex flex-row w-4/6 justify-between items-center mx-auto">
        <img
          width="150"
          height="100"
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
        />
        <nav hx-boost="true" class="flex flex-row gap-4">
          {header.navigation.map((item: any, index: any) => (
            <a
              class="hover:cursor-pointer hover:text-sky-500"
              key={index}
              href={`${process.env.HTMX_HOST}${item.link}`}
              hx-push-url="true"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
