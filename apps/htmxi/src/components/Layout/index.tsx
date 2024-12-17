import { Html } from "@elysiajs/html";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function MainLayout(props: { header: any, footer: any, children: JSX.Element }) {
    return (
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="htmx-config" content='{"selfRequestsOnly":false}'></meta>
                <link href="/global.css" rel="stylesheet" />
                <script src="https://unpkg.com/htmx.org@2.0.4/dist/htmx.js" integrity="sha384-oeUn82QNXPuVkGCkcrInrS1twIxKhkZiFfr2TdiuObZ3n3yIeMiqcRzkIcguaof1" crossorigin="anonymous"></script>
            </head>
            <body>
                <Header header={props.header} />
                {props.children}
                <Footer footer={props.footer} />
            </body>
        </html>
    );
}