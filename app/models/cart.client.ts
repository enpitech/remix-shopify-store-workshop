import { type } from "os";
import { runQuery } from "~/models/utils";
import type { Lines } from "~/types";
import { runCart } from "~/models/utils";

export const createCart = async () => {
  try {
    const response = await runQuery({
      query: `mutation createCart {
            cartCreate {
              cart {
                checkoutUrl
                id
              }
            }
          }
        `,
    });
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
  const query = `query {
    cart(
      id: ${cartId}
    ) {
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
              }
            }
            attributes {
              key
              value
            }
          }
        }
      }
      attributes {
        key
        value
      }
      buyerIdentity {
        email
        phone
        customer {
          id
        }
        countryCode
      }
    }
  }
  
`;

  try {
    const response = await runQuery({
      query,
      variables: { id: cartId },
    });
    console.log("Get Cart Response");
    console.log(cartId);
    console.log("response");
    console.log(response);
    if (response.errors) {
      console.log(response.errors);
    } else {
      console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addItemToCart = async (itemId: string, cartId: string) => {
  const query = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
  const lines: Lines = [
    {
      quantity: 1,
      merchandiseId: itemId,
    },
  ];

  try {
    const response = await runCart(query, cartId, lines);
    if (response.errors) {
      console.log(response.errors);
      return;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

// params {
//   query:"string"
//   variables { id : "", lines: []}
// }
