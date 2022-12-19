import { runQuery } from "~/models/utils";

export const createCart = async () => {
  console.log("workingBE");
  const query = `mutation createCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;
  try {
    const variables = {};
    const response = await runQuery({ query, variables });
    return {
      cartId: response.data.cartCreate.cart.id,
      data: response.data.cartCreate.cart,
    };
  } catch (error) {
    console.log(error);
  }
};
