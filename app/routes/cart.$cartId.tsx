import { useCartId } from "~/hooks/useCartId";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { getCart } from "~/models/cart.server";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { cartLinesUpdate } from "~/models/cart.server";
import { removeItemFromCart } from "~/models/cart.server";
import type { CartProduct } from "~/types";

export async function loader({ params }: LoaderArgs) {
  const parsedCartData = await getCart(params.cartId!);

  return {
    products: parsedCartData.cart.lines.edges,
    total: parsedCartData.cart.estimatedCost.subtotalAmount.amount,
  };
}

export async function action({ request }: ActionArgs) {
  if (request.method === "POST") {
    const formData = await request.formData();
    //think about destruction
    const cartId = Object.fromEntries(formData).cartId;
    const quantity = Object.fromEntries(formData).quantity;
    const merchandiseId = Object.fromEntries(formData).merchandiseId;
    const lineNumber = Object.fromEntries(formData).lineNumber;
    await cartLinesUpdate(cartId, lineNumber, merchandiseId, +quantity);
  } else if (request.method === "DELETE") {
    const formData = await request.formData();
    const lineNumber: any = Object.fromEntries(formData).lineNumber;
    const cartId: any = Object.fromEntries(formData).cartId;
    await removeItemFromCart(cartId, lineNumber);
  }
  return {};
}

export default function Cart() {
  const cartId = useCartId();
  const { products, total } = useLoaderData();
  const fetcher = useFetcher();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>
        <Form className="mt-12" method="post">
          <div>
            <h2 className="sr-only">Items in your shopping cart</h2>
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {products?.map((product: CartProduct) => {
                const item = parseProduct(product);
                return (
                  <li key={item.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div>
                        <div className="flex justify-between sm:grid sm:grid-cols-2">
                          <div className="pr-6">
                            <h3 className="text-sm">
                              <Link
                                to={item.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Unit Price: ${item.price}
                            </p>
                            {item.size ? (
                              <p className="mt-1 text-sm text-gray-500">
                                {item.size}
                              </p>
                            ) : null}
                          </div>
                          <p className="text-right text-sm font-medium text-gray-900">
                            Total : $
                            {(+item.price! * +item.quantity!).toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
                          <label htmlFor={`${item.id}`} className="sr-only">
                            Quantity, {item.quantity}
                          </label>
                          <select
                            name="intent"
                            value={item.quantity}
                            onChange={(e) => {
                              fetcher.submit(
                                {
                                  cartId: cartId,
                                  quantity: e.target.value,
                                  merchandiseId: item.id!,
                                  lineNumber: item.lineNumber!,
                                },
                                { method: "post" }
                              );
                            }}
                            form="changeQuantity"
                            id={`${item.id}`}
                            className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                          {/* delete </button> */}
                          <button
                            type="button"
                            className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                            name={item.lineNumber}
                            value={item.lineNumber}
                            onClick={(e) => {
                              fetcher.submit(
                                {
                                  cartId: cartId,
                                  lineNumber: item.lineNumber!,
                                },
                                { method: "delete" }
                              );
                            }}
                          >
                            Remove
                          </button>
                          <input
                            className="hidden"
                            type="text"
                            name="lineNumber"
                            value={item.lineNumber}
                            onChange={() => {}}
                            readOnly
                          />
                          <input
                            className="hidden"
                            type="text"
                            name="cartId"
                            value={cartId}
                            readOnly
                          />
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {item.inStock ? (
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

                        <span>In stock</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Order summary */}
          <div className="mt-10 sm:ml-32 sm:pl-6">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">{+total!}</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {(+total! + 5).toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <Link to={`/cart/${cartId}/checkout`}>
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </Link>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                <Link
                  to="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

function parseProduct(product: CartProduct) {
  return {
    id: product.node?.merchandise?.id,
    name: product.node?.merchandise?.product?.title,
    href: `product/${product.node?.merchandise?.id}`,
    price:
      product.node?.merchandise?.product?.priceRange?.minVariantPrice?.amount,
    color: "TBD",
    inStock: true,
    imageSrc: product.node?.merchandise?.image?.src,
    imageAlt: product.node?.merchandise?.image?.altText || "",
    size: product.node?.merchandise?.title,
    lineNumber: product.node?.id,
    quantity: product.node?.quantity,
  };
}
