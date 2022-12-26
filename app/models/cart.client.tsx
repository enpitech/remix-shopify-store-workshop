import { postToShopify } from "~/models/utils";
import { createCartQuery } from "./queries.graphql";

export const createCart = async () => {
  const params = {
    query: createCartQuery,
    variables: {},
  };
  const response = await postToShopify(params);
  return response;
};
