import { postToShopify } from "~/models/utils";

export const createCart = async () => {
  const params = {
    query: queries.createCart,
    variables: {},
  };
  const response = await postToShopify(params);
  return {
    cartId: response.cartCreate.cart.id,
    checkoutUrl: response.cartCreate.cart.id,
  };
};

export const removeItemFromCart = async (
  cartId: string | null,
  lineNumber: string
) => {
  const params = {
    query: queries.removeItemFromCart,
    variables: {
      cartId,
      lineIds: [lineNumber],
    },
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
  removeItemFromCart: `mutation removeItemFromCart($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
}
`,
};
