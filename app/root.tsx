import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import Layout from "~/components/Layout";
import { useCollections } from "~/hooks/useCollections";
import Error from "./components/Error";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Wear JS Workshop",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const collections = useCollections(10);

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout collections={collections}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Something went wrong!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout>
          <Error error={error} />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}
