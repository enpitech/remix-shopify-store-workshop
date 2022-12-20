import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart } from "~/models/cart.server";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { removeItemFromCart } from "~/models/cart.server";
// import { useTransition } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const data = await getCart(params.cartId!);

  return {
    products: data.cart.lines.edges,
    total: data.cart.estimatedCost.subtotalAmount.amount,
  };
}

export async function action({ request }: ActionArgs) {
  console.log("check");
  const formData = await request.formData();
  const lineNumber: any = Object.fromEntries(formData).lineNumber;
  const localCartId: any = Object.fromEntries(formData).localCartId;
  await removeItemFromCart(localCartId, lineNumber);
  return {};
}

export default function Cart() {
  const [localCartId, setLocalCartId] = useState("");
  const { products, total } = useLoaderData();
  // const transition = useTransition();

  useEffect(() => {
    const localCartId = localStorage.getItem("cartId");
    setLocalCartId(localCartId!);
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {products.map((product: any) => {
                const item = {
                  id: product.node.merchandise.id,
                  name: product.node.merchandise.product.title,
                  href: "/",
                  price:
                    product.node.merchandise.product.priceRange.minVariantPrice
                      .amount,
                  color: "TBD",
                  inStock: true,
                  imageSrc: product.node.merchandise.image.src,
                  imageAlt: product.node.merchandise.image.altText,
                  size: product.node.merchandise.title,
                  lineNumber: product.node.id,
                };
                return (
                  <li key={item.id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {item.name}
                            </a>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {item.price}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.size}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                          {product.inStock ? (
                            <CheckIcon
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <ClockIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-300"
                              aria-hidden="true"
                            />
                          )}
                          <span>
                            {product.inStock
                              ? "In stock"
                              : `Will ship in 2-3 days`}
                          </span>
                        </p>
                        <div className="ml-4">
                          <Form method="delete">
                            <button
                              onClick={() => {
                                confirm(
                                  "Are you sure you want to remove this item? "
                                );
                                return;
                              }}
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                              {/* {transition.state === "submitting"
                                ? "Deleting..."
                                : "Remove"} */}
                            </button>
                            <input
                              className="hidden"
                              type="text"
                              name="lineNumber"
                              value={item.lineNumber}
                              readOnly
                            />
                            <input
                              className="hidden"
                              type="text"
                              name="localCartId"
                              value={localCartId}
                              readOnly
                            />
                          </Form>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>
            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Subtotal
                  </dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${total}
                  </dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>
            <div className="mt-10">
              <Link to={`/cart/${localCartId}/checkout`}>
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-25"
                  disabled={!localCartId || total == 0.0}
                >
                  {localCartId && total != 0.0
                    ? "Checkout"
                    : "No articles in the cart"}
                </button>
              </Link>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                <a
                  href="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
