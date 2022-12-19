import { runQuery } from "~/models/utils";
import { postToShopify } from "~/models/utils";

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
    console.log(response);
    return {
      cartId: response.data.cartCreate.cart.id,
      data: response.data.cartCreate.cart,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (cartId: string) => {
  const query = `{
    cart(id: "Z2lkOi8vc2hvcGlmeS9DYXJ0L2JhZWMwZjRjZTc2ZWExNDdjNDUzMzJjZmExY2IzMDY2") {
      createdAt
      estimatedCost {
        subtotalAmount {
          amount
          currencyCode
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
      console.log(response.data.cart.estimatedCost.subtotalAmount.amount);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const addItemToCart = async (
//   cartId: string | null,
//   productId: string
// ) => {
//   if (cartId === "none") {
//     //if new cart =>

//     //create cart
//     console.log("creating cart");

//     const response = await createCart();

//     const newCartId = response?.cartId;

//     //send query with new cartId
//     const query = `mutation MyMutation {
//       cartLinesAdd(
//         cartId: "${newCartId}"
//         lines: {merchandiseId: "${productId}", quantity: 5}
//       ) {
//         cart {
//           id
//           checkoutUrl
//           lines(first: 100) {
//             edges {
//               node {
//                 id
//                 quantity
//               }
//             }
//           }
//         }
//       }
//     }
//     `;
//     try {
//       const variables = {};
//       const response = await runQuery({ query, variables });
//       if (response.errors) {
//         console.log(response.errors);
//       } else {
//         console.log("Return the new cart Id");
//         console.log(response.data.cartLinesAdd.cart.id);
//         return response.data.cartLinesAdd.cart.id;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     //add item to existing cart
//   } else {
//     console.log("add to existing");
//     const query = `mutation MyMutation {
//       cartLinesAdd(
//         cartId: "${cartId}"
//         lines: {merchandiseId: "${productId}", quantity: 5}
//       ) {
//         cart {
//           id
//           checkoutUrl
//           lines(first: 100) {
//             edges {
//               node {
//                 id
//                 quantity
//               }
//             }
//           }
//         }
//       }
//     }
//     `;

//     try {
//       console.log("adding items to existing cart");
//       const variables = {};
//       const response = await runQuery({ query, variables });
//       if (response.errors) {
//         console.log(response.errors);
//       } else {
//         console.log(response.data.cartLinesAdd.cart.id);
//         return response.data.cartLinesAdd.cart.id;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

export const addItemToCart = async (
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

export const createCartAndAdd = async () => {
  try {
    const response = await postToShopify({
      query: queries.createCartAndAddQuery,
      variables: {
        cartInput: {
          lines: [
            {
              quantity: 1,
              merchandiseId:
                "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNTQ4MDUzMTczMDU5NQ==",
            },
          ],
        },
      },
    });
    // console.log("the response in back is:");
    // console.log(response.cartCreate.cart.lines.edges[0].node);
    return {
      cartId: response.cartCreate.cart.id,
      data: response.cartCreate.cart,
      cost: response.cartCreate.cart.lines,
    };
  } catch (error) {
    console.log(error);
  }
};

const queries = {
  createCartAndAddQuery: `mutation createCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        id
        createdAt
        updatedAt
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
                    id
                    title
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }`,
};

//variant example : gid://shopify/ProductVariant/35480531730595
