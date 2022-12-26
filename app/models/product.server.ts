import { postToShopify } from "./utils";
import {
  getTrendsProductsQuery,
  getProductByIdQuery,
} from "~/models/queries.graphql";

export const getProductById = async (productId: string) => {
  const params = {
    query: getProductByIdQuery,
    variables: {
      id: productId,
    },
  };
  const response = await postToShopify(params);
  return response;
};

export const getTrendingProducts = async (amount: Number) => {
  const params = {
    query: getTrendsProductsQuery,
    variables: { first: amount },
  };
  const response = await postToShopify(params);
  const trends = response.products.edges;
  return trends;
};
