import { json } from "@remix-run/node";
import type { PostToShopifyParams } from "~/types";

// Tokens
// TODO use .env file.
export const storeFrontApiShopUrl = "https://wearjs.myshopify.com/api/graphql";
export const storeFrontApiAccessToken = "41d163286cd756551cd06df943018bb1";

//Global shopify fetching function
export const postToShopify = async ({
  query,
  variables = {},
}: PostToShopifyParams): Promise<any> => {
  const fetchingParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storeFrontApiAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  };
  //TODO in SSR create err handelling using the cache
  //  ?? https://remix.run/docs/en/v1/guides/errors

  // TODO ErrorBoundry will handle both

  try {
    const response: any = await fetch(storeFrontApiShopUrl, fetchingParams);
    const data = await response.json();

    if (data.errors) {
      throw data.errors;
    }

    if (!data || !data.data) {
      throw { message: "No results found." };
    }

    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Check weather user have cartId in local storage
// export async function getLocalCartId() {
//   //check if localCartId exists
//   const cartId = localStorage.getItem("cartId");

//   // return the localCartId
//   if (cartId && cartId != "undefined") {
//     return cartId;
//   }
//   // if not exists => create new localcartId and return
//   const response = await createCart();
//   const newCartId = response.cartCreate.cart.id;
//   localStorage.setItem("cartId", newCartId);
//   console.log(newCartId);

//   return newCartId;
// }
//Validation function for the backend validation
export const badRequest = <T>(data: T) => json<T>(data, { status: 400 });
