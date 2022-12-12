import { runQuery } from "./utils";

export const fetchProductById = async (productId: string) => {
  const getProductByIdQuery = `query getProductById($id: ID!) {
    product(id: $id) {
      title
    }
  }
  `;

  const params = {
    query: getProductByIdQuery,
    variables: { id: productId },
  };

  const data = await runQuery(params);
  console.log(JSON.stringify(data, null, 4));
};
