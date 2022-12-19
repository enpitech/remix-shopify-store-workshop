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
//     cart(id: "${cartId}") {
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
//       return response;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getCart = async (cartId: string) => {
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

const queries = {
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
};
