import { runQueryInBE } from "./utils";

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

  const response = await runQueryInBE(query);

  const trends = response.data.products.edges;

  return trends;
};

export const fetchProductById = async (productId: string) => {
  const getProductByIdQuery = `query getProductById($id: ID!) {
    product(id: $id) {
      title
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      description
      featuredImage {
        originalSrc
        altText
      }

    }
  }
  `;

  const params = {
    query: getProductByIdQuery,
    variables: { id: productId },
  };

  const result = await runQuery(params);
  return result.data.product;
};
