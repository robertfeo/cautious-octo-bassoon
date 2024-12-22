import { Html } from "@elysiajs/html";

export type FooterProps = {
  footer: any;
};

export const Footer = ({ footer }: any) => {
  return (
    <footer class="py-14">
      <div class="flex flex-col justify-center items-center px-80">
        <img
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
        ></img>
      </div>
    </footer>
  );
};
