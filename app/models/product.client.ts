import { runQuery } from "./utils";

export const getTrendingProducts = async (amount: Number) => {
  const query = `{
    products(first: 5) {
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
          variants(first: 5) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
  `;

  const params = {
    query,
  };

  const response = await runQuery(params);

  if (!response) {
    console.log("No Data Found");
    return;
  }

  return response.data.products.edges;
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
