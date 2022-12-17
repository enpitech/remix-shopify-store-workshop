import { fetchShopify } from "./utils";

export const getTrendingProducts = async (amount: Number) => {
  const query = `query MyQuery {
    products(first: 10) {
      edges {
        node {
          id
          title
          variants(first: 10) {
            edges {
              node {
                id
              }
            }
          }
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

  // console.log(JSON.stringify(response.data.products.edges[0]));

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
  console.log(result);
  return result.data.product;
};
