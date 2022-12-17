import { fetchShopify } from "~/models/utils";

export const createCart = async () => {
  const query = `mutation createCart {
    cartCreate {
      cart {
        id
      }
    }
  }
`;
  try {
    const response = await fetchShopify(query);
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
    id: "Z2lkOi8vc2hvcGlmeS9DYXJ0LzVjZDMwMTFlNTE4NzIwM2Y0ZjJhM2I3ZGUyMmVkZTAy"
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
    const response = await fetchShopify(query);
    if (response.errors) {
      console.log(response.errors);
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addItemToCart = async (itemId: string) => {
  const cartId =
    "Z2lkOi8vc2hvcGlmeS9DYXJ0LzMyMzg1YmRjMmJkODViZmU0YjFiMDY0MTZlMmIyMTZm";
  const lines = [
    {
      quantity: 1,
      merchandiseId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU1MDQ3ODE0NTE0Mjc=",
    },
  ];
  try {
    const response = await runQuery({
      query: `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
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
    `,
      variables: { cartId, lines },
    });
    console.log("Get Cart Response");
    if (response.errors) {
      console.log(response.errors);
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
