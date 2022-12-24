import { useState, useEffect } from "react";
import { getCart } from "~/models/cart.client";
import { useCartId } from "./useCartId";
import { useCallback } from "react";

export function useCart() {
  const [products, setProducts] = useState<[] | undefined>();
  const [total, setTotal] = useState<[] | undefined>();
  const cartId = useCartId();

  const fetchCartData = useCallback(async () => {
    const response = await getCart(cartId);
    setProducts(response.cart.lines.edges);
    setTotal(response.cart.estimatedCost.subtotalAmount.amount);
  }, [cartId]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData, cartId]);

  return { products, total, getCartData: fetchCartData };
}
