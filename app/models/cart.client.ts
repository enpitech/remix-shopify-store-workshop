import { postToShopify } from "~/models/utils";

export const createCart = async () => {
  const params = {
    query: queries.createCart,
    variables: {},
  };
  const response = await postToShopify(params);
  return response;
};

export const queries = {
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
