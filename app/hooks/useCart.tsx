import { useState, useEffect } from "react";
import { getCart } from "~/models/cart.client";
import { useCartId } from "./useCartId";
import { useCallback } from "react";

export function useCart() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);
  const cartId = useCartId();

  const fetchCartData = useCallback(async () => {
    if (cartId) {
      const response = await getCart(cartId);
      setProducts(response.cart.lines.edges);
      setTotal(response.cart.estimatedCost.subtotalAmount.amount);
    }
    return;
  }, [cartId]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData, cartId]);

  return { products, total, fetchCartData };
}
