import { Html } from "@elysiajs/html";
import { MetaDataProps } from "../../config";
import { Footer, FooterProps } from "./Footer";
import { Header, HeaderProps } from "./Header";

export default function MainLayout(props: { metadata: MetaDataProps, header: HeaderProps, footer: FooterProps, children: JSX.Element }) {
    return (
        <html>
            <head>
                <title>{props.metadata.title || "Default Title"}</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="htmx-config" content='{"selfRequestsOnly":false,"allowScriptTags":false}'></meta>
                <meta name="description" content={props.metadata.description || "Default description"} />
                {props.metadata.keywords && <meta name="keywords" content={props.metadata.keywords} />}
                <link href="/global.css" rel="stylesheet" />
                <link rel="icon" type="image/x-icon" href="public/favicon/favicon.ico"></link>
                <script src="https://unpkg.com/htmx.org@2.0.4/dist/htmx.js" integrity="sha384-oeUn82QNXPuVkGCkcrInrS1twIxKhkZiFfr2TdiuObZ3n3yIeMiqcRzkIcguaof1" crossorigin="anonymous"></script>
                <script>htmx.config.globalViewTransitions = true</script>
            </head>
            <body>
                <Header header={props.header} />
                {props.children}
                <Footer footer={props.footer} />
            </body>
        </html>
    );
}