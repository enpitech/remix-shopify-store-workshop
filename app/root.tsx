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
import { getCollections } from "./models/collection.client";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { useState } from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Wear JS Workshop",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const [collections, setCollections] = useState<[] | undefined>();

  useEffect(() => {
    async function getCollectionData() {
      const data = await getCollections(10);
      setCollections(data);
    }
    getCollectionData();
  }, [collections]);

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
