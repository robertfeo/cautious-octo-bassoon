import { Html } from "@elysiajs/html";

export const Header = () => {
  return (
    <header class="py-4">
      <nav class="flex space-x-4">
        <a
          href="/home"
          class="text-blue-500"
          hx-get="/page/home"
          hx-target="#content"
          hx-swap="innerHTML"
        >
          Home
        </a>
        <a
          href="/blog"
          class="text-blue-500"
          hx-get="/about"
          hx-target="#content"
          hx-swap="innerHTML"
        >
          Blog
        </a>
      </nav>
    </header>
  );
};
