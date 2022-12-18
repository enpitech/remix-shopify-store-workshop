import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getCollections } from "./models/collection.server";
import Layout from "./components/Layout";
import { useState } from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Wear JS Workshop",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(10);

  return collections;
}

export default function App() {
  // const [cartId, setCartId] = useState(
  //   "Z2lkOi8vc2hvcGlmeS9DYXJ0LzU3YjA3NGZjYjBhMmQzNGY1NDIzZWM1ZDAyMzMwYjhl"
  // );

  const [cartId, setCartId] = useState("none");

  const collections = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout collections={collections}>
          <Outlet context={[cartId, setCartId]} />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
