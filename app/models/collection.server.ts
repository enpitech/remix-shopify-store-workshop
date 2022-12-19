import { postToShopify } from "./utils";

export const getCollections = async (amount: Number) => {
  const variables = { first: amount };
  try {
    const response = await postToShopify({
      query: queries.getCollectionsQuery,
      variables,
    });

    const collections = response.collections.edges;

    return collections;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Global Queries
const queries = {
  getCollectionsQuery: `query getCollections($first: Int = 10) {
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
