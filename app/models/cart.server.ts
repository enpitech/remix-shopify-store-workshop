import { postToShopify } from "~/models/utils";

export const createCart = async () => {
  try {
    const variables = {};
    const response = await postToShopify({
      query: queries.createCart,
      variables,
    });
    // console.log("response");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (id: string): Promise<any> => {
  try {
    const variables = { id };

    const response = await postToShopify({
      query: queries.getCart,
      variables,
    });
    console.log(JSON.stringify(response, null, 4));
    if (response.errors) {
      console.log(response.errors);
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addItemToCart = async (
  //test
  cartId: string | null,
  productId: string
) => {
  try {
    const variables = {
      cartId,
      lines: [{ merchandiseId: productId, quantity: 1 }],
    };
    const response = await postToShopify({
      query: queries.addItemToCart,
      variables,
    });
    if (response.errors) {
      console.log(response.errors);
    } else {
      return {
        lines: response.cartLinesAdd.cart.lines.edges,
        cartId: response.cartLinesAdd.cart.id,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const queries = {
  getCart: `query getCart($id: ID = "Z2lkOi8vc2hvcGlmeS9DYXJ0Lzc2NGYxNDY0ZTYwZTAxN2Q1NTAxZjNiMDMyNjlkZjhh") {
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
  addItemToCart: `mutation MyMutation($cartId: ID = "Z2lkOi8vc2hvcGlmeS9DYXJ0Lzc2NGYxNDY0ZTYwZTAxN2Q1NTAxZjNiMDMyNjlkZjhh", $lines: [CartLineInput!] = {merchandiseId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNTU1NjQwNjEwMDEzMQ==", quantity: 1}) {
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
};
