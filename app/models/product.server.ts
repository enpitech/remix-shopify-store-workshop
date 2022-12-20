import { postToShopify } from "./utils";

export const getProductById = async (productId: string) => {
  const params = {
    query: queries.getProductById,
    variables: {
      id: productId,
    },
  };

  try {
    const response = await postToShopify(params);
    if (response.errors) {
      console.log(response.errors);
      return response.errors;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTrendingProducts = async (amount: Number) => {
  const params = {
    query: queries.getProducts,
    variables: { first: amount },
  };

  try {
    const response = await postToShopify(params);

    if (response.errors) {
      console.log(response.errors);
      return response.errors;
    } else {
      const trends = response.products.edges;
      return trends;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

//GraphQl queries object
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
