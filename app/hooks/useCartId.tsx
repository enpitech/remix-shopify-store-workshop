import { useState, useEffect } from "react";
import { createCart } from "~/models/cart.server";

export function useCartId() {
  const [cartId, setCartId] = useState<any>();

  useEffect(() => {
    async function localCartId() {
      const existingCart = localStorage.getItem("cartId");
      if (existingCart && existingCart !== "undefined" && existingCart !== "") {
        setCartId(existingCart);
        return cartId;
      }
      const response = await createCart();
      const newCartId = response.cartCreate.cart.id;
      localStorage.setItem("cartId", newCartId);
      setCartId(newCartId);
    }
    localCartId();
  }, [cartId]);

  return cartId;
}
