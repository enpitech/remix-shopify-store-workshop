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

export const addItemToCart = async (
  cartId: string | null,
  productId: string
) => {
  if (cartId === "none") {
    //if new cart =>

    //create cart
    console.log("creating cart");

    const response = await createCart();

    const newCartId = response?.cartId;

    //send query with new cartId
    const query = `mutation MyMutation {
      cartLinesAdd(
        cartId: "${newCartId}"
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
        console.log("Return the new cart Id");
        console.log(response.data.cartLinesAdd.cart.id);
        return response.data.cartLinesAdd.cart.id;
      }
    } catch (error) {
      console.log(error);
    }
    //add item to existing cart
  } else {
    console.log("add to existing");
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
      console.log("adding items to existing cart");
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
  }
};

//variant example : gid://shopify/ProductVariant/35480531730595
