import { runQuery } from "./utils";

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
