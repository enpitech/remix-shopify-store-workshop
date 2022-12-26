// const { total } = useCart();
// import { useCart } from "~/hooks/useCart";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";

import { badRequest } from "~/models/utils";
import { getCart } from "~/models/cart.server";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export const loader = async ({ params }: LoaderArgs) => {
  const data = await getCart(params.cartId!);
  const total = data?.cart.estimatedCost.subtotalAmount.amount;
  return total;
};

function validateFirstname(firstName: unknown) {
  if (typeof firstName !== "string" || firstName.length < 3) {
    return `First Names must be at least 3 characters long`;
  }
}

function validateLastname(lastName: unknown) {
  if (typeof lastName !== "string" || lastName.length < 3) {
    return `Last Names must be at least 3 characters long`;
  }
}

function validatePhone(phone: unknown) {
  if (typeof phone !== "string" || phone.length < 6) {
    return `Phone must be at least 6 characters long`;
  }
}

function validateEmail(phone: unknown) {
  if (typeof phone !== "string" || phone.length < 6) {
    return `Email must be at least 6 characters long`;
  }
}

export const action = async ({ request }: ActionArgs) => {
  const formBody = await request.formData();
  const form = Object.fromEntries(formBody);
  const firstName = form.firstName;
  const lastName = form.lastName;
  const phone = form.phone;
  const email = form.email;

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof phone !== "string" ||
    typeof email !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { firstName, lastName, phone, email };
  const fieldErrors = {
    firstName: validateFirstname(firstName),
    lastName: validateLastname(lastName),
    phone: validatePhone(phone),
    email: validateEmail(email),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  return redirect("/success");
};

export default function Checkout() {
  // const [error, setError] = useState<any>();
  const cost = useLoaderData();
  const error = useActionData();

  // const formik = useFormik({
  //   initialValues: {
  //     lastName: "",
  //     firstName: "",
  //     phone: "",
  //     email: "",
  //   },
  //   validationSchema: Yup.object({
  //     firstName: Yup.string()
  //       .max(20, "Must be 20 characters or less")
  //       .min(4, "First name must be more then 4 characters")
  //       .required("Required"),
  //     lastName: Yup.string()
  //       .max(15, "Must be 15 characters or less")
  //       .min(1, "Username must be more then 1 characters")
  //       .required("Required"),
  //     phone: Yup.string()
  //       .max(20, "Must be 20 characters or less")
  //       .min(4, "Password must be more then 4 characters")
  //       .required("Required"),
  //     email: Yup.string()
  //       .max(20, "Must be 20 characters or less")
  //       .min(4, "Password must be more then 4 characters")
  //       .required("Required")
  //       .email("Please enter valid email"),
  //   }),
  //   onSubmit: async () => {
  //     try {
  //       confirm("Thank you for buying in WearJS!");
  //     } catch (error: any) {
  //       setError(error.response.data.message);
  //     }
  //   },
  // });

  return (
    <div className="bg-gray-50">
      <div className="mx-auto min-h-screen max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        {/*
        
        <Form
          onSubmit={formik.handleSubmit}
          method="post"
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <em className="text-red-600">{error?.fieldErrors?.email}</em>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <em className="text-red-600">
                    {error?.fieldErrors?.firstName}
                  </em>

                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="text-red-500">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <em className="text-red-600">
                    {error?.fieldErrors?.lastName}
                  </em>

                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="text-red-500">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <em className="text-red-600">{error?.fieldErrors?.phone}</em>

                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Enter your phone name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-500">{formik.errors.phone}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-10 lg:mt-0">
            <h2 className=" text-lg font-medium text-gray-900">
              Order summary
            </h2>
            <div className=" mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${+total!}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">${0}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${+total! + 5}
                  </dd>
                </div>
              </dl>
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </Form>

       */}

        <Form
          method="post"
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <em className="text-red-600">{error?.fieldErrors?.email}</em>

                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email address"
                    className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <em className="text-red-600">
                    {error?.fieldErrors?.firstName}
                  </em>

                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <em className="text-red-600">
                    {error?.fieldErrors?.lastName}
                  </em>

                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <em className="text-red-600">{error?.fieldErrors?.phone}</em>

                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Enter your phone name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className=" mt-10 lg:mt-0">
            <h2 className=" text-lg font-medium text-gray-900">
              Order summary
            </h2>
            <div className=" mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${cost}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">${0}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${+cost + 5}
                  </dd>
                </div>
              </dl>
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
