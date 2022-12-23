import { Link } from "react-router-dom";
import { Form } from "@remix-run/react";
import { useCart } from "~/hooks/useCart";
import { removeItemFromCart } from "~/models/cart.client";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { cartLinesUpdate } from "~/models/cart.client";

export default function Example() {
  const [cartId, products, total] = useCart();

  async function handleDelete(e: any) {
    e.preventDefault();
    const lineNumber = e.target.name;
    confirm("Are you sure you want to remove this item? ");
    await removeItemFromCart(cartId, lineNumber);
  }

  async function handleChangeQuantity(e: any) {
    async function updateLines() {
      const quantity = e.target.value;
      console.log(typeof +quantity);
      const lineNumber = e.target.name;
      console.log(
        "🚀 ~ file: test.tsx:24 ~ updateLines ~ lineNumber",
        lineNumber
      );
      const merchandiseId = e.target.id;
      console.log(
        "🚀 ~ file: test.tsx:26 ~ updateLines ~ merchandiseId",
        merchandiseId
      );
      await cartLinesUpdate(cartId, lineNumber, merchandiseId, +quantity);
    }
    updateLines();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        <form className="mt-12">
          <div>
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {products?.map((product) => {
                const item = {
                  id: product.node.merchandise.id,
                  name: product.node.merchandise.product.title,
                  href: `product/${product.node.merchandise.id}`,
                  price:
                    product.node.merchandise.product.priceRange.minVariantPrice
                      .amount,
                  color: "TBD",
                  inStock: true,
                  imageSrc: product.node.merchandise.image.src,
                  imageAlt: product.node.merchandise.image.altText,
                  size: product.node.merchandise.title,
                  lineNumber: product.node.id,
                  quantity: product.node.quantity,
                };

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
                              <a
                                href={item.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.color}
                            </p>
                            {product.size ? (
                              <p className="mt-1 text-sm text-gray-500">
                                {item.size}
                              </p>
                            ) : null}
                          </div>

                          <p className="text-right text-sm font-medium text-gray-900">
                            {item.price}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
                          <label htmlFor={`${item.id}`} className="sr-only">
                            Quantity, {item.quantity}
                          </label>
                          <select
                            value={item.quantity}
                            onChange={handleChangeQuantity}
                            id={`${item.id}`}
                            name={`${item.lineNumber}`}
                            className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            {/* <option value={item.quantity} selected>
                              {item.quantity}
                            </option> */}
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                          <button
                            onClick={handleDelete}
                            type="button"
                            className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                          >
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
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
                    <dd className="font-medium text-gray-900">$99.00</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">$8.32</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      $112.32
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or
                <a
                  href="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
