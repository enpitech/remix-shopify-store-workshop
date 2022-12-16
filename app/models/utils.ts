export const shopUrl = "https://wearjs.myshopify.com";
export const serverShopUrl =
  "https://wearjs.myshopify.com/admin/api/2022-10/graphql.json";

export const accessToken = "41d163286cd756551cd06df943018bb1";
export const serverAccessToken = "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";

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
      console.log("No Data Found");
      return data;
    }
    return data;
  } catch (error) {
    return error;
  }
};

// Shop specific setup constants
export const runQueryInBE = async (query: string) => {
  const optionsCollectionByIdQuery = {
    method: "post",
    headers: {
      "Content-Type": "application/graphql",
      "X-Shopify-Access-Token": serverAccessToken,
    },
    body: query,
  };

  const response = await fetch(serverShopUrl, optionsCollectionByIdQuery);
  const data = await response.json();
  console.log(data);

  return data;
};
