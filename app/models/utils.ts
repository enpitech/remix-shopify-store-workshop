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

