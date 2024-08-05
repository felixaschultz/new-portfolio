import {
  Links,
  Meta,
  Outlet,
  Scripts, // Rename the import
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import Header from "./Components/Header";
import InjectScript from "./functions/InjectScripts";


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://account.api.intastellarsolutions.com/v1/login.js"></script>
        <link rel="stylesheet" href="https://account.api.intastellarsolutions.com/v1/insign/style.css"></link>
        <Meta />
        <Links />
        <InjectScript />
      </head>
      <body>
        <Header />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
