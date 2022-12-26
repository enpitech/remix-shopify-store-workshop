//PR Version

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
import Error from "~/components/Error";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getCollections } from "./models/collection.server";
import Layout from "./components/Layout";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Workshop",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(10);
  return collections;
}

export default function App() {
  const collections = useLoaderData<typeof loader>();

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
          // TODO dont display the error message
          <Error error={error.message ?? "Something went wrong"} />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}
