import { postToShopify } from "./utils";

export const getCollections = async (amount: Number) => {
  const params = {
    query: queries.getCollections,
    variables: { first: amount },
  };
  const response = await postToShopify(params);
  const collections = response.collections.edges;
  return collections;
};
//Global Queries
const queries = {
  getCollections: `query getCollections($first: Int = 10) {
    collections(first: $first) {
      edges {
        node {
          title
          products(first: 1) {
            edges {
              node {
                id
                images(first: 1) {
                  edges {
                    node {
                      altText
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
 `,
};
