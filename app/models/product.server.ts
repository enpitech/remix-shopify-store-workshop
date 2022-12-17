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
  const query = `query getProductById{
    product(id: ${productId}) {
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
    query: query,
  };

  const result = await runQueryInBE(params);
  return result.data.product;
};
