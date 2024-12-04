// src/components/Header.tsx

import { Html } from '@elysiajs/html';

export const Header = ({ header }) => {
  return (
    <header class="py-14">
      <div class="flex flex-row justify-between items-center px-80">
        <img
          width="150"
          height="100"
          alt={
            typeof header.logo === 'object' && header.logo.alt
              ? header.logo.alt
              : 'default alt text'
          }
          src={
            typeof header.logo === 'object' && header.logo.url
              ? header.logo.url
              : '/default-image.png'
          }
        />
        <div class="flex flex-row gap-4">
          {header.navigation.map((item, index) => (
            <a
              class="hover:cursor-pointer hover:text-sky-500"
              key={index}
              href={`${process.env.HOST}${item.link}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
