import { postToShopify } from "~/models/utils";

export const createCart = async () => {
  const params = {
    query: queries.createCart,
    variables: {},
  };
  const response = await postToShopify(params);
  return response;
};

export const getCart = async (id: string): Promise<any> => {
  const params = {
    query: queries.getCart,
    variables: { id },
  };
  const response = await postToShopify(params);
  return response;
};

export const addItemToCart = async (
  cartId: string | null,
  productId: string
) => {
  const params = {
    query: queries.addItemToCart,
    variables: {
      cartId,
      lines: [{ merchandiseId: productId, quantity: 1 }],
    },
  };

  const response = await postToShopify(params);
  return {
    lines: response.cartLinesAdd.cart.lines.edges,
    cartId: response.cartLinesAdd.cart.id,
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

export const cartLinesUpdate = async (
  cartId: string | null,
  id: string,
  merchandiseId: string,
  quantity: number
) => {
  const params = {
    query: queries.cartLinesUpdate,
    variables: {
      cartId,
      id,
      merchandiseId,
      quantity,
    },
  };
  const response = await postToShopify(params);
  return response;
};

//GraphQl queries object
const queries = {
  getCart: `query getCart($id: ID!) {
    cart(id: $id) {
      estimatedCost {
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                image {
                  altText
                  src
                }
                title
                product {
                  id
                  description
                  title
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
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
  addItemToCart: `mutation MyMutation($cartId: ID!, $lines: [CartLineInput!] = {merchandiseId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNTU1NjQwNjEwMDEzMQ==", quantity: 1}) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  priceV2 {
                    amount
                  }
                  title
                }
              }
            }
          }
        }
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
  cartLinesUpdate: `mutation MyMutation($cartId: ID = "Z2lkOi8vc2hvcGlmeS9DYXJ0L2Y5MWM1MjM1ZDdkY2Q5MGYyMTVkNTQ1NjBkYTM5YjZi", $id: ID = "Z2lkOi8vc2hvcGlmeS9DYXJ0TGluZS9jYzQ1MmNhMi0zM2FiLTQwZWYtYThjYi02YTVkYmZjMTkyM2E/Y2FydD1mOTFjNTIzNWQ3ZGNkOTBmMjE1ZDU0NTYwZGEzOWI2Yg==", $merchandiseId: ID = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNTU1NjUyMTcwNTYzNQ==", $quantity: Int = 5) {
    cartLinesUpdate(
      cartId: $cartId
      lines: {id: $id, quantity: $quantity, merchandiseId: $merchandiseId}
    ) {
      cart {
        checkoutUrl
      }
    }
  }`,
};
