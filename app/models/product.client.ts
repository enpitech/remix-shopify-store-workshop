import { postToShopify } from "./utils";

export const getProductById = async (productId: string) => {
  const params = {
    query: queries.getProductById,
    variables: {
      id: productId,
    },
  };
  const response = await postToShopify(params);
  return response;
};

export const getTrendingProducts = async (amount: Number) => {
  const params = {
    query: queries.getTrendsProducts,
    variables: { first: amount },
  };
  const response = await postToShopify(params);
  const trends = response.products.edges;
  return trends;
};

//GraphQl queries object
const queries = {
  getTrendsProducts: `query getProducts($first: Int = 10) {
    products(first: $first) {
      edges {
        node {
          id
          title
          variants(first: 1) {
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
      variants(first: 5) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
  `,
};
