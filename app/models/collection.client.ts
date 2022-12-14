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
    query: query,
  };
  try {
    const response = await runQuery(params);
    if (!response) {
      console.log("No data found");
      return;
    }
    return response.data.collections.edges;
  } catch (error) {
    return error;
  }
};

export const getTrendingProducts = async (amount: Number) => {
  const query = `{
    products(first: ${amount}) {
      edges {
        node {
          id
          title
          images(first: 10) {
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
  `;

  const params = {
    query: query,
  };

  try {
    const response = await runQuery(params);

    if (!response) {
      console.log("No Data Found");
      return;
    }

    return response.data.products.edges;
  } catch (error) {
    return error;
  }
};

export const fetchCollectionById = async (
  collectionId: string,
  productsAmount: number
) => {
  const getCollectionByIdQuery = `query getCollectionById($id: ID!) {
    collection(id: $id) {
      title
      products(first: ${productsAmount}) {
        edges {
            node {
                id
                title
                description
                variants(first:1) {
                    edges {
                        node {
                            title
                            id
                            priceV2 {
                                amount
                                currencyCode
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
    query: getCollectionByIdQuery,
    variables: { id: collectionId },
  };

  const response = await runQuery(params);
  console.log(JSON.stringify(response, null, 4));
};

export const fetchHomeCollection = () =>
  fetchCollectionById("gid://shopify/Collection/216731549859", 10);


