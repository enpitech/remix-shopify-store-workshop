import { runQuery } from "~/models/utils";
import { postToShopify } from "~/models/utils";

export const createCart = async () => {
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

// export const getCart = async (cartId: string) => {
//   const query = `{
//     cart(id: "Z2lkOi8vc2hvcGlmeS9DYXJ0L2JhZWMwZjRjZTc2ZWExNDdjNDUzMzJjZmExY2IzMDY2") {
//       createdAt
//       estimatedCost {
//         subtotalAmount {
//           amount
//           currencyCode
//         }
//       }
//     }
//   }
// `;
//   try {
//     const variables = {};
//     const response = await runQuery({ query, variables });
//     if (response.errors) {
//       console.log(response.errors);
//     } else {
//       console.log(response.data.cart.estimatedCost.subtotalAmount.amount);
//       return response;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getCart = async (cartId: string): Promise<any> => {
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

export const addItemToCart = async (
  //stable
  cartId: string | null,
  productId: string
) => {
  const query = `mutation MyMutation {
      cartLinesAdd(
        cartId: "${cartId}"
        lines: {merchandiseId: "${productId}", quantity: 5}
      ) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
    `;
  try {
    const variables = {};
    const response = await runQuery({ query, variables });
    if (response.errors) {
      console.log(response.errors);
    } else {
      console.log(response.data.cartLinesAdd.cart.id);
      return response.data.cartLinesAdd.cart.id;
    }
  } catch (error) {
    console.log(error);
  }
};

const queries = {
  getCart: `query getCart($id: ID = "Z2lkOi8vc2hvcGlmeS9DYXJ0L2JhZWMwZjRjZTc2ZWExNDdjNDUzMzJjZmExY2IzMDY2") {
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
                }
              }
            }
          }
        }
      }
    }
  }`,
};

//variant example : gid://shopify/ProductVariant/35480531730595
