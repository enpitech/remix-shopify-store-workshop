// Client-Side Rendering
export const shopUrl = "https://wearjs.myshopify.com";
export const accessToken = "41d163286cd756551cd06df943018bb1";

interface QueryParams {
  query: string;
  variables?: { [id: string]: string };
}

export const runQuery = async (
  params: QueryParams = {
    query: "",
    variables: {},
  }
) => {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken,
    },
    body: JSON.stringify(params),
  };
  try {
    const response = await fetch(shopUrl + `/api/graphql`, options);
    const data = await response.json();

    if (!data) {
      return data;
    }
    return data;
  } catch (error) {
    return error;
  }
};

// Server-Side Rendering
type Query = string;

export const serverAccessToken = "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";
export const serverShopUrl =
  "https://wearjs.myshopify.com/admin/api/2022-10/graphql.json";

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
