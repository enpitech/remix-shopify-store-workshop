import { postToShopify } from "~/models/utils";
import {
  getCartQuery,
  removeItemFromCartQuery,
  cartLinesUpdateQuery,
  createCartQuery,
  addItemToCartQuery,
} from "./queries.graphql";

export const createCart = async () => {
  const params = {
    query: createCartQuery,
    variables: {},
  };
  const response = await postToShopify(params);
  return response;
};

export const getCart = async (id: string): Promise<any> => {
  const params = {
    query: getCartQuery,
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
    query: addItemToCartQuery,
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
    query: removeItemFromCartQuery,
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
  lineId: string,
  merchandiseId: string,
  quantity: number
) => {
  const params = {
    query: cartLinesUpdateQuery,
    variables: {
      cartId,
      lineId,
      merchandiseId,
      quantity,
    },
  };
  const response = await postToShopify(params);
  return response;
};
