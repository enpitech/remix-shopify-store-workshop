import { fetchShopify } from "./utils";

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

  const response = await fetchShopify(query);

  const trends = response.data.products.edges;

  return trends;
};

export const fetchProductById = async (productId: string) => {
  const query = `query getProductById {
    product(id:"${productId}") {
      title
      id
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      description
      featuredImage {
        altText
        src
      }
    }
  }
  `;

  const result = await fetchShopify(query);
  return result.data.product;
};
