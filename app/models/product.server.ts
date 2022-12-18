import { postToShopify } from "./utils";

export const fetchProductById = async (productId: string) => {
  console.log(productId);
  const result = await postToShopify({
    query: queries.getProductById,
    variables: {
      id: productId,
    },
  });
  return result;
};

export const getProducts = async (amount: Number) => {
  const response = await postToShopify({
    query: queries.getProducts,
    variables: { first: amount },
  });
  // console.log(response.products.edges);
  const trends = response.products.edges;
  return trends;
};

//Global queries
const queries = {
  getProducts: `query getProducts($first: Int = 10) {
    products(first: $first) {
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
  `,
  getProductById: `query getProductById($id: ID = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU1MjMxODQ1NTAwNTE=") {
    product(id: $id) {
      title
      id
      priceRange {
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
  `,
};
