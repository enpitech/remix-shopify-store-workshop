import type { LinksFunction, MetaFunction } from "@remix-run/node";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import Layout from "~/components/Layout";
import Error from "./components/Error";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Workshop",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Links />
        <Meta />
      </head>
      <body className="h-full">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: any) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Something went wrong!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout>
          <Error error={error.message} />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}
