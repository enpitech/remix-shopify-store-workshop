import { runQuery } from "./utils";

export const getAllCollections = async () => {
  const getAllCollectionsQuery = `{
    collections(first: 20) {
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
    query: getAllCollectionsQuery,
    variables: {},
  };
  try {
    const data = await runQuery(params);
    return data.data.collections.edges;
  } catch (error) {
    return error;
  }
};

export const getTrendingProducts = async () => {
  const query = `{
    products(first: 10) {
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
    variables: {},
  };

  try {
    const data = await runQuery(params);
    return data.data.products.edges;
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

  const data = await runQuery(params);
  console.log(JSON.stringify(data, null, 4));
};

export const fetchHomeCollection = () =>
  fetchCollectionById("gid://shopify/Collection/216731549859", 10);
