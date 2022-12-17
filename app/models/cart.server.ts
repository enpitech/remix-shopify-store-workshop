import { fetchShopify } from "~/models/utils";
import { runQuery } from "~/models/utils";

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

export const addItemToCart = async (cartId: any) => {
  console.log("---------");
  console.log(cartId);
  const query = `mutation MyMutation {
    cartLinesAdd(
      cartId: "Z2lkOi8vc2hvcGlmeS9DYXJ0Lzg1NGY2ODljYzJhMmFiZDQxZjRhNTgxNWEwYzAyODI2"
      lines: {merchandiseId: "gid://shopify/ProductVariant/35480531730595", quantity: 5}
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
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

//variant example : gid://shopify/ProductVariant/35480531730595
