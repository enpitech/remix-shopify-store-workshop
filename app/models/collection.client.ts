import { runQuery } from "./utils";

export const getAllCollections = async (amount: Number) => {
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

  const params = {
    query,
  };
  try {
    const response = await runQuery(params);

    const collections = response.data.collections.edges;

    return collections;
  } catch (error) {
    return error;
  }
};

