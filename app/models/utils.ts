import { json } from "@remix-run/node";
// TODO move Admin api to legacy
// ***** StoreFront API *****
// Params
export const storeFrontApiShopUrl = "https://wearjs.myshopify.com/api/graphql";
export const storeFrontApiAccessToken = "41d163286cd756551cd06df943018bb1";
interface QueryParams {
  query: string;
  variables?: { [id: string]: string };
}



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
    }).then((res) => res.json());
    // TODO use await
    if (response.errors) {
      console.log({ errors: response.errors });
    } else if (!response || !response.data) {
      console.log({ result: response });
      return "No results found.";
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ***** Admin API ***** Not Required to our site
// Params
export const serverAccessToken = "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";
export const serverShopUrl =
  "https://wearjs.myshopify.com/admin/api/2022-10/graphql.json";
type Query = string;

const queryParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/graphql",
    "X-Shopify-Access-Token": serverAccessToken,
  },
};

export const fetchShopify = async (query: Query) => {
  const response = await fetch(serverShopUrl, { ...queryParams, body: query });
  const data = await response.json();
  return data;
};

//Validation function for Backend validation
export const badRequest = <T>(data: T) => json<T>(data, { status: 400 });
