import { perks } from "mocks/DUMMY_DATA";

import {
  getAllCollections,
  getTrendingProducts,
} from "~/models/collection.client";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  //Get Collections Data
  useEffect(() => {
    getAllCollections().then((data) => {
      setCollections(data);
      setLoading(false);
    });
  }, []);

  // Get Trending Data
  useEffect(() => {
    getTrendingProducts().then((trends) => {
      setTrendingProducts(trends);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  function Collections() {
    return (
      <div className="relative">
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden border-2 border-t-zinc-900 sm:flex sm:flex-col"
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
            <div className="mt-4 sm:mt-6">
              <a
                href="/"
                className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </a>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="collection-heading"
          className="relative -mt-96 sm:mt-0"
        >
          <h2 id="collection-heading" className="sr-only">
            Collections
          </h2>
          <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
            {collections.slice(0, 3).map((collection) => {
              //Will hold the collection data to avoid long pathing
              const CollectionObj = {
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
                      <div>
                        <p aria-hidden="true" className="text-sm text-white">
                          Shop the collection
                        </p>
                        <h3 className="mt-1 font-semibold text-white">
                          <a href={collection.href}>
                            <span className="absolute inset-0" />
                            {CollectionObj.name}
                          </a>
                        </h3>
                      </div>
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
              {trendingProducts.map((product) => {
                const productObj = {
                  key: product.node.id,
                  imgSrc: product.node.images.edges[0].node.src,
                };
                console.log(productObj);
                return (
                  <div key={productObj.key} className="group relative">
                    <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                      <img
                        src={productObj.imgSrc}
                        alt={"#"}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      <a href={product.href}>
                        <span className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
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
    <main>
      <Collections />
      <Trending />
      <Perks />
    </main>
  );
}

const SkeletonLoader = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div
          role="status"
          className="animate-pulse space-y-8 md:flex md:items-center md:space-y-0 md:space-x-8"
        >
          <div className="w-full">
            <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-96">
            <svg
              className="h-12 w-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

const Perks = () => {
  return (
    <section
      aria-labelledby="perks-heading"
      className="border-t border-gray-200 bg-gray-50"
    >
      <h2 id="perks-heading" className="sr-only">
        Our perks
      </h2>

      <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="md:flex-shrink-0">
                <div className="flow-root">
                  <img
                    className="-my-1 mx-auto h-24 w-auto"
                    src={perk.imageUrl}
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                <h3 className="text-base font-medium text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-gray-500">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
