import { useParams } from "react-router-dom";
import { addItemToCart } from "~/models/cart.client";
import { useProduct } from "~/hooks/useProduct";
import type { Product } from "~/types";

import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useCartId } from "~/hooks/useCartId";
import invariant from "tiny-invariant";
import { useState } from "react";
// import { getProductById } from "~/models/product.server";
// import { addItemToCart } from "~/models/cart.server";
// import {
//   redirect,
//   type LoaderArgs,
//   type ActionArgs,
//   type LoaderFunction,
// } from "@remix-run/node";

// export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
//   const data = await getProductById(params.productId!);
//   return data.product;
// };

// export async function action({ request }: ActionArgs) {
//   const body = await request.formData();
//   const { cartId, variantId } = Object.fromEntries(body);

//   if (!cartId) {
//     return { message: "No Cart Found" };
//   }

//   await addItemToCart(cartId.toString(), variantId.toString());
//   return redirect(`/cart/${cartId}`);
// }

export default function ProductPage() {
  const { productId } = useParams();

  const parsedProduct: Product = useProduct(productId);
  // const [updating, setUpdating] = useState(false);
  // const cartId = useCartId();

  // const parsedProduct = useLoaderData();

  //Properties names shortening
  const product = {
    description: parsedProduct.description,
    name: parsedProduct.title,
    price: parsedProduct.priceRange?.minVariantPrice?.amount,
    imageSrc: parsedProduct.featuredImage?.src,
    altTxt: parsedProduct.featuredImage?.altText,
    variantId: parsedProduct.variants?.edges
      ? parsedProduct.variants?.edges[0]?.node?.id
      : undefined,
  };

  // function handleAddToBag() {
  //   setUpdating(true);
  //   addItemToCart(cartId, product.variantId!).then(() => {
  //     setUpdating(false);
  //   });
  // }
  // const transition = useTransition();
  // if(transition.state === "loading") return <div>Loading...</div>;
  // const updating = transition.state === "submitting";
  if (!parsedProduct) return <div>Loading...</div>;

  return (
    <div className="bg-white">
      <div className=" -w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product?.name}
            </h1>
          </div>
          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                ${product?.price}
              </p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product?.description}</p>
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
              src={product?.imageSrc}
              alt={product?.altTxt}
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
            <form>
              <input type="text" name="localCartNo" className="hidden" />
              <div className="mt-4"></div>
              <div className="mt-10">
                <div className="mb-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Add to bag
                </div>
                {/* <Link
                  to={`/cart/${cartId}`}
                  onClick={handleAddToBag}
                  className="mb-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  {updating ? "Upadting.." : "Add to bag"}
                </Link> */}
                <Link
                  className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  to="/"
                >
                  Continue Shopping
                </Link>
              </div>
              <div className="mt-6 text-center">
                <a href="/" className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">
                    Lifetime Guarantee
                  </span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
