import { json } from "@remix-run/node";

// Token & address
export const storeFrontApiShopUrl = "https://wearjs.myshopify.com/api/graphql";
export const storeFrontApiAccessToken = "41d163286cd756551cd06df943018bb1";

interface PostToShopifyParams {
  query: string;
  variables?: {};
}

//Params
const params = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": storeFrontApiAccessToken,
  },
};

//Global fetching function
export const postToShopify = async ({
  query,
  variables = {},
}: PostToShopifyParams): Promise<any> => {
  try {
    const response: any = await fetch(storeFrontApiShopUrl, {
      ...params,
      body: JSON.stringify({ query, variables }),
    });

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

//Validation function for the backend validation
export const badRequest = <T>(data: T) => json<T>(data, { status: 400 });
