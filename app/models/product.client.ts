import { runQuery } from "./utils";

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
  console.log(JSON.stringify(result, null, 4));
  return result.data.product;
};
