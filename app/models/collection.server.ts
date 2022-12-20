import { postToShopify } from "./utils";

export const getCollections = async (amount: Number) => {
  const params = {
    query: queries.getCollectionsQuery,
    variables: { first: amount },
  };

  try {
    const response = await postToShopify(params);

    if (response.errors) {
      console.log(response.errors);
      return response;
    } else {
      const collections = response.collections.edges;
      return collections;
    }
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
