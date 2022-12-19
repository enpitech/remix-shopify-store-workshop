import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  redirect,
  type LoaderArgs,
  type LoaderFunction,
} from "@remix-run/node";
import { useEffect, useState } from "react";
import { fetchProductById } from "~/models/product.server";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { addItemToCart } from "~/models/cart.server";
import { createCart } from "~/models/cart.client";

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  const data = await fetchProductById(params.productId);
  return data;
};

export async function action({ params, request }: LoaderArgs) {
  const body = await request.formData();
  const cartId = body.get("localCartNo");
  const variantId = body.get("variantId");

  if (!cartId) {
    return { message: "No Cart Found" };
  }

  await addItemToCart(cartId, variantId);

  return redirect("/cart");
}

export default function Product() {
  const [loading, setLoading] = useState(true);
  const [localCartId, setLocalCartId] = useState(null);
  const [product, setProduct] = useState(productMock);
  const data = useLoaderData();

  useEffect(() => {
    setProduct({
      ...productMock,
      description: data.product.description,
      name: data.product.title,
      price: `$${data.product.priceRange.minVariantPrice.amount}`,
      imageSrc: data.product.featuredImage.src,
      variantId: data.product.variants.edges[0].node.id,
    });

    async function checkCartStatus() {
      //check if localCartId exists
      const cartId: string | null = localStorage.getItem("cartId");

      if (cartId) {
        setLocalCartId(cartId);
      } else {
        const newCartId = await createCart();
        localStorage.setItem("cartId", newCartId.cartId);
      }
    }
    checkCartStatus();
    setLoading(false);
  }, [data]);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <div className="bg-white">
        <div className=" mx-auto h-screen max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  {product.price}
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product.reviews.average > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {product.reviews.average} out of 5 stars
                      </p>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">
                      {product.reviews.totalCount} reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product.description}</p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">
                  In stock and ready to ship
                </p>
              </div>
            </section>
          </div>
          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>
              <Form method="post">
                <input
                  type="text"
                  name="localCartNo"
                  className="hidden"
                  value={localCartId}
                />
                <input
                  type="text"
                  name="variantId"
                  className="hidden"
                  value={product.variantId}
                />
                <div className="mt-4"></div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="mb-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Add to bag
                  </button>
                  <Link
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    to="/"
                  >
                    Continue Shopping
                  </Link>
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="/"
                    className="group inline-flex text-base font-medium"
                  >
                    <ShieldCheckIcon
                      className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="text-gray-500 hover:text-gray-700">
                      Lifetime Guarantee
                    </span>
                  </a>
                </div>
              </Form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

const productMock = {
  name: "Failed to load name",
  href: "/",
  price: "Failed to load price ",
  description: "Failed to load description",
  imageSrc: "/",
  variantId: "Failed to load VariantId",
  imageAlt: "Failed to Load alt Text",
  breadcrumbs: [
    { id: 1, name: "Travel", href: "#" },
    { id: 2, name: "Bags", href: "#" },
  ],
  reviews: { average: 4, totalCount: 1624 },
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
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
