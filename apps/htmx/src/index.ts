import { html } from "@elysiajs/html";
import serverTiming from "@elysiajs/server-timing";
import staticPlugin from "@elysiajs/static";
import swagger from "@elysiajs/swagger";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { logger } from "@tqman/nice-logger";
import { Elysia } from "elysia";
import router from "./router";

const port = process.env.HTMX_PORT || 3001;

const app = new Elysia()

app.use(html());
app.use(swagger());
app.use(serverTiming());

app.use(staticPlugin({
  assets: "./public",
}));

app.get('/global.css', () => Bun.file('public/global.css'));
app.get('/htmx.js', () => Bun.file('node_modules/htmx.org/dist/htmx.js'));

app.use(tailwind({
  path: "./public/global.css",        // Compiled output
  source: "./src/styles/styles.css",  // Input file with Tailwind directives
  config: "./tailwind.config.js",     // Tailwind config
  options: {
    minify: false,                      // 2.4.1 Minify the output;
    autoprefixer: true,                 // 2.4.3 Include autoprefixer;
  },
}));

app.use(router);

app.use(logger({ mode: "live" }));

app.listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
