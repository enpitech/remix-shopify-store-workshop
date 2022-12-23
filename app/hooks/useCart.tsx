import { useState, useEffect } from "react";
import { getCart } from "~/models/cart.client";
import { useCartId } from "./useCartId";

export function useCart() {
  const [products, setProducts] = useState<[] | undefined>();
  const [total, setTotal] = useState<[] | undefined>();
  const cartId = useCartId();

  useEffect(() => {
    async function getCartData() {
      const response = await getCart(cartId);
      setProducts(response.cart.lines.edges);
      setTotal(response.cart.estimatedCost.subtotalAmount.amount);
    }
    getCartData();
  }, [total, cartId, products]);

  return [cartId, products, total];
}
