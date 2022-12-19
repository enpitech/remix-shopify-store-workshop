import { postToShopify } from "~/models/utils";

export const createCart = async () => {
  try {
    const variables = {};
    const response = await postToShopify({
      query: queries.createCart,
      variables,
    });
    return response.cartCreate.cart.id;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (cartId: string) => {
  try {
    const variables = { cartId };

    const response = await postToShopify({
      query: queries.getCart,
      variables,
    });
    if (response.errors) {
      console.log(response.errors);
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const queries = {
  getCart: `query getCart($id: ID = "Z2lkOi8vc2hvcGlmeS9DYXJ0L2JhZWMwZjRjZTc2ZWExNDdjNDUzMzJjZmExY2IzMDY2") {
    cart(id: $id) {
      createdAt
      checkoutUrl
      estimatedCost {
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }`,
  createCart: `mutation createCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`,
};
