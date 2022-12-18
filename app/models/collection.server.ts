import { fetchShopify } from "./utils";

export const getCollections = async (amount: Number) => {
  const query = `{
    collections(first: ${amount}) {
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
  `;
  try {
    const response = await fetchShopify(query);

    const collections = response.data.collections.edges;

    return collections;
  } catch (error) {
    return error;
  }
};
