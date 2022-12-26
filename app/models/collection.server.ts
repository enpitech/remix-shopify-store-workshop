import { postToShopify } from "./utils";
import { getCollectionsQuery } from "~/models/queries.graphql";

export const getCollections = async (amount: Number) => {
  const params = {
    query: getCollectionsQuery,
    variables: { first: amount },
  };
  const response = await postToShopify(params);
  const collections = response.collections.edges;
  return collections;
};
