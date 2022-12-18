import { Link } from "@remix-run/react";
import { getCollections } from "~/models/collection.server";
import type { CollectionObj, Collection, ProductObj, Product } from "~/types";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTrendingProducts } from "~/models/product.server";

export const loader = async () => {
  const collections = await getCollections(10);
  const trendingProducts = await getTrendingProducts(8);
  return json({ collections, trendingProducts });
};

export default function Home() {
  const { collections, trendingProducts } = useLoaderData<typeof loader>();

  function Collections() {
    return (
      <div className="relative">
        <BackgroundImage />
        <section
          aria-labelledby="collection-heading"
          className="relative -mt-96 sm:mt-0"
        >
          <h2 id="collection-heading" className="sr-only">
            Collections
          </h2>
          <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
            {collections.slice(0, 3).map((collection: Collection) => {
              const CollectionObj: CollectionObj = {
                key: collection.node.products.edges[0].node.id,
                name: collection.node.title,
                imgSrc:
                  collection.node.products.edges[0].node.images.edges[0].node
                    .src,
                altTxt:
                  collection.node.products.edges[0].node.images.edges[0].node
                    .altText,
              };
              return (
                <div
                  key={CollectionObj.key}
                  className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-4 sm:aspect-h-5 sm:h-auto"
                >
                  <div>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                        <img
                          src={CollectionObj.imgSrc}
                          alt={CollectionObj.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                    </div>
                    <div className="absolute inset-0 flex items-end rounded-lg p-6">
                      <Link to={"/"}>
                        <p aria-hidden="true" className="text-sm text-white">
                          Shop the collection
                        </p>
                        <h3 className="mt-1 font-semibold text-white">
                          <span className="absolute inset-0" />
                          {CollectionObj.name}
                        </h3>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
  function Trending() {
    return (
      <>
        <section aria-labelledby="trending-heading">
          <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
            <div className="md:flex md:items-center md:justify-between">
              <h2
                id="favorites-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Trending Products
              </h2>
              <a
                href="/"
                className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
              >
                Shop the collection
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {trendingProducts.map((product: Product) => {
                const productObj: ProductObj = {
                  name: product.node.title,
                  key: product.node.id,
                  imgSrc: product.node.images.edges[0].node.src,
                  altTxt: "",
                };
                return (
                  <div key={productObj.key} className="group relative">
                    <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                      <img
                        src={productObj.imgSrc}
                        alt={productObj.altTxt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      <Link to={`product/${productObj.key}`}>
                        <span className="absolute inset-0" />
                        {productObj.name}
                      </Link>
                    </h3>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-sm md:hidden">
              <a
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Shop the collection
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Collections />
      <Trending />
    </>
  );
}

function BackgroundImage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden sm:flex sm:flex-col"
      >
        <div className="relative w-full flex-1 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col sm:hidden"
        >
          <div className="relative w-full flex-1 bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="h-48 w-full bg-white" />
        </div>
        <div className="relative py-32">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Mid-Season Sale
          </h1>
        </div>
      </div>
    </>
  );
}
